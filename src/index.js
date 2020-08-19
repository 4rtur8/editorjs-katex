require('./styles.css').toString()
require('../node_modules/katex/dist/katex.css').toString()
const katex = require('katex')

class Katex {
  static get toolbox () {
    return {
      title: 'Image',
      icon: '<svg aria-hidden="true" height="15" width="17" focusable="false" data-prefix="fas" data-icon="square-root-alt" class="svg-inline--fa fa-square-root-alt fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M571.31 251.31l-22.62-22.62c-6.25-6.25-16.38-6.25-22.63 0L480 274.75l-46.06-46.06c-6.25-6.25-16.38-6.25-22.63 0l-22.62 22.62c-6.25 6.25-6.25 16.38 0 22.63L434.75 320l-46.06 46.06c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L480 365.25l46.06 46.06c6.25 6.25 16.38 6.25 22.63 0l22.62-22.62c6.25-6.25 6.25-16.38 0-22.63L525.25 320l46.06-46.06c6.25-6.25 6.25-16.38 0-22.63zM552 0H307.65c-14.54 0-27.26 9.8-30.95 23.87l-84.79 322.8-58.41-106.1A32.008 32.008 0 0 0 105.47 224H24c-13.25 0-24 10.74-24 24v48c0 13.25 10.75 24 24 24h43.62l88.88 163.73C168.99 503.5 186.3 512 204.94 512c17.27 0 44.44-9 54.28-41.48L357.03 96H552c13.25 0 24-10.75 24-24V24c0-13.26-10.75-24-24-24z"></path></svg>'
    }
  }

  constructor ({ data, api }) {
    this.api = api
    this.data = data
    this.wrapper = undefined
    this.input = document.createElement('input')
  }

  render () {
    this.wrapper = document.createElement('div')
    const katexDiv = document.createElement('div')

    const formula = this.data && this.data.formula ? this.data.formula : ''

    this.input.addEventListener('input', (event) => {
      this._createFormula(this.input.value, katexDiv)
    })

    this.input.addEventListener('paste', (event) => {
      this._createFormula(event.clipboardData.getData('text'), katexDiv)
    })

    this._createFormula(formula, katexDiv)
    this.wrapper.classList.add('katex')
    katexDiv.classList.add('formula')

    this.wrapper.appendChild(this.input)
    this.wrapper.appendChild(katexDiv)

    this.input.value = formula
    this.input.placeholder = 'Inserta una Formula'

    return this.wrapper
  }

  _createFormula (formula, katexDiv) {
    katex.render(formula, katexDiv, {
      throwOnError: false
    })
  }

  myMethod () {
    this.api.listeners.on(this.input, 'onkeyup', () => {
      console.log('Button clicked!')
    }, false)
  }

  validate (savedData) {
    if (!savedData.formula.trim()) {
      return false
    }

    return true
  }

  save (blockContent) {
    const input = blockContent.querySelector('input')

    return {
      formula: input.value
    }
  }
}
module.exports = Katex
// class Katex {
// static get toolbox () {
// return {
// title: 'Image',
// icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
// }
// }

// constructor ({ data }) {
// this.data = data
// this.wrapper = undefined
// }

// render () {
// this.wrapper = document.createElement('div')
// this.wrapper.classList.add('simple-image')
// if (this.data && this.data.url) {
// this._createImage(this.data.url, this.data.caption)
// return this.wrapper
// }

// const input = document.createElement('input')
// input.placeholder = 'Paste an image URL...'
// input.value = this.data && this.data.url ? this.data.url : ''

// input.addEventListener('paste', (event) => {
// this._createImage(event.clipboardData.getData('text'))
// })

// return this.wrapper
// }

// _createImage (url, captionText) {
// console.log(url)
// const image = document.createElement('img')
// const caption = document.createElement('div')

// image.src = url
// caption.contentEditable = true
// caption.value = captionText || ''

// this.wrapper.innerHTML = ''
// this.wrapper.appendChild(image)
// this.wrapper.appendChild(caption)
// }

// save (blockContent) {
// const caption = blockContent.querySelector('[contenteditable]')
// const img = blockContent.querySelector('img')

// return {
// url: img.src,
// caption: caption.innerHTML || ''
// }
// }

// validate (savedData) {
// if (!savedData.url.trim()) {
// return false
// }

// return true
// }
// }
