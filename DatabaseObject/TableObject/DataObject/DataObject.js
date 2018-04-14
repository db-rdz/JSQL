import ColumnArray from './ColumnArray/ColumnArray';
import RowArray from './RowArray/RowArray';

export default class DataObject {
  constructor({ columnList = [], rowList = [] }) {
    this.columnArray = new ColumnArray({ columnList });
    this.rowArray = new RowArray({ rowList });
  }

  // -------------------------- GETTERS ---------------------------- //

  getColumnIndex(columnName) {
    return this.columnArray.getColumn(columnName).getColumnIndex();
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
    this.rowArray.deleteRow(position);
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
