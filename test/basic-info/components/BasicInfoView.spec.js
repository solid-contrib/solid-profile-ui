/* global describe, it, expect */
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'

import BasicInfoView from '../../../src/basic-info/components/BasicInfoView'

describe('BasicInfoView', () => {
  describe('<BasicInfoView />', () => {
    it('renders itself', () => {
      const wrapper = shallow(
        <BasicInfoView
          name='Test Name'
          email='test_name@example.com'
          mailTo='mailto:test_name@example.com'
          onClickEdit={() => {}}
        />
      )
      expect(wrapper.text()).toContain('Test Name')
      expect(wrapper.contains(
        <a href='mailto:test_name@example.com'>test_name@example.com</a>)
      ).toBe(true)
    })

    it('calls a callback when the edit button is clicked', () => {
      const callback = spy()
      const wrapper = shallow(
        <BasicInfoView
          name='Test Name'
          email='test_name@example.com'
          mailTo='mailto:test_name@example.com'
          onClickEdit={callback}
        />
      )
      wrapper.find('.edit').simulate('click')
      expect(callback.calledOnce).toBe(true)
    })
  })
})
