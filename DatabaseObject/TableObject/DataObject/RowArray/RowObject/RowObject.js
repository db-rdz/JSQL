export default class RowObject {
  constructor({ data = [] }) {
    this.rowData = data;
  }

  editCell(columnIndex, value) {
    this.rowData[columnIndex] = value;
  }

  addCell(position, data = "") {
    this.rowData.splice(position, 0, data);
  }

  pushCell(data = "") {
    const newLastIndex = this.rowData.length;
    this.rowData[newLastIndex] = data;
  }

  removeCell(position) {
    this.rowData.splice(position, 1);
  }

  swapCell(cellOnePosition, cellTwoPosition) {
    const tmpCell = this.rowData[cellOnePosition];
    this.rowData[cellOnePosition] = this.data[cellTwoPosition];
    this.rowData[cellTwoPosition] = tmpCell;
  }
}
