export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root provide')
    }
    this.$root = $root
  }
  initDomListeners() {
    return this.$root
  }
  removeDomListeners() {
    return this.$root
  }
}
