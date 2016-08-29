import { fieldFactory, modelFactory } from 'modelld'
import { rdflib, vocab } from 'solid-client'

export function createPictureModel (solidProfile) {
  const webId = solidProfile.webId
  const profileURI = webId.replace('#me', '')
  const privateURI = profileURI.replace('profile/card', 'settings/prefs.ttl')
  const sourceConfig = {
    defaultSources: {
      listed: profileURI,
      unlisted: privateURI
    },
    sourceIndex: {
      [profileURI]: true,
      [privateURI]: false
    }
  }
  const field = fieldFactory(sourceConfig)
  const img = field(vocab.foaf('img'))
  const pictureModel = modelFactory(rdflib, {
    img
  })
  return pictureModel(solidProfile.parsedGraph, webId)
}
