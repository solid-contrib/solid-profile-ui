/**
 * Given a Solid WebID, returns the sourceConfig for modelld fields.  `webId`
 * must be a solid WebID.
 *
 * @param {String} webId - the Solid WebID for a given user.
 * @returns {Object} - the modelld sourceConfig object.
 */
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
