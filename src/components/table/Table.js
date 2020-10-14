import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.function';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHtml() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    }
  }
}
