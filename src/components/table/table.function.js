export function shouldResize(event) {
  return event.target.dataset.resize
}
export function isCell(event) {
  return event.target.dataset.id
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
function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index )
}
export function matrix(current, target) {
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return rows.reduce((acc, row) => {
    cols.forEach((col) => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
