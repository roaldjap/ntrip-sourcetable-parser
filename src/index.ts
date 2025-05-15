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
 * @returns Promise resolving to a list of mountpoints
 */
export function fetchSourcetable(
  host: string,
  port: number,
): Promise<Mountpoint[]> {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: host,
      port,
      path: '/',
      method: 'GET',
      headers: {
        'Ntrip-Version': 'Ntrip/2.0',
        'User-Agent': 'NTRIP Node.js Client'
      }
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
