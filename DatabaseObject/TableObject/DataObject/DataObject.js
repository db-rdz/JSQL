import ColumnArray from './ColumnArray';
import RowArray from './RowArray';

export default class DataObject {
  constructor({ columnList, rowList }) {
    this.columnArray = new ColumnArray({ columnList });
    this.rowArray = new RowArray({ rowList });
  }

  getColumnIndex(columnName) {
    return this.columnArray.getColumn(columnName).index;
  }

  addColumn(name, type, position) {
    this.columnArray.addColumn(name, type, position);
  }

  addRow(data, position) {
    this.rowArray.addRow(data, position);
  }

  removeRow(position) {
    this.rowArray.deleteRow(position);
  }
}
