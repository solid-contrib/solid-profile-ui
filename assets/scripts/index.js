import solid from 'solid-client'

import Profile from './models/profile'
import BasicInfoView from './views/basic-info'

solid.login()
  .then(webId => {
    const profile = new Profile(webId)
    new BasicInfoView(document.getElementById('basic-info'), profile) // eslint-disable-line no-new
    profile.loadProfile()
  })
  .catch(err => {
    console.log('Error loading solid profile:', err)
  })
