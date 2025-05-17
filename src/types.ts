/**
 * GNSS mountpoint information parsed from an NTRIP sourcetable.
 *
 * @property mountpoint   - Name of the mountpoint
 * @property format       - Format (e.g. RTCM 3.2)
 * @property formatDetails- List of messages (e.g. 1004(1),1006(10))
 * @property carrier      - Carrier phase information
 * @property navSystem    - Navigation system (e.g. GPS+GLO)
 * @property network      - Network name
 * @property country      - Country code
 * @property latitude     - Latitude in decimal degrees
 * @property longitude    - Longitude in decimal degrees
 * @property nmea         - Whether NMEA is required
 * @property authentication - Whether authentication is required
 * @property fee          - Whether there's a usage fee
 * @property bitrate      - Bitrate in bps
 */
export interface Mountpoint {
  /** Name of the mountpoint */
  mountpoint: string
  /** Format (e.g. RTCM 3.2) */
  format: string
  /** List of messages (e.g. 1004(1),1006(10)) */
  formatDetails: string
  /** Carrier phase information */
  carrier: string
  /** Navigation system (e.g. GPS+GLO) */
  navSystem: string
  /** Network name */
  network: string
  /** Country code */
  country: string
  /** Latitude in decimal degrees */
  latitude: number
  /** Longitude in decimal degrees */
  longitude: number
  /** Whether NMEA is required */
  nmea: boolean
  /** Whether authentication is required */
  authentication: boolean
  /** Whether there's a usage fee */
  fee: boolean
  /** Bitrate in bps */
  bitrate: number
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
