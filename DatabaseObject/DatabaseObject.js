import TableObject from './TableObject/TableObject';
import DatabaseComponent from '~/BaseClasses/DataBaseComponent';

export default class DatabaseObject extends DatabaseComponent {
  constructor({ name = "", tableList = [] }) {
    if (!name) {
      throw new console.error("Database must have a name.");
    }

    super();
    this.name = name;
    this.tableMap = {};

    for (let i = 0, length = tableList.length, tmpTable; i < length; i += 1) {
      tmpTable = new TableObject(tableList[i]);
      this.tableMap[tmpTable.name] = tmpTable;
    }
  }

  addTable(name) {
    this.tableMap[name] = new TableObject({ name });
    return this.tableMap[name];
  }

  getTable(name) {
    return this.tableMap[name];
  }
}
