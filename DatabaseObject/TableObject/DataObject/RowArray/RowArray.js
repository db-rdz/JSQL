import RowObject from './RowObject/RowObject';

export default class RowArray {
  constructor({ rowList = [] }) {
    this.rowList = [];
    for (let i = 0, length = rowList.length; i < length; i += 1) {
      this.rowList.push(new RowObject({ data: rowList[i] }));
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
  }

  addRow(data, position) {
    this.rowList.splice(position, 0, new RowObject(data));
  }

  addCell(rowPosition, cellPosition, cellValue) {
    this.rowList[rowPosition].insertCell(cellPosition, cellValue, cellType);
  }

  pushCell(rowPosition, cellValue) {
    this.rowList[rowPosition].pushCell(cellValue);
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
