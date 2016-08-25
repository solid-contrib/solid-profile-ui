import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import ProfileEdit from '../components/ProfileEdit'

const ProfileEditor = ({ profile, isLoading, actions }) => {
  const nameField = profile.get('name')[0]
  const mboxField = profile.get('mbox')[0]
  const imgField = profile.get('img')[0]

  const onChangeName = event => {
    return actions.changeProfileField(nameField, event.target.value)
  }
  const onChangeEmail = event => {
    return actions.changeProfileField(mboxField, `mailto:${event.target.value}`)
  }
  // ...
  // TODO: implement picture upload
  // ...
  const onClickCancel = actions.cancelEditingProfile
  const onClickSubmit = event => {
    event.preventDefault()
    return actions.saveProfile(profile)
  }

  const name = nameField.value
  const email = mboxField.value.replace('mailto:', '')
  const picUrl = imgField.value

  const props = {
    name,
    email,
    picUrl,
    isLoading,
    onChangeName,
    onChangeEmail,
    onClickSubmit,
    onClickCancel
  }

  return (
    <ProfileEdit {...props} />
  )
}

ProfileEditor.propTypes = {
  profile: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {profile: state.editedProfile, isLoading: state.isLoading}
}

function mapDispatchToProps (dispatch) {
  return {actions: bindActionCreators(Actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor)
