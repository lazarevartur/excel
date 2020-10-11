const CODE = {
  A: 65,
  Z: 90
}
function createRow(content, index = '') {
  return `
  <div class="row">
  <div class="row-info">${index}</div>
  <div class="row-data">${content}</div>
</div>`
}
function toCell(content= '') {
  return `<div class="cell" contenteditable="true">${content}</div>`
}
function toCol(content) {
  return `<div class="column">${content}</div>`
}
function toChar(index) {
  return String.fromCharCode(CODE.A + index)
}

export function createTable(rowCount = 15) {
  const columCoutn = CODE.Z - CODE.A + 1;
  const rows = []
  const cols = new Array(columCoutn)
      .fill('')
      .map((_, index) => toChar(index))
      .map((col) => toCol(col))
      .join('')
  rows.push(createRow(cols))
  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(columCoutn)
        .fill('')
        .map(() => toCell())
        .join('')
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}

