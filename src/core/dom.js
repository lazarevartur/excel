class Dom {
  constructor(selector) {
    this.$nativeElement = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html
      return this
    }
    return this.$nativeElement.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback)
  }
  closest(selector) {
    return $(this.$nativeElement.closest(selector))
  }
  getCoordinate() {
    return this.$nativeElement.getBoundingClientRect()
  }
  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector)
  }
  css(style= {}) {
    Object
        .keys(style)
        .forEach((key) => {
          this.$nativeElement.style[key] = style[key]
        })
  }
  get data() {
    return this.$nativeElement.dataset
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeElement
    }
    this.$nativeElement.append(node)
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
