import { NtripConfig, ntripSourcetableParser } from './index'

describe('ntripSourcetableParser', () => {
  it('should reject if host is missing', async () => {
    await expect(
      ntripSourcetableParser({ port: 2101 } as NtripConfig)
    ).rejects.toThrow('NTRIP host is required')
  })

  it('should reject if port is missing', async () => {
    await expect(
      ntripSourcetableParser({ host: 'localhost' } as NtripConfig)
    ).rejects.toThrow('NTRIP port is required')
  })

  it('should resolve with mountpoints', async () => {
    const mountpoints = await ntripSourcetableParser({
      host: 'positionz-rt.linz.govt.nz',
      port: 2101,
    })
    expect(mountpoints).toBeDefined()
  })

  it('should resolve with mountpoints for VRS', async () => {
    const mountpoints = await ntripSourcetableParser({
      host: 'positionz-rt.linz.govt.nz',
      port: 2101,
      position: { lat: 40.7128, lon: -74.006 },
    })
    expect(mountpoints).toBeDefined()
  })
})
