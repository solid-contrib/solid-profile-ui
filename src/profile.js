import { fieldFactory, modelFactory } from 'modelld'
import { rdflib, vocab } from 'solid-client'

export default function createProfile (solidProfile) {
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
  const name = field(vocab.foaf('name'))
  const mbox = field(vocab.foaf('mbox'))
  const img = field(vocab.foaf('img'))
  const profileModel = modelFactory(rdflib, {
    name,
    mbox,
    img
  })
  return profileModel(solidProfile.parsedGraph, webId)
}
