import DataObject from '../../DataObject/DataObject';

export default class TableSearch {
  constructor({ inputDataObject }) {
    this.inputDataObject = inputDataObject
    this.outputDataObject = this.inputDataObject;
    this.searchString = '';
  }

  search(searchString) {
    this.searchString = searchString;
    const FilteredDataSet = new DataObject({ });
    FilteredDataSet.columnArray = this.inputDataObject.columnArray;

    const rowList = this.inputDataObject.rowArray.rowList;
    for(let i = 0, length = rowList.length, rowData, cellMatched; i < length; i += 1) {
      rowData = rowList[i].rowData;
      cellMatched = false;
      for (let j = 0, lengthJ = rowData.length; j < lengthJ; j += 1) {
        if (rowData[j].includes(searchString)) {
          cellMatched = true;
          break;
        }
      }
      if (cellMatched) {
        FilteredDataSet.pushRow(rowData);
      }
    }
    this.outputDataObject = this.FilteredDataSet;
    return FilteredDataSet;
  }

  setInputDataObject(inputDataObject) {
    this.inputDataObject = inputDataObject;
    return this.reApply();
  }

  reApply() {
    return this.search(this.searchString);
  }
}