import DataObject from './DataObject/DataObject';
import FilterManager from './FilterManager/FilterManager';
import TableSearcher from './TableSearcher/TableSearcher';
import TablePaginator from './TablePaginator/TablePaginator';
import GraphManager from './GraphManager/GraphManager';

export default class TableObject {
  constructor({ name = "", dataObject = {}, filterManager = {}, graphManager = {} }) {

    if (!name) {
      throw new console.error("Table must have a name");
    }

    let { filterList, taggedFilters, activatedFilters } = filterManager;

    this.name = name;
    this.dataObject = new DataObject(dataObject);
    this.filterManager = new FilterManager({ inputDataObject: this.dataObject, filterList, taggedFilters, activatedFilters });
    this.tableSearcher = new TableSearcher({ inputDataObject: this.filterManager.outputDataObject });
    this.tablePaginator = new TablePaginator({ inputDataObject: this.tableSearcher.outputDataObject, pageSize: 10, navigationBarSize: 10 }); 
    
    this.graphManager = new GraphManager({ dataObject: this.dataObject,  graphManager });

    this.processedDataObject = this.tablePaginator.getCurrentPageData();
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

  // --------------------------------------- ADDING FUNCITONS ---------------------------------------- //

  pushColumn(name, type) {
    this.dataObject.pushColumn(name, type);
    this.pushCellInAllRows("EMPTY");
    this.processInputDataObject();
  }

  addColumn(name, type, position) {
    this.dataObject.addColumn(name, type, position);
    this.addCellInAllRows(position, "EMPTY");
    this.processInputDataObject();
  }

  pushRow(data = []) {
    const sanitizedData = this.sanitizeRowData(data);
    this.dataObject.pushRow(sanitizedData);
    this.processInputDataObject();
  }

  addRow(data, position) {
    const sanitizedData = this.sanitizeRowData(data);
    this.dataObject.addRow(sanitizedData, position);
    this.processInputDataObject();
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

  // --------------------------------------- REMOVING FUNCTIONS ------------------------------------------------- //

  removeRow(position) {
    this.dataObject.removeRow(position);
    this.processInputDataObject();
  }



  // --------------------------------------- TABLE SEARCHER ACTIONS -------------------------------- //
  searchTable(searchString) {
    const output =  this.tableSearcher.doTableSearch(searchString);
    this.tablePaginator.setInputDataObject(output);
  }

  searchColumn() {
    const output =  this.tableSearcher.doColumnSearch(searchString);
    this.tablePaginator.setInputDataObject(output);
  }

  // --------------------------------------- FILTER MANAGER ACTIONS -------------------------------- //

  createFilter(filterOptions) {
    this.filterManager.createFilter(filterOptions);
  }

  deleteFilter(filterListIndex) {
    const output = this.filterManager.deleteFilter(filterListIndex);
    this.tableSearcher.setInputDataObject(output);
    return output;
  }

  activateFilter({ filterListIndex, filterTag }) {
    const output = this.filterManager.on({ filterListIndex, filterTag });
    this.tableSearcher.setInputDataObject(output);
    return output;
  }

  deactivateFilter({ filterListIndex, filterTag }) {
    const output = this.filterManager.off({ filterListIndex, filterTag });
    this.tableSearcher.setInputDataObject(output);
    return output;
  }

  // ----------------------------------------- SETTERS ----------------------------------------- //
  processInputDataObject(inputDataObject) {
    let output = this.filterManager.setInputDataObject(this.dataObject);
    output = this.tableSearcher.setInputDataObject(output);
    output = this.tablePaginator.setInputDataObject(output);

    this.processedDataObject = output;
  }
}
