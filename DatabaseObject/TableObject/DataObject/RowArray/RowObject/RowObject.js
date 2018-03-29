import CellObject from "./CellObject";

export default class RowObject {
  constructor({ rowData }) {
    this.rowData = rowData;
  }

  addCell(position, data, cellType) {
    this.rowData.splice(position, 0, data);
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
