import RowObject from './RowObject';

export default class RowArray {
  constructor({ rowList }) {
    this.rowList = [];
    for (let i = 0, length = rowList.length; i < length; i += 1) {
      this.rowList.push(new RowObject({ data: rowList[i] }));
    }
  }

  addRow(data, position) {
    this.rowList.splice(position, 0, new RowObject(data));
  }

  addCell(rowPosition, cellPosition, cellValue, cellType) {
    this.rowList[rowPosition].insertCell(cellPosition, cellValue, cellType);
  }

  removeRow(position) {
    this.rowList.splice(position, 1);
  }

  swapRow(rowOnePosition, rowTwoPosition) {
    const tmpRow = this.rowList[rowOnePosition];
    this.rowList[rowOnePosition] = this.rowList[rowTwoPosition];
    this.rowList[rowTwoPosition] = tmpRow;
  }


}
