/* global fetch, FormData */
import Events from 'minivents'
import solid, { rdflib as $rdf, vocab } from 'solid-client'
import 'whatwg-fetch'

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

  update (options) {
    const fieldToPredicate = {
      name: vocab.foaf('name'),
      mbox: vocab.foaf('mbox'),
      img: vocab.foaf('img')
    }
    let triplesToDel = []
    let triplesToIns = []

    Object.keys(options).forEach(field => {
      const predicate = fieldToPredicate[field]
      const newValue = options[field]
      const oldTriple = this._getTriple(predicate)
      const newTriple = $rdf.st($rdf.sym(this.webId), predicate, newValue)
      if (oldTriple) {
        triplesToDel.push(oldTriple.toNT())
      }
      triplesToIns.push(newTriple.toNT())
    })

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

  uploadPic (file) {
    if (!file) {
      return Promise.reject(new Error('No file provided for upload'))
    }
    const data = new FormData()
    data.append('file', file)
    return fetch(this.storageURI, {
      method: 'POST',
      body: data
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp
        } else {
          // coerce error status codes into a rejected promise
          var err = new Error(resp.statusText)
          err.resp = resp
          throw err
        }
      })
  }

  _getTriple (predicate) {
    const triples = this.profile.parsedGraph.statementsMatching(
      $rdf.sym(this.webId), predicate, undefined
    )
    return triples.length ? triples[0] : null
  }
}
