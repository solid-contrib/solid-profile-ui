export default class View {
  constructor (containerEl) {
    this.containerEl = containerEl
  }

  /*
   * Sets the html of the view's containing element.  Assumes the html is
   * escaped.
   */
  renderHtml (html) {
    this.containerEl.innerHTML = html
  }

  qs (cssSelector) {
    return this.containerEl.querySelector(cssSelector)
  }
}
