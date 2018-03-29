import TableObject from './TableObject';
import DatabaseComponent from './DataBaseComponent';

export default class DatabaseObject extends DatabaseComponent {
  constructor({ name, tableList }) {
    super();
    this.name = name;
    this.tableList = {};

    for (let i = 0, length = tableList.length, tmpTable; i < length; i += 1) {
      tmpTable = new TableObject(tableList[i]);
      this.tableList[tmpTable.name] = tmpTable;
    }
  }

  addTable(name) {
    this.tableList[name] = new TableObject({ name });
  }
}
