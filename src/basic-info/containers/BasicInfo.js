import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import BasicInfoEditor from './BasicInfoEditor'
import BasicInfoView from '../components/BasicInfoView'
import fields from '../fields'
import sourceConfig from '../../sourceConfig'

export const BasicInfo = ({ actions, currentModel, editedModel, solidProfile }) => {
  if (Object.keys(editedModel).length) {
    return <BasicInfoEditor />
  } else {
    const baseUrl = solidProfile.baseProfileUrl.replace('/profile/card', '')
    const name = currentModel.any('name') || 'Add your name'
    const mailTo = currentModel.any('mbox') || ''
    const email = mailTo.replace('mailto:', '') || 'Add your email address'

    const fieldCreators = fields(sourceConfig(baseUrl))

    const onClickEdit = () => actions.edit(currentModel, fieldCreators)
    const props = {name, email, mailTo, onClickEdit}
    return <BasicInfoView {...props} />
  }
}

BasicInfo.propTypes = {
  currentModel: PropTypes.object.isRequired,
  editedModel: PropTypes.object.isRequired,
  solidProfile: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    currentModel: state.basicInfo.currentModel,
    editedModel: state.basicInfo.editedModel,
    solidProfile: state.solidProfile
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo)
