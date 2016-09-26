/* global describe, it, expect */

import {
  BASIC_INFO_GET_MODEL,
  BASIC_INFO_EDIT,
  BASIC_INFO_FIELD_CHANGE,
  BASIC_INFO_CANCEL_EDITING,
  BASIC_INFO_SAVE_REQUEST,
  BASIC_INFO_SAVE_SUCCESS,
  BASIC_INFO_SAVE_FAILURE
} from '../../src/basic-info/action-types'
import fields from '../../src/basic-info/fields'
import { createBasicInfoModel } from '../../src/basic-info/models'
import { currentModel, editedModel, isSaving } from '../../src/basic-info/reducers'
import sourceConfig from '../../src/sourceConfig'
import { createProfileGraph } from '../utils'

import { vocab } from 'solid-client'

describe('basic info reducers', () => {
  describe('currentModel', () => {
    it('returns the given model for get/save model actions', () => {
      const model = {prop: 'value'}
      expect(currentModel({}, {type: BASIC_INFO_GET_MODEL, model})).toEqual(model)
      expect(currentModel({}, {type: BASIC_INFO_SAVE_SUCCESS, model})).toEqual(model)
    })

    it('returns the current state for unrecognized actions', () => {
      const currentState = {prop: 'value'}
      expect(currentModel(currentState, {type: 'UNRECOGNIZED_ACTION'})).toEqual(currentState)
    })
  })

  describe('editedModel', () => {
    describe('edit action', () => {
      it('returns the given model if it already has name and mbox fields', () => {
        const webId = 'https://example.com/profile/card#me'
        const graph = createProfileGraph(webId)
        const model = createBasicInfoModel(graph, webId)
        const edited = editedModel({}, {
          type: BASIC_INFO_EDIT,
          model,
          fieldCreators: fields(sourceConfig(webId))
        })
        expect(edited.any('name')).not.toBeUndefined()
        expect(edited.any('mbox')).not.toBeUndefined()
        expect(model).toEqual(edited)
      })

      it('returns the given model with added name and mbox fields if missing', () => {
        const webId = 'https://example.com/profile/card#me'
        const graph = createProfileGraph(webId)
        graph.removeMatches(null, vocab.foaf('name'))
        graph.removeMatches(null, vocab.foaf('mbox'))
        const model = createBasicInfoModel(graph, webId)
        expect(model.any('name')).toBeUndefined()
        expect(model.any('mbox')).toBeUndefined()
        const edited = editedModel({}, {
          type: BASIC_INFO_EDIT,
          model,
          fieldCreators: fields(sourceConfig(webId))
        })
        expect(edited.any('name')).toEqual('')
        expect(edited.any('mbox')).toEqual('')
      })
    })

    it('returns the updated model for a field change action', () => {
      const webId = 'https://example.com/profile/card#me'
      const graph = createProfileGraph(webId)
      const model = createBasicInfoModel(graph, webId)
      const field = model.fields('name')[0]
      expect(editedModel(model, {
        type: BASIC_INFO_FIELD_CHANGE,
        field,
        value: 'New Name'
      }).any('name')).toEqual('New Name')
    })

    it('returns an empty object for cancel, save, and get_model actions', () => {
      const webId = 'https://example.com/profile/card#me'
      const graph = createProfileGraph(webId)
      const model = createBasicInfoModel(graph, webId)
      expect(editedModel(model, {type: BASIC_INFO_CANCEL_EDITING})).toEqual({})
      expect(editedModel(model, {type: BASIC_INFO_SAVE_SUCCESS})).toEqual({})
      expect(editedModel(model, {type: BASIC_INFO_GET_MODEL})).toEqual({})
    })

    it('returns the current state for unrecognized actions', () => {
      const webId = 'https://example.com/profile/card#me'
      const graph = createProfileGraph(webId)
      const model = createBasicInfoModel(graph, webId)
      expect(editedModel(model, {type: 'UNRECOGNIZED_ACTION'})).toEqual(model)
      expect(editedModel({}, {type: 'UNRECOGNIZED_ACTION'})).toEqual({})
    })
  })

  describe('isSaving', () => {
    it('returns true for a save request action', () => {
      expect(isSaving(false, {type: BASIC_INFO_SAVE_REQUEST})).toBe(true)
    })

    it('returns false for save success/failure actions', () => {
      expect(isSaving(true, {type: BASIC_INFO_SAVE_SUCCESS})).toBe(false)
      expect(isSaving(true, {type: BASIC_INFO_SAVE_FAILURE})).toBe(false)
    })

    it('returns the current state for unrecognized actions', () => {
      expect(isSaving(false, {type: 'UNRECOGNIZED_ACTION'})).toBe(false)
      expect(isSaving(true, {type: 'UNRECOGNIZED_ACTION'})).toBe(true)
    })
  })
})
