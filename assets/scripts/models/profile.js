/* global $rdf */
import clone from 'lodash/clone'
import isEqual from 'lodash/isEqual'
import solid, { vocab } from 'solid'
import Events from 'minivents'

import { addressToMbox } from '../utils'

export default class Profile extends Events {
  constructor (webId) {
    super()
    this.webId = webId
    this.profile = null
  }

  loadProfile () {
    return solid.getProfile(this.webId)
      .then(profile => {
        this.profile = profile
        this.emit('loaded')
      })
  }

  basicInfo () {
    if (!this.profile) { return {} }
    const webId = $rdf.sym(this.webId)
    return {
      name: this.profile.parsedGraph.any(webId, vocab.foaf('name')).value,
      mbox: this.profile.parsedGraph.any(webId, vocab.foaf('mbox')).uri,
      picUrl: this.profile.parsedGraph.any(webId, vocab.foaf('img')).uri
    }
  }

  patch (options) {
    const newName = options.name
    const newEmail = options.email
    let triplesToDel = []
    let triplesToIns = []
    let oldNameTriple = this._getTriple(solid.vocab.foaf('name'))
    let oldEmailTriple = this._getTriple(vocab.foaf('mbox'))
    let newNameTriple = clone(oldNameTriple)
    let newEmailTriple = clone(oldEmailTriple)

    newNameTriple.object = $rdf.lit(newName)
    newEmailTriple.object = $rdf.sym(addressToMbox(newEmail))

    if (!isEqual(oldNameTriple, newNameTriple)) {
      triplesToDel.push(oldNameTriple.toNT())
      triplesToIns.push(newNameTriple.toNT())
    }
    if (!isEqual(oldEmailTriple, newEmailTriple)) {
      triplesToDel.push(oldEmailTriple.toNT())
      triplesToIns.push(newEmailTriple.toNT())
    }

    if (triplesToDel.length === 0 && triplesToIns.length === 0) {
      return new Promise((resolve, reject) => {
        resolve(this.profile)
      })
        .then(() => {
          this.emit('loaded')
        })
    }

    return solid.web.patch(this.profile.baseProfileUrl, triplesToDel, triplesToIns)
      .then(meta => {
        return this.loadProfile()
      })
      .catch(err => {
        console.log('Error updating profile', err)
        this.emit('error')
      })
  }

  _getTriple (predicate) {
    return this.profile.parsedGraph.statementsMatching(
      $rdf.sym(this.webId), predicate, undefined
    )[0]
  }
}
