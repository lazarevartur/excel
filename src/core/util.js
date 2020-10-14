export function capitalaze(string) {
  if (typeof string !== 'string') {
    return ''
  }
  string = string.charAt(0).toUpperCase() + string.slice(1)
  return string
}
export function cordMouse(event, cordinate) {
  let mouseCord = ''
  switch (cordinate.toLowerCase()) {
    case 'y': mouseCord = event.pageY
      break;
    case 'x': mouseCord = event.pageX
      break;
  }
  return mouseCord
}

