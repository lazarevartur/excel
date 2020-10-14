export function shouldResize(event) {
  return event.target.dataset.resize
}
export function deltaValue(cords, cordMouse, type) {
  let cord = ''
  if (type === 'row') {
    cord = cords.height + (cordMouse - cords.bottom)
  } else {
    cord = cords.width + (cordMouse - cords.right)
  }
  return cord
}
