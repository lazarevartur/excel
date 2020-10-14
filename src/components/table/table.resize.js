import {$} from '@core/dom';

export function resizeCollum(event) {
  const $parent = $(event.target).closest('[data-type="resizebl"]')
  const $resibleFlag = event.target
  const $line = $resibleFlag.firstChild.nextSibling
  const className = 'line-height'
  const cords = $parent.getCoordinate()
  const cols = document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
  let value = '';
  $resibleFlag.style.opacity = 1
  $line.classList.add(className)
  document.onmousemove = (e) => {
    const delta = e.pageX - cords.right
    value = cords.width + delta
    $resibleFlag.style.left = value + 'px'
  }
  document.onmouseup = (e) => {
    cols.forEach((e) => {
      e.style.width = value + 'px'
    })
    $resibleFlag.removeAttribute('style')
    $line.classList.remove(className)
    document.onmousemove = null
  }
}
export function resizeRow(event) {
  const $parent = $(event.target).closest('[data-type="resizebl"]')
  const $resibleFlag = event.target
  const $line = $resibleFlag.firstChild
  const className = 'line-width'
  const cords = $parent.getCoordinate()
  let value = '';
  $resibleFlag.style.opacity = 1
  $line.classList.add(className)
  document.onmousemove = (e) => {
    const delta = e.pageY - cords.bottom
    value = cords.height + delta
    $resibleFlag.style.top = value + 'px'
  }
  document.onmouseup = (event) => {
    $parent.$nativeElement.style.height = value + 'px'
    $resibleFlag.removeAttribute('style')
    $line.classList.remove(className)
    document.onmousemove = null
  }
}

