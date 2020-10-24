import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {isCell, shouldResize, matrix} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/action'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
    this.prepare()
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init();
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    const $cell = this.$root.find(['[data-id="0:0"]'])
    this.selection.select($cell)
    this.$emit('table:input', $cell.text())
  }

  toHtml() {
    return createTable(20)
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  async resizeTable(event) {
    try {
      const data = await tableResize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const target = $cell.id(true)
        const current = this.selection.current.id(true)
        const ids = matrix(current, target)
        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.groupSelect($cells)
      } else {
        this.selectCell($cell)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]
    const {key} = event
    if (keys.includes(key)) {
      event.preventDefault()
      const current = this.selection.current.id(true)
      const id = nextCell(key, current)
      const $next = this.$root.find(`[data-id="${id}"]`)
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }
}
function nextCell(key, current) {
  let {row, col} = current
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowLeft': col = col - 1 < MIN_VALUE ? MIN_VALUE : col-1
      break;
    case 'ArrowRight': col++
      break;
    case 'ArrowUp': row = row - 1 < MIN_VALUE? MIN_VALUE : row - 1
      break;
    case 'ArrowDown': row++
      break;
  }
  return `${row}:${col}`
}

