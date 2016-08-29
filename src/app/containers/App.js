import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BasicInfo from '../../basic-info/containers/BasicInfo'
import PictureEditor from '../../picture/containers/PictureEditor'

const App = ({ auth }) => {
  if (auth.isLoading) {
    return <div className="loading" />
  }

  return (
    <div className="columns">
      <div className="column">
        <PictureEditor />
      </div>
      <div className="column">
        <BasicInfo />
      </div>
    </div>
  )
}

App.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return { auth: state.auth }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
