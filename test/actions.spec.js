import { spy } from 'sinon'

import actionsInjector from 'inject!../src/actions'
import { SOLID_PROFILE_LOAD } from '../src/action-types'

describe('actions', () => {
  // Stub out the dispatch function since we're not testing with a redux store.
  // The stub just takes in an action and returns a promise resolving to that
  // action.
  const stubbedDispatch = action => Promise.resolve(action)

  // This function returns the actions module under test but with external
  // actions mocked out.
  const injectActions = getProfile => {
    // Authenticate already catches errors, so we can always resolve
    const stubbedAuthActionsModule = {
      authenticate: () => Promise.resolve({
        webId: 'dummy-web-id'
      })
    }
    const basicInfoGetModelSpy = spy()
    const pictureGetModelSpy = spy()
    const actions = actionsInjector({
      './auth/actions': stubbedAuthActionsModule,
      './basic-info/actions': {getModel: basicInfoGetModelSpy},
      './picture/actions': {getModel: pictureGetModelSpy},
      'solid-client': {getProfile}
    })
    return {
      actions,
      basicInfoGetModelSpy,
      pictureGetModelSpy
    }
  }

  describe('getModels', () => {
    it('fetches the solid profile and dispatches the appropriate model load actions', done => {
      const solidProfile = {field: 'value'}
      const {
        actions,
        basicInfoGetModelSpy,
        pictureGetModelSpy
      } = injectActions(webId => solidProfile)
      actions.getModels()(stubbedDispatch)
        .then(loadSolidProfileAction => {
          expect(basicInfoGetModelSpy.calledWith(solidProfile)).toBe(true)
          expect(pictureGetModelSpy.calledWith(solidProfile)).toBe(true)
          expect(loadSolidProfileAction).toEqual({
            type: SOLID_PROFILE_LOAD,
            solidProfile
          })
          done()
        })
    })

    it('dispatches a profile load failure action when the profile can\'t be loaded')
  })
})
