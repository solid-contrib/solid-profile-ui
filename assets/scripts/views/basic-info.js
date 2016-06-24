/* global FileReader */
import 'whatwg-fetch'

import basicInfoTpl from '../templates/basic-info-card.handlebars'
import editBasicInfoTpl from '../templates/basic-info-edit.handlebars'
import View from './view'
import { addressToMbox, mboxToAddress } from '../utils'

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
    event.preventDefault()

    // TODO: validate inputs
    const newName = this.qs('#name-input').value.trim()
    const newEmail = this.qs('#email-input').value.trim()
    const file = this.qs('#img-input').files[0]

    this.qs('button.submit').classList.add('loading')

    // TODO: convert name to a slug

    let updateProfilePromise = file
      ? this.profile.uploadPic(file)
          .then(resp => {
            this.profile.update({
              name: newName,
              mbox: addressToMbox(newEmail),
              img: resp.headers.get('location')
            })
          })
      : this.profile.update({
        name: newName,
        mbox: addressToMbox(newEmail)
      })

    updateProfilePromise
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
