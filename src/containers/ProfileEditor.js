import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import ProfileEdit from '../components/ProfileEdit'

class ProfileEditor extends React.Component {
  onChangeField (field, processNewValue = x => x) {
    const {actions} = this.props
    return event => {
      actions.changeProfileField(field, processNewValue(event.target.value))
    }
  }

  render () {
    const {profile, actions, isLoading} = this.props

    const nameField = profile.get('name')[0]
    const mboxField = profile.get('mbox')[0]
    const imgField = profile.get('img')[0]

    const onChangeName = this.onChangeField(nameField)
    const onChangeEmail = this.onChangeField(mboxField, addr => `mailto:${addr}`)
    // ...
    // TODO: implement picture upload
    // ...
    const onSelectNewPic = event => {
      event.preventDefault()
      document.querySelector('#img-input').click()
      // return actions.
    }
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
      onSelectNewPic,
      onClickSubmit,
      onClickCancel
    }

    return (
      <ProfileEdit {...props} />
    )
  }
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
