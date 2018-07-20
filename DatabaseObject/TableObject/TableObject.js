import DataObject from './DataObject/DataObject';
import FilterManager from './FilterManager/FilterManager';
import TableSearcher from './TableSearcher/TableSearcher';
import TablePaginator from './TablePaginator/TablePaginator';
import GraphManager from './GraphManager/GraphManager';

export default class TableObject {
  constructor({ name = "", rows = [], columns = [], filters = {}, graphManager = {}, options = { }, }) {
    this.options = {};

    // Table Object Options
    this.options.allowTableNameEditing = options.allowTableNameEditing !== undefined ? options.allowTableNameEditing : false,
    this.options.allowCellEditing = options.allowCellEditing !== undefined ? options.allowCellEditing : true;
    this.options.allowCellAdding = options.allowCellAdding !== undefined ? options.allowCellAdding : true;
    this.options.allowColumnAdding = options.allowColumnAdding !== undefined ? options.allowColumnAdding : true;
    this.options.allowColumnRemoving = options.allowColumnRemoving !== undefined ? options.allowColumnRemoving : true;
    this.options.allowRowAdding = options.allowRowAdding !== undefined ? options.allowRowAdding : true;
    this.options.allowRowRemoving = options.allowRowRemoving !== undefined ? options.allowRowRemoving : true;
    this.options.allowTableSearching = options.allowTableSearching !== undefined ? options.allowTableSearching : true;
    this.options.allowColumnSearching = options.allowColumnSearching !== undefined ? options.allowColumnSearching : true;
    this.options.allowFilterCreation = options.allowFilterCreation !== undefined ? options.allowFilterCreation : true;
    this.options.allowFilterDeletion = options.allowFilterCreation !== undefined ? options.allowFilterCreation : true;
    this.options.allowFiltering = options.allowFilterCreation !== undefined ? options.allowFilterCreation : true;

    if (!name) {
    }

    this.name = name;
    this.dataObject = new DataObject({ rows, columns });
    this.filterManager = new FilterManager({ inputDataObject: this.dataObject, filters });
    this.tableSearcher = new TableSearcher({ inputDataObject: this.filterManager.outputDataObject });
    this.tablePaginator = new TablePaginator({ inputDataObject: this.tableSearcher.outputDataObject, pageSize: 10, navigationBarSize: 10 }); 
    
    this.graphManager = new GraphManager({ dataObject: this.dataObject,  graphManager });

    this.processedDataObject = this.tablePaginator.getCurrentPageData();
  }

  // ------------------------------- TABLE OBJECT FUNCTIONS ---------------------- //
  editTableName(name) {
    if (this.options && this.options.allowTableNameEditing) {
      this.name = name;
    }
  }

  // ------------------------------- ROW FUNCTIONS ------------------------ //

  getNumberofRows() {
    return this.dataObject.getNumberofRows();
  }

  pushRow(data = []) {
    if (this.options && !this.options.allowRowAdding && !this.options.allowCellAdding) {
      return;
    }
    const sanitizedData = this.sanitizeRowData(data);
    this.dataObject.pushRow(sanitizedData);
    this.processInputDataObject();
  }

  addRow(data, position) {
    if (this.options && !this.options.allowRowAdding && !this.options.allowCellAdding) {
      return;
    }
    const sanitizedData = this.sanitizeRowData(data);
    this.dataObject.addRow(sanitizedData, position);
    this.processInputDataObject();
  }

  removeRow(position) {
    if (this.options && !this.options.allowRowRemoving) {
      return;
    }
    this.dataObject.removeRow(position);
    this.processInputDataObject();
  }

  removeMultipleRows(rowList) {
    if (this.options && !this.options.allowRowRemoving) {
      return;
    }
    this.dataObject.removeMultipleRows(rowList);
    this.processInputDataObject();
  }

  // ----------------------------- COLUMN FUNCTIONS ----------------------------- //

  getNumberofColumns() {
    return this.dataObject.getNumberofColumns();
  }

  getColumnIndex(columnName) {
    return this.dataObject.getColumnIndex(columnName);
  }

  pushColumn(name, type) {
    if (this.options && !this.options.allowColumnAdding && !this.options.allowCellAdding) {
      return;
    }
    this.dataObject.pushColumn(name, type);
    this.pushCellInAllRows("EMPTY");
    this.processInputDataObject();
  }

  addColumn(name, type, position) {
    if (this.options && !this.options.allowColumnAdding && !this.options.allowCellAdding) {
      return;
    }
    this.dataObject.addColumn(name, type, position);
    this.addCellInAllRows(position, "EMPTY");
    this.processInputDataObject();
  }


  removeColumn(columnName) {
    if (this.options && !this.options.allowColumnRemoving) {
      return;
    }

    const columnIndex = this.dataObject.getColumnIndex(columnName);
    this.dataObject.removeColumn(columnName);
    this.removeCellInAllRows(columnIndex);
    this.processInputDataObject();
  }

  removeMultipleColumns(columnNameList) {
    if (this.options && !this.options.allowColumnRemoving) {
      return;
    }

    // We need the indexes to delete the cells from the rows.
    const columnIndexList = this.dataObject.getMultipleColumnIndex(columnNameList);
    // We use the names to delete the columns.
    this.dataObject.removeMultipleColumns(columnNameList);
    this.dataObject.removeMultipleCellsInAllRows(columnIndexList);

    this.processInputDataObject();
  }

  // --------------------------------------- CELL FUNCITONS ---------------------------------------- //

  addCell(rowPosition, cellPosition, cellValue) {
    if (this.options && !this.options.allowCellAdding) {
      return;
    }
    this.dataObject.addCell(rowPosition, cellPosition, cellValue)
  }

  pushCell(rowPosition, cellValue) {
    if (this.options && !this.options.allowCellAdding) {
      return;
    }
    this.dataObject.pushCell(rowPosition, cellValue);
  }

  addCellInAllRows(cellPosition, cellValue) {
    if (this.options && !this.options.allowCellAdding) {
      return;
    }
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

  editCell(rowIndex, columnName, value) {
    // columnIndex = this.getColumnIndex(columnName);
    if (this.options && this.options.allowCellEditing) {
      this.dataObject.editCell(rowIndex, columnName, value);
    }
  }

  removeCell(rowPosition, cellPosition) {
    if (this.options && !this.options.allowColumnRemoving) {
      return;
    }
    this.dataObject.removeCell(rowPosition, cellPosition);
  }

  removeCellInAllRows(cellPosition) {
    if (this.options && !this.options.allowColumnRemoving) {
      return;
    }
    this.dataObject.removeCellInAllRows(cellPosition);
    // We don't process the dataobject here since this function is only supposed to be used
    // internally by the TableObject class.
  }

  // --------------------------------------- TABLE SEARCHER ACTIONS -------------------------------- //
  searchTable(searchString) {
    if (this.options && !this.options.allowTableSearching) {
      return;
    }
    const output =  this.tableSearcher.doTableSearch(searchString);
    this.processedDataObject = this.tablePaginator.setInputDataObject(output);
  }

  searchColumn(targetColumn, searchString) {
    if (this.options && !this.options.allowColumnSearching) {
      return;
    }
    const output =  this.tableSearcher.doColumnSearch(targetColumn, searchString);
    this.processedDataObject = this.tablePaginator.setInputDataObject(output);
  }

  // --------------------------------------- FILTER MANAGER ACTIONS -------------------------------- //

  createFilter(filterOptions) {
    if (this.options && !this.options.allowFilterCreation) {
      return;
    }
    this.filterManager.createFilter(filterOptions);
  }

  deleteFilter(filterListIndex) {
    if (this.options && !this.options.allowFilterDeletion) {
      return;
    }
    let output = this.filterManager.deleteFilter(filterListIndex);
    output = this.tableSearcher.setInputDataObject(output);
    output = this.tablePaginator.setInputDataObject(output);
    this.processedDataObject = output;
    return output;
  }

  activateFilter({ filterListIndex, filterTag }) {
    if (this.options && !this.options.allowFiltering) {
      return;
    }
    let output = this.filterManager.on({ filterListIndex, filterTag });
    output = this.tableSearcher.setInputDataObject(output);
    output = this.tablePaginator.setInputDataObject(output);
    this.processedDataObject = output;
    return output;
  }

  deactivateFilter({ filterListIndex, filterTag }) {
    if (this.options && !this.options.allowFiltering) {
      return;
    }
    let output = this.filterManager.off({ filterListIndex, filterTag });
    output = this.tableSearcher.setInputDataObject(output);
    output = this.tablePaginator.setInputDataObject(output);
    this.processedDataObject = output;
    return output;
  }

  // ----------------------------------------- SETTERS ----------------------------------------- //
  processInputDataObject(inputDataObject) {
    let output = this.filterManager.setInputDataObject(this.dataObject);
    output = this.tableSearcher.setInputDataObject(output);
    output = this.tablePaginator.setInputDataObject(output);

    this.processedDataObject = output;
  }

    // ----------------------------------- HELPERS -------------------------------- //


  getOriginalData() {
    return this.dataObject;
  }

  getCurrentData() {
    if (this.filterManager.activatedFilters.length) {
      return this.filterManager.outputDataObject;
    }
    return this.dataObject;
  }
  
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
}
