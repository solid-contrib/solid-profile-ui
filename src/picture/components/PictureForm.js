import React, { PropTypes } from 'react'

const PictureForm = ({ picUrl, handleChoosePic, handleClickUpload, handleClickCancel }) => (
  <div>
    <img src={picUrl}></img>
    <form>
      <input type="file" accept="image/*" onClick={handleChoosePic} />
      <button type="submit" onClick={handleClickUpload}>Upload</button>
      <button type="reset" onClick={handleClickCancel}>Cancel</button>
    </form>
  </div>
)

PictureForm.propTypes = {
  picUrl: PropTypes.string.isRequired,
  handleChoosePic: PropTypes.func.isRequired,
  handleClickUpload: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired
}

export default PictureForm
