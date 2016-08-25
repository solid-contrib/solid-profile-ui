import React, { PropTypes } from 'react'

const ProfileEdit = ({
  name,
  email,
  picUrl,
  onChangeName,
  onChangeEmail,
  onClickSubmit,
  onClickCancel
}) => {
  return (
    <section className="card">

      <div className="card-header">
        <div className="columns">
          <div className="column">
            <h2 className="card-title float-left">Basic Information</h2>
          </div>
        </div>
      </div>

      <div className="card-body">
        <form>
          <div className="columns">
            <div className="column col-sm-4">
              <div className="columns">
                <div className="column">
                  <img src={picUrl} alt="User profile" className="avatar avatar-xl" />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <button className="btn btn-sm" id="img-select" type="button">Choose Picture</button>
                </div>
              </div>
            </div>
            <div className="column col-sm-8">
              <div className="columns">
                <div className="column">
                  <label className="form-label" htmlFor="name-input">Name</label>
                  <input className="form-input" id="name-input" type="text" value={name} onChange={onChangeName} />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <label className="form-label" htmlFor="email-input">Email</label>
                  <input className="form-input" id="email-input" type="text" value={email} onChange={onChangeEmail} />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="form-group">
                    <button className="submit btn btn-primary" type="submit" onClick={onClickSubmit}>Submit</button>
                    <button className="cancel btn" type="reset" onClick={onClickCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </section>
  )
}

ProfileEdit.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  picUrl: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired
}

export default ProfileEdit
