import { fieldFactory } from 'modelld'
import { vocab } from 'solid-client'

export default function fields (sourceConfig) {
  const field = fieldFactory(sourceConfig)
  return {
    img: field(vocab.foaf('img'))
  }
}
