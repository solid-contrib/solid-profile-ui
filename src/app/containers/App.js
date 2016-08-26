import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BasicInfo from '../../basic-info/containers/BasicInfo'

const App = ({ auth, basicInfoModel }) => {
  if (auth.isLoading || Object.keys(basicInfoModel).length === 0) {
    return <div className="loading" />
  }

  return <BasicInfo />
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  basicInfoModel: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return { auth: state.auth, basicInfoModel:  state.basicInfo.currentModel}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
