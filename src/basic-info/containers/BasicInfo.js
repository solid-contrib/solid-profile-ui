import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import BasicInfoEditor from './BasicInfoEditor'
import BasicInfoView from '../components/BasicInfoView'

const BasicInfo = ({ actions, currentModel, editedModel }) => {
  if (Object.keys(editedModel).length) {
    return <BasicInfoEditor />
  } else {
    const name = currentModel.get('name')[0].value
    const mailTo = currentModel.get('mbox')[0].value
    const email = mailTo.replace('mailto:', '')
    const onClickEdit = () => actions.edit(currentModel)
    const props = {name, email, mailTo, onClickEdit}
    return <BasicInfoView {...props} />
  }
}

BasicInfo.propTypes = {
  currentModel: PropTypes.object.isRequired,
  editedModel: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    currentModel: state.basicInfo.currentModel,
    editedModel: state.basicInfo.editedModel
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo)
