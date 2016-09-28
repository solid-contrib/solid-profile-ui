import React, { PropTypes } from 'react'

const ProfileView = ({ name, email, mailTo, onClickEdit }) => (
  <section className="card">
    <div className="card-header">
      <div className="columns">
        <div className="column col-sm-9">
          <h2 className="card-title float-left">Basic Information</h2>
        </div>
        <div className="col-sm-3">
          <button className="edit btn float-right" onClick={onClickEdit}>Edit</button>
        </div>
      </div>
    </div>
    <div className="card-body">
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <span className="label">Name</span>
              &nbsp;
              <span>{name}</span>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <span className="label">Email</span>
              &nbsp;
              <span><a href={mailTo}>{email}</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

ProfileView.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mailTo: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired
}

export default ProfileView
