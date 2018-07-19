import ColumnArray from './ColumnArray/ColumnArray';
import RowArray from './RowArray/RowArray';

export default class DataObject {
  constructor({ columns = [], rows = [] }) {
    this.columnArray = new ColumnArray({ columns });
    this.rowArray = new RowArray({ rows });
  }

  // -------------------------- GETTERS ---------------------------- //

  getColumnIndex(columnName) {
    return this.columnArray.getColumnIndex(columnName);
  }

  getMultipleColumnIndex(columnNameList) {
    return this.columnArray.getMultipleColumnIndex(columnNameList);
  }

  getNumberofColumns() {
    return this.columnArray.getNumberofColumns();
  }

  getNumberofRows() {
    return this.rowArray.getNumberofRows();
  }

  getColumnValuesByName(columnName) {
    const columnIndex = this.getColumnIndex(columnName);
    return this.rowArray.getColumnValues(columnIndex);
  }

  // -------------------------- MODIFIERS -------------------------- //

  addColumn(name, type, position) {
    this.columnArray.addColumn(name, type, position);
  }

  pushColumn(name, type) {
    this.columnArray.pushColumn(name, type);
  }

  addRow(data, position) {
    this.rowArray.addRow(data, position);
  }

  pushRow(data) {
    this.rowArray.pushRow(data);
  }

  removeRow(position) {
    this.rowArray.removeRow(position);
  }

  removeMultipleRows(rowList) {
    this.rowArray.removeMultipleRows(rowList);
  }

  removeCell(rowPosition, cellPosition) {
    this.rowArray.removeCell(rowPosition, cellPosition);
  }

  removeCellInAllRows(cellPosition) {
    this.rowArray.removeCellInAllRows(cellPosition);
  }

  removeMultipleCellsInAllRows(cellPositionList) {
    this.rowArray.removeMultipleCellsInAllRows(cellPositionList);
  }

  removeColumn(columnName) {
    this.columnArray.removeRow(columnName);
  }

  removeMultipleColumns(columnNameList) {
    this.columnArray.removeMultipleColumns(columnNameList);
  }

  editCell(rowIndex, columnName, value) {
    const column = this.columnArray.getColumn(columnName);
    if (column.validate(value)) {
      this.rowArray.editCell(rowIndex, column.index, value);
    }
    else {
      // throw (new Error("editCell: Non-valid value entered."));
    }
  }

  addCell(rowPosition, cellPosition, cellValue) {
    this.rowArray.addCell(rowPosition, cellPosition, cellValue);
  }

  pushCell(rowPosition, cellPosition) {
    this.rowArray.pushCell(rowPosition, cellPosition);
  }
}
