import { fieldFactory } from 'modelld'
import { vocab } from 'solid-client'

export default function fields (sourceConfig) {
  const field = fieldFactory(sourceConfig)
  return {
    name: field(vocab.foaf('name')),
    mbox: field(vocab.foaf('mbox'))
  }
}
