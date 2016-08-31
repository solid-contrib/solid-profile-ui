import { modelFactory } from 'modelld'
import { rdflib } from 'solid-client'

import fields from './fields'
import sourceConfig from '../sourceConfig'

export function createBasicInfoModel (graph, webId) {
  const {name, mbox} = fields(sourceConfig(webId))
  const basicInfoModel = modelFactory(rdflib, {
    name,
    mbox
  })
  return basicInfoModel(graph, webId)
}

