import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeCollum, resizeRow} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHtml() {
    return createTable(33)
  }

  onMousedown(event) {
    const resize = event.target.dataset.resize
    if (resize === 'collum') {
      resizeCollum(event)
    } else if (resize === 'row-info') {
      resizeRow(event)
    }
  }
}
