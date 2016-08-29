import { fieldFactory, modelFactory } from 'modelld'
import { rdflib, vocab } from 'solid-client'

export function createBasicInfoModel (solidProfile) {
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
  const basicInfoModel = modelFactory(rdflib, {
    name,
    mbox
  })
  return basicInfoModel(solidProfile.parsedGraph, webId)
}
