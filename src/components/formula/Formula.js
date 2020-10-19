import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }
  toHtml() {
    return ` <div class="info">fx
            </div>
            <div 
            class="input" 
            data-type="input" 
            contenteditable 
            spellcheck="false"
            ></div>`
  }
  init() {
    super.init();
    this.$formula = this.$root.find(`[data-type="input"]`)
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text())
    })
    this.$on('table:input', (text) => {
      this.$formula.text(text)
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]
    const {key} = event
    if (keys.includes(key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
