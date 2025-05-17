/**
 * Removes protocol (http://, https://, ws://), emojis, and whitespace from the host string.
 * @param host - The host string to sanitize
 * @returns Sanitized host string
 */
export function sanitizeHost(host: string): string {
  let sanitized = host.replace(/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//, '')
  sanitized = sanitized.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)/g,
    ''
  )
  sanitized = sanitized.replace(/\/.*$/, '')
  sanitized = sanitized.replace(/\s+/g, '')
  return sanitized
}
