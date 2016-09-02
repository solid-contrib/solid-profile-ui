import { SOLID_PROFILE_LOAD } from '../src/action-types'
import { solidProfile } from '../src/rootReducer'

describe('rootReducer', () => {
  describe('solidProfile', () => {
    it('stores the solidProfile when it has been loaded', () => {
      const profile = {foo: 'bar'}
      expect(solidProfile(undefined, {
        type: SOLID_PROFILE_LOAD,
        solidProfile: profile
      })).toEqual(profile)
    })

    it('stores the current profile for an unfamiliar action', () => {
      const currentState = {prop: 'value'}
      expect(solidProfile(currentState, {
        type: 'UNFAMILIAR_ACTION'
      })).toEqual(currentState)
    })
  })
})
