import ColumnObject from './ColumnObject';

export default class ColumnArray {
  constructor({ columnList }) {
    this.columnList = {};
    for (let i = 0, length = columnList.length, tempColumn; i < length; i += 1) {
      tempColumn = new ColumnObject(columnList[i]);
      this.columnList[tempColumn.name] = tempColumn;
    }
  }
  
  getColumn(columnName) {
    return this.columnList[columnName];
  }

  addColumn(name, type, position) {
    this.columnList[name] = new ColumnObject({ name, type, position });
  }

  removeColumn(name) {
    delete this.columnList[name];
  }
}
