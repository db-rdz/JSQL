import CellObject from "./CellObject";

export default class RowObject {
  constructor({ data }) {
    this.cellList = [];
    for (let i = 0, length = data.length; i < length; i += 1){
      this.cellList.push(new CellObject(data[i]));
    }
  }

  addCell(position, data, cellType) {
    const cell = new CellObject(data, cellType);
    this.data.splice(position, 0, cell);
  }

  removeCell(position) {
    this.data.splice(position, 1);
  }

  swapCell(cellOnePosition, cellTwoPosition) {
    const tmpCell = this.data[cellOnePosition];
    this.data[cellOnePosition] = this.data[cellTwoPosition];
    this.data[cellTwoPosition] = tmpCell;
  }
}
