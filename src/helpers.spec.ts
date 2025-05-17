import { sanitizeHost } from './helpers'

describe('sanitizeHost', () => {
  it('should remove protocol from the host string', () => {
    expect(sanitizeHost('http://example.com')).toBe('example.com')
    expect(sanitizeHost('https://example.com')).toBe('example.com')
    expect(sanitizeHost('ws://example.com')).toBe('example.com')
  })

  it('should remove emojis from the host string', () => {
    expect(sanitizeHost('example.com😀')).toBe('example.com')
    expect(sanitizeHost('😀example.com')).toBe('example.com')
    expect(sanitizeHost('😀😀example.com😀')).toBe('example.com')
  })

  it('should remove whitespace from the host string', () => {
    expect(sanitizeHost(' example . com ')).toBe('example.com')
    expect(sanitizeHost('\t\n example . com \t\n')).toBe('example.com')
  })

  it('should remove everything after the first slash', () => {
    expect(sanitizeHost('example.com/path/to/resource')).toBe('example.com')
  })
})
