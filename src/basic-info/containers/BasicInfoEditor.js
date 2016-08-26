import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import BasicInfoForm from '../components/BasicInfoForm'

class BasicInfoEditor extends React.Component {
  onChangeField (field, processNewValue = x => x) {
    const {actions} = this.props
    return event => {
      actions.changeField(field, processNewValue(event.target.value))
    }
  }

  render () {
    const {actions, editedModel, isSaving} = this.props
    const nameField = editedModel.get('name')[0]
    const emailField = editedModel.get('mbox')[0]
    const name = nameField.value
    const email = emailField.value.replace('mailto:', '')
    const onChangeName = this.onChangeField(nameField)
    const onChangeEmail = this.onChangeField(emailField, addr => `mailto:${addr}`)

    const onClickSubmit = event => {
      event.preventDefault()
      return actions.save(editedModel)
    }
    const onClickCancel = actions.cancelEditing

    const props = {
      name,
      email,
      isSaving,
      onChangeName,
      onChangeEmail,
      onClickSubmit,
      onClickCancel
    }
    return <BasicInfoForm {...props} />
  }
}

BasicInfoEditor.propTypes = {
  actions: PropTypes.object.isRequired,
  editedModel: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    editedModel: state.basicInfo.editedModel,
    isSaving: state.basicInfo.isSaving
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoEditor)
