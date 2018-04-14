import DataObject from './DataObject/DataObject';
import FilterManager from './FilterManager/FilterManager';

export default class TableObject {
  constructor({ name = "", dataObject = {}, filterManager = {}, graphManager = {} }) {

    if (!name) {
      throw new console.error("Table must have a name");
    }

    let { filterList, taggedFilters, activatedFilters } = filterManager;

    this.name = name;
    this.dataObject = new DataObject(dataObject);
    this.filterManager = new FilterManager({ inputDataObject: this.dataObject, filterList, taggedFilters, activatedFilters });

  }

  // ------------------------------- GETTERS ------------------------ //

  /**
   * Returns the unfiltered data of the table.
   */
  getOriginalData() {
    return this.dataObject;
  }

  /**
   * Return the filtered data if there is at least one filter on.
   * 
   */

  getCurrentData() {
    if (this.filterManager.activatedFilters.length) {
      return this.filterManager.outputDataObject;
    }
    return this.dataObject;
  }

  getNumberofColumns() {
    return this.dataObject.getNumberofColumns();
  }

  getNumberofRows() {
    return this.dataObject.getNumberofRows();
  }

  getColumnIndex(columnName) {
    return this.dataObject.getColumnIndex(columnName);
  }

  // -------------------------- HELPERS -------------------------------- //
  sanitizeRowData(data) {
    const tableColumnCount = this.getNumberofColumns();
    const dataColumnCount = data.length;

    if (dataColumnCount === 0) {
      let offset = tableColumnCount;
      while(offset--) {
        data.push("EMPTY CELL");
      }
    } else if (tableColumnCount > dataColumnCount) {
      let offset = tableColumnCount - dataColumnCount;
      while (offset--) {
        data.push("EMPTY CELL");
      }
    } else if (dataColumnCount > tableColumnCount) {
      // Throw error
    }
    return data;
  }

  // -------------------------- CELL MODIFIERS ------------------------- //
  editCell(rowIndex, columnName, value) {
    // columnIndex = this.getColumnIndex(columnName);
    this.dataObject.editCell(rowIndex, columnName, value);
  }

  pushColumn(name, type) {
    this.dataObject.pushColumn(name, type);
    this.pushCellInAllRows("EMPTY");
  }

  addColumn(name, type, position) {
    this.dataObject.addColumn(name, type, position);
    this.addCellInAllRows(position, "EMPTY");
  }

  pushRow(data = []) {
    const sanitizedData = this.sanitizeRowData(data);
    this.dataObject.pushRow(sanitizedData);
  }

  addRow(data, position) {
    const sanitizedData = this.sanitizeRowData(data);
    this.dataObject.addRow(sanitizedData, position);
  }

  removeRow(position) {
    this.dataObject.removeRow(position);
  }

  addCell(rowPosition, cellPosition, cellValue) {
    this.dataObject.addCell(rowPosition, cellPosition, cellValue)
  }

  pushCell(rowPosition, cellValue) {
    this.dataObject.pushCell(rowPosition, cellValue);
  }

  addCellInAllRows(cellPosition, cellValue) {
    const rowCount = this.getNumberofRows;
    for (let i = 0; i < rowCount; i += 1) {
      this.addCell(i, cellPosition, cellValue);
    }
  }

  pushCellInAllRows(cellValue) {
    const rowCount = this.getNumberofRows();
    for(let i = 0; i < rowCount; i += 1) {
      this.pushCell(i, cellValue);
    }
  }

  createFilter(filterOptions) {
    this.filterManager.createFilter(filterOptions);
  }

  deleteFilter(filterListIndex) {
    return this.filterManager.deleteFilter(filterListIndex);
  }

  activateFilter({ filterListIndex, filterTag }) {
    return this.filterManager.on({ filterListIndex, filterTag });
  }

  deactivateFilter({ filterListIndex, filterTag }) {
    return this.filterManager.off({ filterListIndex, filterTag });
  }
}
