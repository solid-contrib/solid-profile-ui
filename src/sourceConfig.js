export default function sourceConfig (webId) {
  const baseUrl = webId.replace('/profile/card#me', '')
  const profileURI = `${baseUrl}/profile/card`
  const privateURI = `${baseUrl}/settings/prefs.ttl`
  return {
    defaultSources: {
      listed: profileURI,
      unlisted: privateURI
    },
    sourceIndex: {
      [profileURI]: true,
      [privateURI]: false
    }
  }
}
