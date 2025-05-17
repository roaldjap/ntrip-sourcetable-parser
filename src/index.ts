import * as http from 'http'
import { sanitizeHost } from './helpers'
import { Mountpoint, NtripConfig } from './types'

/**
 * Parses raw sourcetable text into a list of mountpoint objects.
 */
function parseSourcetable(data: string): Mountpoint[] {
  const lines = data.split('\n')
  const mountpoints: Mountpoint[] = []

  lines.forEach((line) => {
    if (line.startsWith('STR;')) {
      const fields = line.split(';')
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
        bitrate: parseInt(fields[10], 10) || 0,
      })
    }
  })

  return mountpoints
}

/**
 * Fetches and parses the sourcetable from an NTRIP caster.
 *
 * @param options - Configuration options for the parser (see NtripConfig)
 * @returns Promise resolving to a list of mountpoints (see Mountpoint)
 */
export function ntripSourcetableParser(
  options: NtripConfig
): Promise<Mountpoint[]> {
  const { host, port, username, password, position, version = '2.0' } = options

  // Validate required options
  if (!host || typeof host !== 'string') {
    return Promise.reject(
      new Error('NTRIP host is required and must be a string.')
    )
  }
  if (!port || typeof port !== 'number') {
    return Promise.reject(
      new Error('NTRIP port is required and must be a number.')
    )
  }

  options.host = sanitizeHost(host)

  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {
      'User-Agent': 'NTRIP Node.js Client',
    }

    // Set NTRIP version-specific headers
    if (version === '2.0') {
      headers['Ntrip-Version'] = 'Ntrip/2.0'
    }

    // Add Authorization header if username and password are provided
    if (username && password) {
      const auth = Buffer.from(`${username}:${password}`).toString('base64')
      headers['Authorization'] = `Basic ${auth}`
    }

    // Add position header if provided
    if (position) {
      headers['Ntrip-Position'] = `${position.lat},${position.lon}`
    }

    const options: http.RequestOptions = {
      hostname: host,
      port,
      path: '/',
      method: 'GET',
      headers,
    }

    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const mountpoints = parseSourcetable(data)
          resolve(mountpoints)
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', (err) => reject(err))
    req.end()
  })
}

// Include to docs
export * from './helpers'
export * from './types'
