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
    const { name, mbox, picUrl } = this.profile.basicInfo()
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
    const { name, mbox, picUrl } = this.profile.basicInfo()
    this.renderHtml(editBasicInfoTpl({
      name: name,
      picUrl: picUrl,
      emailAddr: mboxToAddress(mbox)
    }))
    // add event listeners
    this.qs('button.submit').addEventListener('click', this.onSubmit.bind(this))
    this.qs('button.cancel').addEventListener('click', this.render.bind(this))
    const img = this.qs('#img-input')
    img.addEventListener('change', () => {
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

    // TODO: handle error cases
    this.profile.patch({
      name: newName,
      email: newEmail
    })
  }

  _getFileDataURL () {
    const img = this.qs('#img-input')

    return new Promise((resolve, reject) => {
      if (!img) {
        reject('Could not find "#img-input"')
      }

      const newPic = img.files[0]

      if (!newPic) {
        reject('No file selected')
      }

      let fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.readAsDataURL(newPic)
    })
  }
}
