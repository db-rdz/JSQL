import TableSearch from './TableSearch/TableSearch';
import FilterManager from '../FilterManager/FilterManager';

export default class TableSearcher {
  constructor({ inputDataObject }) {
    this.inputDataObject = inputDataObject;
    this.outputDataObject = this.inputDataObject;

    this.tableSearch = new TableSearch({ inputDataObject: this.inputDataObject });
    this.columnSearchManager = new FilterManager({ inputDataObject: this.tableSearch.outputDataObject });
    this.createColumnSearchObjects();
  }

  createColumnSearchObjects() {
    const columnList = this.inputDataObject.columnArray.columnList;
    const columns = Object.keys(columnList);
    for (let i = 0, length = columns.length; i < length; i += 1) {
      this.columnSearchManager.createFilter({ targetColumn: columns[i], filterFunction: 'contains', parameters: '', status: false, tag: columns[i] });
    }
  }

  doColumnSearch(columnTarget, searchString) {
    this.columnSearchManager.taggedFilters[columnTarget].parameters = searchString; // This has to change in the future to a "editFilter" function in the FilterManager.
    this.outputDataObject = this.columnSearchManager.on({ filterTag: columnTarget });
    return outputDataObject;
  }

  doTableSearch(searchString) {
    const output = this.tableSearch.search(searchString);
    this.outputDataObject = output;

    // Table search output goes to columnSearch and resets all columnSearch Filter.
    this.reApplyColumnSearches();
    return output;
  }

  setInputDataObject(inputDataObject) {
    // Set input data object.
    this.inputDataObject = inputDataObject;
    let output = this.tableSearch.setInputDataObject(this.inputDataObject);
    output = this.columnSearchManager.setInputDataObject(output);
    this.outputDataObject = output;
    return output;
  } 

  reApplyAllSearches() {
    // Re apply all searches if input data object changes
    this.tableSearch.inputDataObject = this.inputDataObject;
    const output = this.tableSearch.reApply();
    this.columnSearchManager.inputDataObject = output; // Column search manager should have a setDataObjectFunction
    this.columnSearchManager.reApplyAllFilters();
  }

  reApplyColumnSearches() {
    this.columnSearchManager.inputDataObject = this.tableSearch.outputDataObject;
    const output = this.columnSearchManager.reApplyAllFilters();
    this.outputDataObject = output;
    return output;
  }
}