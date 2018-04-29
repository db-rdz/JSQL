import ColumnObject from './ColumnObject/ColumnObject';

export default class ColumnArray {
  constructor({ columnList = [] }) {
    this.columnList = {};
    this.numberofColumns = 0;
    for (let i = 0, length = columnList.length, tempColumn; i < length; i += 1) {
      tempColumn = new ColumnObject(columnList[i]);
      this.columnList[tempColumn.name] = tempColumn;
      this.numberofColumns += 1
    }
  }
  
  getColumn(columnName) {
    return this.columnList[columnName];
  }

  getColumnByIndex(index) {
    const columnNames = Object.keys(this.columnList);
    for (let i = 0, length = columnNames.length, column; i < length; i += 1) {
      column = this.columnList[columnNames[i]];
      if (column.index === index) {
        return column;
      }
    }
    return false;
  }

  addColumn(name, type, index) {
    this.columnList[name] = new ColumnObject({ name, type, index });
    this.numberofColumns = this.getNumberofColumns();
  }

  pushColumn(name, type) {
    this.columnList[name] = new ColumnObject({ name, type, index: this.getNumberofColumns() });
    this.numberofColumns = this.getNumberofColumns();
  }

  removeColumn(name) {
    delete this.columnList[name];
  }

  getNumberofColumns() {
    return Object.keys(this.columnList).length;
  }
}
