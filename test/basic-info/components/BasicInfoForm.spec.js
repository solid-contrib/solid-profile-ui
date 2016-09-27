/* global describe, it, expect */
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'

import BasicInfoForm from '../../../src/basic-info/components/BasicInfoForm'

describe('BasicInfoForm', () => {
  describe('<BasicInfoForm />', () => {
    function renderForm (props) {
      const noop = () => {}
      return shallow(
        <BasicInfoForm
          {...Object.assign({
            name: 'Test Name',
            email: 'test_name@example.com',
            isSaving: false,
            onChangeName: noop,
            onChangeEmail: noop,
            onClickSubmit: noop,
            onClickCancel: noop
          }, props)}
        />
      )
    }

    it('renders itself when loaded', () => {
      const wrapper = renderForm()
      expect(wrapper.find('#name-input').props().value).toEqual('Test Name')
      expect(wrapper.find('#email-input').props().value).toEqual('test_name@example.com')
      expect(wrapper.find('button.submit').hasClass('loading')).toBe(false)
    })

    it('renders itself loading', () => {
      const wrapper = renderForm({isSaving: true})
      expect(wrapper.find('#name-input').props().value).toEqual('Test Name')
      expect(wrapper.find('#email-input').props().value).toEqual('test_name@example.com')
      expect(wrapper.find('button.submit').hasClass('loading')).toBe(true)
    })

    describe('editing', () => {
      it('calls a callback every time the name is edited', () => {
        const callback = spy()
        const wrapper = renderForm({onChangeName: callback})
        wrapper.find('#name-input').simulate('change', 'New Name')
        expect(callback.calledOnce).toBe(true)
        expect(callback.calledWith('New Name')).toBe(true)
      })

      it('calls a callback every time the email is edited', () => {
        const callback = spy()
        const wrapper = renderForm({onChangeEmail: callback})
        wrapper.find('#email-input').simulate('change', 'new_email@example.com')
        expect(callback.calledOnce).toBe(true)
        expect(callback.calledWith('new_email@example.com')).toBe(true)
      })

      it('calls a callback when the save button is clicked', () => {
        const callback = spy()
        const wrapper = renderForm({onClickSubmit: callback})
        wrapper.find('button.submit').simulate('click')
        expect(callback.calledOnce).toBe(true)
      })

      it('calls a callback when the cancel button is clicked', () => {
        const callback = spy()
        const wrapper = renderForm({onClickCancel: callback})
        wrapper.find('button.cancel').simulate('click')
        expect(callback.calledOnce).toBe(true)
      })
    })
  })
})
