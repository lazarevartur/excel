import {$} from '@core/dom';
import {cordMouse} from '@core/util';
import {deltaValue} from '@/components/table/table.function';

export function tableResize($root, event) {
  const $resizer = $(event.target)
  const type = $resizer.data.resize
  const $parent = $resizer.closest('[data-type="resizebl"]')
  const cords = $parent.getCoordinate()
  const $line = $resizer.$nativeElement.firstChild
  const sideProp = type === 'row' ? 'top' : 'left'
  let className; let value; let cordinate
  $resizer.css({opacity: 1})
  if (type === 'row') {
    className = 'line-width'
    cordinate = 'y'
  } else if (type === 'collum') {
    className = 'line-height'
    cordinate = 'x'
  }
  $line.classList.add(className)
  document.onmousemove = (e) => {
    value = deltaValue(cords, cordMouse(e, cordinate), type) + 'px'
    $resizer.css({[sideProp]: value})
  }
  document.onmouseup = (event) => {
    if (type === 'row') {
      $parent.css({height: value})
    } else {
      $root.findAll(
          `[data-col="${$parent.data.col}"]`
      ).forEach((e) => {
        $(e).css({width: value})
      })
    }
    $resizer.$nativeElement.removeAttribute('style')
    $line.classList.remove(className)
    document.onmousemove = null
    document.onmouseup = null
  }
}

