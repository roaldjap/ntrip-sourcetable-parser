/**
 * GNSS mountpoint information parsed from an NTRIP sourcetable.
 *
 * @property mountpoint      - Name of the mountpoint
 * @property location        - Identifier/location of the mountpoint
 * @property format          - Format (e.g. RTCM 3.2)
 * @property formatDetails   - List of messages (e.g. 1004(1),1006(10))
 * @property carrier         - Carrier phase information
 * @property navSystem       - Navigation system (e.g. GPS+GLO)
 * @property network         - Network name
 * @property country         - Country code
 * @property latitude        - Latitude in decimal degrees
 * @property longitude       - Longitude in decimal degrees
 * @property nmea            - Whether NMEA is required
 * @property authentication  - Whether authentication is required
 * @property fee             - Whether there's a usage fee
 * @property bitrate         - Bitrate in bps
 */
export interface Mountpoint {
  /** Name of the mountpoint */
  mountpoint: string | null
  /** Identifier/location of the mountpoint */
  location: string | null
  /** Format (e.g. RTCM 3.2) */
  format: string | null
  /** List of messages (e.g. 1004(1),1006(10)) */
  formatDetails: string | null
  /** Carrier phase information */
  carrier: string | null
  /** Navigation system (e.g. GPS+GLO) */
  navSystem: string | null
  /** Network name */
  network: string | null
  /** Country code */
  country: string | null
  /** Latitude in decimal degrees */
  latitude: number | null
  /** Longitude in decimal degrees */
  longitude: number | null
  /** Whether NMEA is required */
  nmea: boolean | null
  /** Whether authentication is required */
  authentication: boolean | null
  /** Whether there's a usage fee */
  fee: boolean | null
  /** Bitrate in bps */
  bitrate: number | null
}

/**
 * Configuration options for the NTRIP sourcetable parser.
 *
 * @property host - NTRIP caster hostname (required)
 * @property port - NTRIP caster port (required)
 * @property username - Optional: username for authentication
 * @property password - Optional: password for authentication
 * @property position - Optional: position for VRS in the format { lat, lon }
 * @property version - Optional: NTRIP version ("1.0" or "2.0", default: "2.0")
 */
export interface NtripConfig {
  host: string
  port: number
  username?: string
  password?: string
  position?: { lat: number; lon: number }
  version?: '1.0' | '2.0'
}
