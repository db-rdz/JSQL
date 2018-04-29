export class ColumnSearch {
  constructor({ inputDataObject, columnIndex }) {
    this.inputDataObject = inputDataObject;
    this.columnIndex = columnIndex
    this.searchString = '';
  }

  search(searchString) {
    this.searchString = searchString;
    const FilteredDataSet = new DataObject({ });

    FilteredDataSet.columnArray = inputDataObject.columnArray;

    rowList = this.inputDataObject.rowArray.rowList;
    for(let i = 0, length = rowList.length, rowData; i < length; i += 1) {
      rowData = rowList[i].rowData;
      if (rowData[this.columnIndex] === searchString) {
        FilteredDataSet.pushRow(rowData);
      }
    }

    return FilteredDataSet;
  }
}