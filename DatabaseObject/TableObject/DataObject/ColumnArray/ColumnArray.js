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

  getColumnIndex(columnName) {
    return this.columnList[columnName].getColumnIndex();
  }

  getMultipleColumnIndex(columnNameList) {
    const results = [];
    for (let i = 0, length = columnNameList.length; i < length; i += 1) {
      results.push(this.getColumnIndex(columnNameList[i]));
    }
    return results;
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

  removeMultipleColumns(columnNameList) {
    while(columnNameList.length) {
      let columnName = columnNameList.shift();
      delete this.columnList[columnName];
    }
  }

  getNumberofColumns() {
    return Object.keys(this.columnList).length;
  }
}
