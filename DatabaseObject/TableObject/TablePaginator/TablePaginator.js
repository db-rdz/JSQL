import DataObject from '../DataObject/DataObject'; 

export default class TablePaginator {
  constructor({ inputDataObject, pageSize, navigationBarSize }) {
    this.inputDataObject = inputDataObject;
    this.outputDataObject = this.inputDataObject;
    this.pageSize = pageSize;
    this.navigationBarSize = navigationBarSize;
    
    this.currentPage = 0;
    this.numberofPages = this.calculateNumberofPages();
    this.currentNavigationPage = 0;
    this.numberofNavigationPages = this.calcualteNumberofNavigationPages();

    this.currentNavigationBarValues = this.calculateCurrentNavigationBarValues();
  }


  calculateNumberofPages() {
    const numberofRows = this.inputDataObject.getNumberofRows();
    return Math.ceil(numberofRows/this.pageSize);
  }

  calcualteNumberofNavigationPages() {
    return Math.ceil(this.numberofPages/this.navigationBarSize);
  }

  nextNavigationBar() {
    this.currentNavigationPage += 1;
    this.currentNavigationBarValues = this.calculateCurrentNavigationBarValues();
  }

  calculateCurrentNavigationBarValues() {
    const startIndex = this.navigationBarSize * this.currentNavigationPage;
    const endIndex = startIndex + this.navigationBarSize;
    const barValues = [];
    for (let i = startIndex; i < endIndex; i += 1) {
      barValues.push(i);
    }
    return barValues;
  }

  nextPage() {
    this.currentPage += 1;
    return this.getCurrentPageData();
  }

  getCurrentPageData() {
    const currentPageData = new DataObject({ });
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const rowList = this.inputDataObject.rowArray.rowList;
    for (let i = startIndex; i < endIndex && i < rowList.length; i += 1) {
      currentPageData.pushRow(rowList[i].rowData);
    }

    currentPageData.columnArray = this.inputDataObject.columnArray;
    this.outputDataObject = currentPageData;
    return currentPageData;
  }

  setInputDataObject(inputDataObject) {
    this.inputDataObject = inputDataObject;
    return this.getCurrentPageData();
  }
}