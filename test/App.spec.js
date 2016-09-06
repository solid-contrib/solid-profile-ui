import { shallow } from 'enzyme'
import React from 'react'

import { App } from '../src/App'
import { BasicInfo } from '../src/basic-info/containers/BasicInfo'
import { PictureEditor } from '../src/picture/containers/PictureEditor'

describe('<App />', () => {
  it('should render a loading indicator when authenticating', () => {
    const wrapper = shallow(<App auth={{isLoading: true}} />)
    expect(wrapper.contains(<div className="loading" />)).toBe(true)
  })

  it('should render a <PictureEditor /> and a <BasicInfo /> once authenticated', () => {
    const wrapper = shallow(<App auth={{isLoading: false}} />)
    expect(wrapper.contains(<PictureEditor />))
    expect(wrapper.contains(<BasicInfo />))
  })
})
