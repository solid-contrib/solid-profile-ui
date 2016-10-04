/* global describe, it, expect */
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'

import { createProfileGraph } from '../../utils'
import BasicInfoForm from '../../../src/basic-info/components/BasicInfoForm'
import { BasicInfoEditor } from '../../../src/basic-info/containers/BasicInfoEditor'
import { createBasicInfoModel } from '../../../src/basic-info/models'

describe('BasicInfoEditor', () => {
  describe('<BasicInfoEditor />', () => {
    const defaultActions = {
      changeField: noop,
      save: noop,
      cancelEditing: noop
    }

    function noop () {}

    function renderBasicInfo (actions) {
      const webId = 'https://example.com/profile/card#me'
      const graph = createProfileGraph(webId)
      const model = createBasicInfoModel(graph, webId)
      const props = {
        editedModel: model,
        isSaving: false,
        actions: {...defaultActions, ...actions}
      }
      return {
        wrapper: shallow(<BasicInfoEditor {...props} />),
        model
      }
    }

    it('renders a <BasicInfoForm />', () => {
      const {wrapper} = renderBasicInfo(defaultActions)
      expect(wrapper.matchesElement(
        <BasicInfoForm
          name='Neat Example'
          email='neat_example@example.com'
          isSaving={false}
        />
      )).toBe(true)
    })

    it('passes a function triggering the save action', () => {
      const saveSpy = spy()
      const {wrapper, model} = renderBasicInfo({save: saveSpy})
      const event = {preventDefault: noop}
      wrapper.props().onClickSubmit(event)
      expect(saveSpy.calledOnce).toBe(true)
      expect(saveSpy.calledWith(model)).toBe(true)
    })

    it('passes a function triggering thet cancel action', () => {
      const cancelSpy = spy()
      const {wrapper} = renderBasicInfo({cancelEditing: cancelSpy})
      wrapper.props().onClickCancel()
      expect(cancelSpy.calledOnce).toBe(true)
    })

    describe('editing', () => {
      it('triggers a changeField action when the user edits their name', () => {
        const changeFieldSpy = spy()
        const {wrapper, model} = renderBasicInfo({changeField: changeFieldSpy})
        const event = {target: {value: 'New Name'}}
        wrapper.props().onChangeName(event)
        expect(changeFieldSpy.calledOnce).toBe(true)
        expect(changeFieldSpy.calledWith(
          model.fields('name')[0], 'New Name')
        ).toBe(true)
      })

      it('triggers a changeField action when the user edits their email', () => {
        const changeFieldSpy = spy()
        const {wrapper, model} = renderBasicInfo({changeField: changeFieldSpy})
        const event = {target: {value: 'cool_new_email@example.com'}}
        wrapper.props().onChangeEmail(event)
        expect(changeFieldSpy.calledOnce).toBe(true)
        expect(changeFieldSpy.calledWith(
          model.fields('mbox')[0], 'mailto:cool_new_email@example.com')
        ).toBe(true)
      })
    })
  })
})
