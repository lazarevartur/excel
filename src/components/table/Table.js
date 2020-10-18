import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {isCell, shouldResize, matrix} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown']
    });
    this.prepare()
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init();
    const $cell = this.$root.find(['[data-id="0:0"]'])
    this.selection.select($cell)
  }

  toHtml() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    } else if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const target = $cell.id(true)
        const current = this.selection.current.id(true)
        const ids = matrix(current, target)
        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.groupSelect($cells)
      } else {
        this.selection.select($cell)
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
      const current = this.selection.current.id(true)
      const id = nextCell(key, current)
      event.preventDefault()
      this.selection.select(this.$root.find(`[data-id="${id}"]`))
    }
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

