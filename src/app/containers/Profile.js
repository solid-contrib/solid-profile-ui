import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import ProfileEditor from './ProfileEditor'
import ProfileView from '../components/ProfileView'

const Profile = ({ isEditing, profile, editedProfile, actions }) => {
  // TODO: validate all these values on the profile with a container component
  const name = profile.get('name')[0].value
  const mailTo = profile.get('mbox')[0].value
  const email = mailTo.replace('mailto:', '')
  const picUrl = profile.get('img')[0].value

  // const onChange = (fieldName) => {
  //   return (event) => {
  //     actions.
  //   }
  // }

  return isEditing
    ? <ProfileEditor />
    : <ProfileView
        name={name}
        email={email}
        mailTo={mailTo}
        picUrl={picUrl}
        onClickEdit={() => actions.editProfile(profile)}
      />
}

Profile.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    isEditing: state.isEditing,
    profile: state.profile,
    editedProfile: state.editedProfile
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
