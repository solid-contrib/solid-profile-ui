import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import PictureForm from '../components/PictureForm'

const PictureEditor = ({ actions, picUrl }) => {
  const props = {
    picUrl,
    handleChoosePic: () => console.log('clicked choose pic'),
    handleClickUpload: event => {
      event.preventDefault
      console.log('clicked upload')
    },
    handleClickCancel: () => console.log('clicked cancel')
  }

  return (
    <PictureForm {...props} />
  )
}

PictureEditor.propTypes = {
  actions: PropTypes.object.isRequired,
  picUrl: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
    picUrl: state.picture.fileDataURL || state.picture.model.get('img')[0].value
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureEditor)
