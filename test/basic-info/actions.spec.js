/* global describe, it, expect */
import { rdflib } from 'solid-client'

import {
  BASIC_INFO_GET_MODEL,
  BASIC_INFO_EDIT,
  BASIC_INFO_FIELD_CHANGE,
  BASIC_INFO_CANCEL_EDITING,
  BASIC_INFO_SAVE_REQUEST,
  BASIC_INFO_SAVE_SUCCESS,
  BASIC_INFO_SAVE_FAILURE
} from '../../src/basic-info/action-types'
import {
  getModel,
  edit,
  changeField
} from '../../src/basic-info/actions'

describe('basic info actions', () => {
  describe('getModel', () => {
    it('generates an action with the provided model', () => {
      const body = `
      @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
      <>
          a <http://xmlns.com/foaf/0.1/PersonalProfileDocument> ;
          <http://xmlns.com/foaf/0.1/maker> <#me> ;
          <http://xmlns.com/foaf/0.1/primaryTopic> <#me> .
      <#me>
          a <http://xmlns.com/foaf/0.1/Person> ;
          <http://www.w3.org/ns/pim/space#preferencesFile> <../Preferences/prefs.ttl> ;
          <http://www.w3.org/ns/pim/space#storage> <../> ;
          <http://www.w3.org/ns/solid/terms#inbox> <../Inbox/> ;
          <http://www.w3.org/ns/solid/terms#publicTypeIndex> <publicTypeIndex.ttl> ;
          <http://www.w3.org/ns/solid/terms#timeline> <../Timeline/> ;
          <http://xmlns.com/foaf/0.1/familyName> "Example" ;
          <http://xmlns.com/foaf/0.1/givenName> "Neat" ;
          <http://xmlns.com/foaf/0.1/img> <neat_example.jpg> ;
          <http://xmlns.com/foaf/0.1/mbox> <mailto:neat_example@example.com> ;
          <http://xmlns.com/foaf/0.1/name> "Neat Example" ;
          <http://xmlns.com/foaf/0.1/phone> <tel:123-456-7890> .
    `
      const webId = 'https://example.com/profile/card#me'
      const store = rdflib.graph()
      rdflib.parse(body, store, webId, 'text/turtle')

      const profile = {
        webId,
        parsedGraph: store
      }

      const action = getModel(profile)
      expect(action.type).toEqual(BASIC_INFO_GET_MODEL)
      expect(action.model.any('name')).toEqual('Neat Example')
    })
  })

  describe('edit', () => {
    it('generates an edit action with a model and field creators', () => {
      const model = {field: 'value'}
      const fieldCreators = {
        field: () => {}
      }
      const action = edit(model, fieldCreators)
      expect(action.type).toBe(BASIC_INFO_EDIT)
      expect(action.model).toBe(model)
      expect(action.fieldCreators).toBe(fieldCreators)
    })
  })

  describe('changeField', () => {
    it('generates an action for a given field changing to a given value', () => {
      expect(changeField('foo', 'bar')).toEqual({
        type: BASIC_INFO_FIELD_CHANGE,
        field: 'foo',
        value: 'bar'
      })
    })
  })
})
