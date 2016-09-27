import React, { PropTypes } from 'react'

const BasicInfoForm = ({
  name,
  email,
  isSaving,
  onChangeName,
  onChangeEmail,
  onClickSubmit,
  onClickCancel
}) => {
  return (
    <section className='card'>

      <div className='card-header'>
        <div className='columns'>
          <div className='column'>
            <h2 className='card-title float-left'>Basic Information</h2>
          </div>
        </div>
      </div>

      <div className='card-body'>
        <div className='columns'>
          <div className='column'>
            <form>
              <div className='columns'>
                <div className='column'>
                  <label className='form-label' htmlFor='name-input'>Name</label>
                  <input className='form-input' id='name-input' type='text' value={name} placeholder='Add your name' onChange={onChangeName} />
                </div>
              </div>
              <div className='columns'>
                <div className='column'>
                  <label className='form-label' htmlFor='email-input'>Email</label>
                  <input className='form-input' id='email-input' type='email' value={email} placeholder='Add your email address' onChange={onChangeEmail} />
                </div>
              </div>
              <div className='columns'>
                <div className='column'>
                  <div className='form-group btn-group'>
                    <button className={'submit btn btn-primary ' + (isSaving ? 'loading' : '')} type='submit' onClick={onClickSubmit}>Submit</button>
                    <button className='cancel btn' type='reset' onClick={onClickCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </section>
  )
}

BasicInfoForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired
}

export default BasicInfoForm
