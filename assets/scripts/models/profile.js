import isEqual from 'lodash/isEqual'
import solid, { rdflib as $rdf, vocab } from 'solid-client'
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

  get basicInfo () {
    if (!this.profile) { return {} }
    const webId = $rdf.sym(this.webId)
    const name = this.profile.parsedGraph.any(webId, vocab.foaf('name'))
    const mbox = this.profile.parsedGraph.any(webId, vocab.foaf('mbox'))
    const pic = this.profile.parsedGraph.any(webId, vocab.foaf('img'))
    return {
      name: name ? name.value : '',
      mbox: mbox ? mbox.value : '',
      picUrl: pic ? pic.value : 'assets/img/solid-logo.svg'
    }
  }

  get storageURI () {
    return `${this.profile.storage[0]}profile/`
  }

  patch (options) {
    const newName = options.name
    const newEmail = options.email
    const newPicUrl = options.picUrl
    let triplesToDel = []
    let triplesToIns = []
    // TODO: put .toNT() calls up here so that we don't need lodash.isEqual()
    let oldNameTriple = this._getTriple(solid.vocab.foaf('name'))
    let oldEmailTriple = this._getTriple(vocab.foaf('mbox'))
    let oldPicUrlTriple = this._getTriple(vocab.foaf('img'))
    let newNameTriple = $rdf.st(
      $rdf.sym(this.webId), solid.vocab.foaf('name'), newName
    )
    let newEmailTriple = $rdf.st(
      $rdf.sym(this.webId), solid.vocab.foaf('mbox'), addressToMbox(newEmail)
    )
    let newPicUrlTriple = $rdf.st(
      $rdf.sym(this.webId), solid.vocab.foaf('img'), newPicUrl
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
    if (!isEqual(oldPicUrlTriple, newPicUrlTriple)) {
      triplesToIns.push(newPicUrlTriple.toNT())
      if (oldPicUrlTriple) {
        triplesToDel.push(oldPicUrlTriple.toNT())
      }
    }

    if (triplesToDel.length === 0 && triplesToIns.length === 0) {
      return Promise.resolve(this.profile)
        .then(() => {
          this.emit('loaded')
        })
    }

    return solid.web.patch(this.profile.baseProfileUrl, triplesToDel, triplesToIns)
      .then(meta => {
        return this.loadProfile()
      })
      .catch(err => {
        console.log('Error updating profile:', err)
        this.emit('error')
        throw err
      })
  }

  _getTriple (predicate) {
    const triples = this.profile.parsedGraph.statementsMatching(
      $rdf.sym(this.webId), predicate, undefined
    )
    return triples.length ? triples[0] : null
  }
}
