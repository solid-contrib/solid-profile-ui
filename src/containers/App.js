import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import ProfileView from '../components/ProfileView'

// TODO: validate all these values on the profile
// TODO: create a loading view
const App = ({ profile, actions }) => {
  if (Object.keys(profile).length === 0) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const name = profile.get('name')[0].value
  const mailTo = profile.get('mbox')[0].value
  const email = mailTo.replace('mailto:', '')
  const picUrl = profile.get('img')[0].value

  return (
    <div>
      <ProfileView
        name={name}
        email={email}
        mailTo={mailTo}
        picUrl={picUrl}
        onClickEdit={actions.editProfile}
      />
    </div>
  )
}

App.propTypes = {
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return { profile: state.profile }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
