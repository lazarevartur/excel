const CODE = {
  A: 65,
  Z: 90
}
function createRow(content, index) {
  return `
  <div class="row" data-type="resizebl"">
  <div class="row-info">${index ? index : ''}
  ${index ? '<div class="row-resize" data-resize="row">' +
    '<div></div></div>' : ''}
  </div>
  <div class="row-data">${content}</div>
</div>`
}
function toCell(row) {
  return (_, indexColl) => {
    return `
    <div
    class="cell"
    contenteditable="true"
    data-col='${indexColl}'
    data-id='${row}:${indexColl}'
    ></div>
    `
  }
}
function toCol(content, index) {
  return `<div class="column" data-type="resizebl" data-col="${index+1}">
          ${content}
          <div class="column-resize" data-resize="collum"><div></div>
          </div>
           
          </div>`
}
function toChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}

export function createTable(rowCount = 15) {
  const collumCount = CODE.Z - CODE.A + 1;
  const rows = []
  const cols = new Array(collumCount)
      .fill('')
      .map(toChar)
      .map(toCol)
      .join('')
  rows.push(createRow(cols))
  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(collumCount)
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(createRow(cells, row+1))
  }
  return rows.join('')
}

