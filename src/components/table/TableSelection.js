export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.current = $el
    this.group.push($el)
    this.current.focus().add(TableSelection.className)
  }
  clear() {
    this.group.forEach((cell) => cell.remove(TableSelection.className))
    this.group = []
  }
  groupSelect($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach((cell) => cell.add(TableSelection.className))
  }
}
