/* global FileReader */
import 'whatwg-fetch'

import basicInfoTpl from '../templates/basic-info-card.handlebars'
import editBasicInfoTpl from '../templates/basic-info-edit.handlebars'
import View from './view'
import { mboxToAddress } from '../utils'

export default class BasicInfoView extends View {
  constructor (containerEl, profile) {
    super(containerEl)
    this.profile = profile
    this.profile.on('loaded', this.render.bind(this))
  }

  render () {
    const { name, mbox, picUrl } = this.profile.basicInfo
    this.renderHtml(basicInfoTpl({
      name: name,
      picUrl: picUrl,
      emailAddr: mboxToAddress(mbox),
      mbox: mbox
    }))
    this.qs('button.edit').addEventListener('click', this.edit.bind(this))
    return this
  }

  edit () {
    const { name, mbox, picUrl } = this.profile.basicInfo
    this.renderHtml(editBasicInfoTpl({
      name: name,
      picUrl: picUrl,
      emailAddr: mboxToAddress(mbox)
    }))
    // add event listeners
    this.qs('button.submit').addEventListener('click', this.onSubmit.bind(this))
    this.qs('button.cancel').addEventListener('click', this.render.bind(this))
    const picInput = this.qs('#img-input')
    const picSelectButton = this.qs('#img-select')
    // Proxy the <input> element for better UX
    picSelectButton.addEventListener('click', (event) => {
      event.preventDefault()
      picInput.click()
    })
    picInput.addEventListener('change', () => {
      this._getFileDataURL()
        .then(fileDataURL => {
          this.qs('img.avatar').src = fileDataURL
        })
        .catch(err => {
          console.log(err)
        })
    })
    return this
  }

  onSubmit (event) {
    // TODO: validate inputs
    const newName = this.qs('#name-input').value.trim()
    const newEmail = this.qs('#email-input').value.trim()

    event.preventDefault()

    this.qs('button.submit').classList.add('loading')


    const imgInput = this.qs('#img-input')
    const file = imgInput.files[0] // TODO: handle error
    // TODO: convert name to a slug
    const data = new FormData()
    data.append('file', file)
    fetch(this.profile.storageURI, {
      method: 'POST',
      body: data
    })
      .then(resp => {
        // coerce error status codes into a rejected promise
        if (resp.status >= 200 && resp.status < 300) {
          return resp
        } else {
          var err = new Error(response.statusText)
          err.response = response
          throw err
        }
      })
      .then(resp => {
        // patch the profile after the image successfully uploads
        const picUrl = resp.headers.get('location')
        this.profile.patch({
          name: newName,
          email: newEmail,
          picUrl: picUrl
        })
      })
      .catch(err => {
        console.log('Network or server error:', err)
      })

    /*
    TODO: handle error cases
      - what happens when the image POST fails, but PATCH-ing the profile works?
      - what happens when PATCH-ing the profile fails?
      - what happens when deleting the old pic fails?
    */

  }

  _getFileDataURL () {
    const img = this.qs('#img-input')

    return new Promise((resolve, reject) => {
      if (!img) {
        reject(new Error('Could not find "#img-input"'))
      }

      const newPic = img.files[0]

      if (!newPic) {
        reject(new Error('No file selected'))
      }

      let fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.readAsDataURL(newPic)
    })
  }
}
