import RowObject from './RowObject/RowObject';

export default class RowArray {
  constructor({ rowList = [] }) {
    this.rowList = [];
    this.numberofRows = 0;
    this.number
    for (let i = 0, length = rowList.length; i < length; i += 1) {
      this.rowList.push(new RowObject({ data: rowList[i] }));
      numberofRows += 1
    }
  }

  // ---------------------- GETTERS ------------------------ //
  getNumberofRows() {
    return this.rowList.length;
  }

  getColumnValues(columnIndex) {
    const columnValues = [];
    let row;
    for (let i = 0, length = this.rowList.length; i < length; i += 1) {
      row = this.rowList[i];
      columnValues.push(row.getColumnValue(columnIndex));
    }
    return columnValues;
  }

  // ---------------------- MODIFIERS ---------------------- //

  editCell(rowIndex, columnIndex, value) {
    this.rowList[rowIndex].editCell(columnIndex, value);
  }

  pushRow(data) {
    this.rowList.push(new RowObject({ data }));
    this.numberofRows = this.getNumberofRows();
  }

  addRow(data, position) {
    this.rowList.splice(position, 0, new RowObject(data));
    this.numberofRows = this.getNumberofRows();
  }

  addCell(rowPosition, cellPosition, cellValue) {
    this.rowList[rowPosition].insertCell(cellPosition, cellValue, cellType);
  }

  pushCell(rowPosition, cellValue) {
    this.rowList[rowPosition].pushCell(cellValue);
  }

  removeCellInAllRows(cellPosition) {
    for (let i = 0, length = this.rowList.length; i < length; i += 1) {
      this.rowList[i].splice(cellPosition, 1);
    }
  }

  removeMultipleCellsInAllRows(cellPositionList) {
    // Sort array in descending order so that indexes don't get messed up when removing.
    cellPositionList.sort((a, b) => b - a);
    while (cellPositionList.length) {
      this.rowList[i].splice(cellPositionList.shift(), 1);
    }
  }

  removeCell(rowPosition, cellPosition) {
    if (this.rowList.length > rowPosition) {
      this.rowList[rowPosition].splice(cellPosition, 1);
    }
  }

  removeRow(position) {
    this.rowList.splice(position, 1);
    this.numberofRows = this.getNumberofRows();
  }

  removeMultipleRows(rowList) {
    rowList.sort((a, b) => b - a); // Sort in descending order.
    for (let i = 0, length = rowList.length; i < length; i += 1) {
      this.removeRow(rowList[i]);
    }
  }

  swapRow(rowOnePosition, rowTwoPosition) {
    const tmpRow = this.rowList[rowOnePosition];
    this.rowList[rowOnePosition] = this.rowList[rowTwoPosition];
    this.rowList[rowTwoPosition] = tmpRow;
  }


}
