import DataObject from './DataObject';

export default class TableObject {
  constructor({ name, dataObject }) {
    this.name = name;
    this.dataObject = new DataObject(dataObject);
  }
}
