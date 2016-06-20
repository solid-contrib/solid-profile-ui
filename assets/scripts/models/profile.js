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
    const name = this.profile.parsedGraph.any(webId, vocab.foaf('name'))
    const mbox = this.profile.parsedGraph.any(webId, vocab.foaf('mbox'))
    const pic = this.profile.parsedGraph.any(webId, vocab.foaf('img'))
    return {
      name: name ? name.value : '',
      mbox: mbox ? mbox.value : '',
      picUrl: pic ? pic.uri : 'assets/img/solid-logo.svg'
    }
  }

  patch (options) {
    const newName = options.name
    const newEmail = options.email
    let triplesToDel = []
    let triplesToIns = []
    let oldNameTriple = this._getTriple(solid.vocab.foaf('name'))
    let oldEmailTriple = this._getTriple(vocab.foaf('mbox'))
    let newNameTriple = $rdf.st(
      $rdf.sym(this.webId), solid.vocab.foaf('name'), newName
    )
    let newEmailTriple = $rdf.st(
      $rdf.sym(this.webId), solid.vocab.foaf('mbox'), addressToMbox(newEmail)
    )

    if (!isEqual(oldNameTriple, newNameTriple)) {
      triplesToIns.push(newNameTriple.toNT())
      if (oldNameTriple) {
        triplesToDel.push(oldNameTriple.toNT())
      }
    }
    if (!isEqual(oldEmailTriple, newEmailTriple)) {
      triplesToIns.push(newEmailTriple.toNT())
      if (oldEmailTriple) {
        triplesToDel.push(oldEmailTriple.toNT())
      }
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
    const triples = this.profile.parsedGraph.statementsMatching(
      $rdf.sym(this.webId), predicate, undefined
    )
    return triples.length ? triples[0] : null
  }
}
