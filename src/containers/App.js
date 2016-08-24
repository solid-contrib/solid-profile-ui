import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import Profile from './Profile'

const App = ({ profile, actions }) => {
  // Assume that an empty profile object means we're still loading the page.
  if (Object.keys(profile).length === 0) {
    return (
      <div className="loading"></div>
    )
  }

  return <Profile />
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
