import { ntripSourcetableParser } from './index'

describe('ntripSourcetableParser', () => {
  it('should reject if host is missing', async () => {
    await expect(ntripSourcetableParser({ port: 2101 } as any)).rejects.toThrow(
      'NTRIP host is required'
    )
  })

  it('should reject if port is missing', async () => {
    await expect(
      ntripSourcetableParser({ host: 'localhost' } as any)
    ).rejects.toThrow('NTRIP port is required')
  })

  it('should resolve with mountpoints', async () => {
    const mountpoints = await ntripSourcetableParser({
      host: 'positionz-rt.linz.govt.nz',
      port: 2101,
    })
    expect(mountpoints).toBeDefined()
  })
})
