import { modelFactory } from 'modelld'
import { rdflib } from 'solid-client'

import fields from './fields'
import sourceConfig from '../sourceConfig'

export function createPictureModel (graph, webId) {
  const {img} = fields(sourceConfig(webId))
  const pictureModel = modelFactory(rdflib, {
    img
  })
  return pictureModel(graph, webId)
}
