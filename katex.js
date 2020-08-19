class SimpleImage {
  static get toolbox () {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    }
  }

  constructor ({ data, config, api }) {
    this.api = api
    this.katex = 'test'
    this.result = 'dsad'

    this.data = {
      katex: this.katex,
      result: this.result
    }
  }

  get CSS () {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      message: this.api.styles.input
    }
  }

  render () {
    const container = this._make('div', [this.CSS.baseClass])
    const title = this._make('input', [this.CSS.input], {
      contentEditable: true,
      innerHTML: this.data.title
    })
    this.message = this._make('input', [this.CSS.input], {
      contentEditable: true,
      innerHTML: this.data.message
    })
    console.log(this.message)
    this.message.addEventListener('keydown', function () {
      console.log('hola')
    })
    title.dataset.placeholder = this.titlePlaceholder
    this.message.dataset.placeholder = this.messagePlaceholder

    container.appendChild(title)
    container.appendChild(this.message)

    return container
  }

  myMethod () {
    this.api.listeners.on(this.message, 'change', () => {
      console.log('Button clicked!')
    }, true)
  }

  _make (tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName)

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames)
    } else if (classNames) {
      el.classList.add(classNames)
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName]
    }

    return el
  }

  save (blockContent) {
    return {
      url: blockContent.value
    }
  }
}
