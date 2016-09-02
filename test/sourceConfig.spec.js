import sourceConfig from '../src/sourceConfig'

describe('sourceConfig', () => {
  describe('sourceConfig', () => {
    const webId = 'https://example.com/profile/card#me'

    it('returns the profile URI as the default and only listed URI', () => {
      expect(sourceConfig(webId).defaultSources.listed)
        .toEqual('https://example.com/profile/card')
      expect(sourceConfig(webId).sourceIndex['https://example.com/profile/card'])
        .toBe(true)
    })

    it('returns the preferences URI as the default and only unlisted URI', () => {
      expect(sourceConfig(webId).defaultSources.unlisted)
        .toEqual('https://example.com/settings/prefs.ttl')
      expect(sourceConfig(webId).sourceIndex['https://example.com/settings/prefs.ttl'])
        .toBe(false)
    })
  })
})
