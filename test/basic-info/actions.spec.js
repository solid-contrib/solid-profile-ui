/* global describe, it, expect */
import { spy, stub } from 'sinon'

import {
  BASIC_INFO_GET_MODEL,
  BASIC_INFO_EDIT,
  BASIC_INFO_FIELD_CHANGE,
  BASIC_INFO_CANCEL_EDITING
} from '../../src/basic-info/action-types'
import * as Actions from '../../src/basic-info/actions'
import { createProfileGraph } from '../utils'

describe('basic info actions', () => {
  describe('getModel', () => {
    it('generates an action with the provided model', () => {
      const webId = 'https://example.com/profile/card#me'
      const profile = {
        webId,
        parsedGraph: createProfileGraph(webId)
      }

      const action = Actions.getModel(profile)
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
      const action = Actions.edit(model, fieldCreators)
      expect(action.type).toBe(BASIC_INFO_EDIT)
      expect(action.model).toBe(model)
      expect(action.fieldCreators).toBe(fieldCreators)
    })
  })

  describe('changeField', () => {
    it('generates an action for a given field changing to a given value', () => {
      expect(Actions.changeField('foo', 'bar')).toEqual({
        type: BASIC_INFO_FIELD_CHANGE,
        field: 'foo',
        value: 'bar'
      })
    })
  })

  describe('cancelEditing', () => {
    it('generates an action for cancelling editing', () => {
      expect(Actions.cancelEditing()).toEqual({
        type: BASIC_INFO_CANCEL_EDITING
      })
    })
  })

  describe('save', () => {
    it('generates saveRequest and saveSuccess actions when saving works', done => {
      const model = {save: stub()}
      const newModel = {prop: 'value'}
      const dispatchSpy = spy()
      model.save.returns(Promise.resolve(newModel))
      Actions.save(model)(dispatchSpy)
        .then(() => {
          expect(dispatchSpy.calledWith(Actions.saveRequest())).toBe(true)
          expect(dispatchSpy.calledWith(Actions.saveSuccess(newModel))).toBe(true)
          done()
        })
    })

    it('generates saveRequest and saveFailure actions when saving fails', done => {
      const model = {save: stub()}
      const error = 'oops!'
      const dispatchSpy = spy()
      model.save.returns(Promise.reject(error))
      Actions.save(model)(dispatchSpy)
        .then(() => {
          expect(dispatchSpy.calledWith(Actions.saveRequest())).toBe(true)
          expect(dispatchSpy.calledWith(Actions.saveFailure(error))).toBe(true)
          done()
        })
    })
  })
})
