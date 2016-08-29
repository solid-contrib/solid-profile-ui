import React, { PropTypes } from 'react'

const PictureForm = ({
  picUrl,
  canUpload,
  isSaving,
  handleButtonChoosePic,
  handleChoosePic,
  handleClickUpload,
  handleClickCancel
}) => (
  <section className="card">
    <div className="card-header">
      <h1 className="card-title text-center">Profile Picture</h1>
    </div>
    <div className="card-body">
      <div className="columns">
        <div className="column">
          <img src={picUrl} alt="User profile picture" className="avatar avatar-xl centered" />
        </div>
      </div>
      <form>
        <div className="columns">
          <div className="column col-sm-12">
            <input id="img-input" className="hide" type="file" accept="image/*" onChange={handleChoosePic} />
            <button className="btn centered" onClick={handleButtonChoosePic}>Choose Picture</button>
          </div>
        </div>
        <div className="columns">
          <div className="column text-center">
            <div className="btn-group">
              <button className={'btn btn-primary ' + (isSaving ? 'loading' : '')} type="submit" disabled={!canUpload} onClick={handleClickUpload}>Upload</button>
              <button className="btn" type="reset" disabled={!canUpload} onClick={handleClickCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
)

PictureForm.propTypes = {
  picUrl: PropTypes.string.isRequired,
  canUpload: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  handleButtonChoosePic: PropTypes.func.isRequired,
  handleChoosePic: PropTypes.func.isRequired,
  handleClickUpload: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired
}

export default PictureForm
