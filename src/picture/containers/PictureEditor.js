import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Actions from '../actions'
import PictureForm from '../components/PictureForm'

const PictureEditor = ({ actions, file, isSaving, picUrl, storageUrl }) => {
  const canUpload = file ? true : false
  const handleButtonChoosePic = event => {
    event.preventDefault()
    document.getElementById('img-input').click()
  }
  const handleChoosePic = event => actions.pick(event.target.files[0])
  const handleClickUpload = event => {
    event.preventDefault()
    actions.uploadAndSave(storageUrl, file)
  }
  const handleClickCancel = () => actions.cancel()

  const props = {
    picUrl,
    canUpload,
    isSaving,
    handleButtonChoosePic,
    handleChoosePic,
    handleClickUpload,
    handleClickCancel
  }

  return (
    <PictureForm {...props} />
  )
}

PictureEditor.propTypes = {
  actions: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  picUrl: PropTypes.string.isRequired,
  storageUrl: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
    file: state.picture.file,
    isSaving: state.picture.isSaving,
    picUrl: getPicUrl(state),
    storageUrl: state.solidProfile.storage[0]
  }
}

function getPicUrl (state) {
  const imgFields = state.picture.model.get('img')
  return state.picture.fileDataUrl
    || imgFields.length ? imgFields[0].value : '/assets/img/solid-logo.svg'
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureEditor)
