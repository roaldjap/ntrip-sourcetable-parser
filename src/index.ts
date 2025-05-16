import * as https from 'https';

/**
 * GNSS mountpoint information parsed from an NTRIP sourcetable.
 */
export interface Mountpoint {
  /** Name of the mountpoint */
  mountpoint: string;
  /** Format (e.g. RTCM 3.2) */
  format: string;
  /** List of messages (e.g. 1004(1),1006(10)) */
  formatDetails: string;
  /** Carrier phase information */
  carrier: string;
  /** Navigation system (e.g. GPS+GLO) */
  navSystem: string;
  /** Network name */
  network: string;
  /** Country code */
  country: string;
  /** Latitude in decimal degrees */
  latitude: number;
  /** Longitude in decimal degrees */
  longitude: number;
  /** Whether NMEA is required */
  nmea: boolean;
  /** Whether authentication is required */
  authentication: boolean;
  /** Whether there's a usage fee */
  fee: boolean;
  /** Bitrate in bps */
  bitrate: number;
}


/**
 * Parses raw sourcetable text into a list of mountpoint objects.
 */
function parseSourcetable(data: string): Mountpoint[] {
  const lines = data.split('\n');
  const mountpoints: Mountpoint[] = [];

  lines.forEach(line => {
    if (line.startsWith('STR;')) {
      const fields = line.split(';');
      mountpoints.push({
        mountpoint: fields[1],
        format: fields[2],
        formatDetails: fields[3],
        carrier: fields[4],
        navSystem: fields[9],
        network: fields[12],
        country: fields[13],
        latitude: parseFloat(fields[14]),
        longitude: parseFloat(fields[15]),
        nmea: fields[6] === 'Y',
        authentication: fields[7] === 'Y',
        fee: fields[8] === 'Y',
        bitrate: parseInt(fields[10], 10) || 0
      });
    }
  });

  return mountpoints;
}


/**
 * Fetches and parses the sourcetable from an NTRIP caster.
 *
 * @param host - NTRIP caster hostname
 * @param port - NTRIP caster port
 * @param username - Optional: username for authentication
 * @param password - Optional: password for authentication
 * @param position - Optional: position for VRS in the format { lat, lon }
 * @param version - Optional: NTRIP version (default: "2.0", can be set to "1.0")
 * @returns Promise resolving to a list of mountpoints
 */
export function ntripSourcetableParser(
  host: string,
  port: number,
  username?: string,
  password?: string,
  position?: { lat: number; lon: number },
  version: '1.0' | '2.0' = '2.0'
): Promise<Mountpoint[]> {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {
      'User-Agent': 'NTRIP Node.js Client',
    };

    // Set NTRIP version-specific headers
    if (version === '2.0') {
      headers['Ntrip-Version'] = 'Ntrip/2.0';
    }

    // Add Authorization header if username and password are provided
    if (username && password) {
      const auth = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
    }

    // Add position header if provided
    if (position) {
      headers['Ntrip-Position'] = `${position.lat},${position.lon}`;
    }

    const options: https.RequestOptions = {
      hostname: host,
      port,
      path: '/',
      method: 'GET',
      headers,
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const mountpoints = parseSourcetable(data);
          resolve(mountpoints);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', err => reject(err));
    req.end();
  });
}
