/* global describe, it, expect */
import { shallow } from 'enzyme'
import React from 'react'
import { vocab } from 'solid-client'

import BasicInfoView from '../../../src/basic-info/components/BasicInfoView'
import BasicInfoEditor from '../../../src/basic-info/containers/BasicInfoEditor'
import { BasicInfo } from '../../../src/basic-info/containers/BasicInfo'
import { createBasicInfoModel } from '../../../src/basic-info/models'
import { createProfileGraph } from '../../utils'

describe('BasicInfo', () => {
  describe('<BasicInfo /> container', () => {
    describe('when not editing', () => {
      it('renders a <BasicInfoView />', () => {
        const webId = 'https://example.com/profile/card#me'
        const profile = createProfileGraph(webId)
        const currentModel = createBasicInfoModel(profile, webId)
        const wrapper = shallow(
          <BasicInfo
            actions={{edit: () => {}}}
            currentModel={currentModel}
            editedModel={{}}
            solidProfile={{
              baseProfileUrl: 'https://example.com/profile/card',
              parsedGraph: profile
            }}
          />
        )
        expect(wrapper.matchesElement(
          <BasicInfoView
            name='Neat Example'
            email='neat_example@example.com'
            mailTo='mailto:neat_example@example.com'
          />
        )).toBe(true)
      })

      it('renders a <BasicInfoView /> with default name and email', () => {
        const webId = 'https://example.com/profile/card#me'
        const graph = createProfileGraph(webId)
        graph.removeMatches(null, vocab.foaf('name'))
        graph.removeMatches(null, vocab.foaf('mbox'))
        const currentModel = createBasicInfoModel(graph, webId)
        const wrapper = shallow(
          <BasicInfo
            actions={{edit: () => {}}}
            currentModel={currentModel}
            editedModel={{}}
            solidProfile={{
              baseProfileUrl: 'https://example.com/profile/card',
              parsedGraph: graph
            }}
          />
        )
        expect(wrapper.matchesElement(
          <BasicInfoView
            name='Add your name'
            email='Add your email address'
            mailTo=''
          />
        )).toBe(true)
      })
    })

    describe('when editing', () => {
      it('renders a <BasicInfoEditor />', () => {
        const webId = 'https://example.com/profile/card#me'
        const profile = createProfileGraph(webId)
        const currentModel = createBasicInfoModel(profile, webId)
        const wrapper = shallow(
          <BasicInfo
            actions={{edit: () => {}}}
            currentModel={currentModel}
            editedModel={currentModel}
            solidProfile={{
              baseProfileUrl: 'https://example.com/profile/card',
              parsedGraph: profile
            }}
          />
        )
        expect(wrapper.matchesElement(
          <BasicInfoEditor />
        )).toBe(true)
      })
    })
  })
})
