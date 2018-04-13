import DataObject from "../../DataObject/DataObject";

export default class FilterObject {
    constructor({ targetColumn, filterFunction, parameters, status, tag }) {
        this.tag = tag || null;                     // Gives the FilterObject a tag to access it easier.
        this.status = status || false;              // Tells if the filter is on or off.
        this.targetColumn = targetColumn;           // Specifies a column for the filter to look through. if no column is specified all columns will be looked through.
        this.filterFunction = filterFunction;       // Specified the filter function to use to filter data.
        this.parameters = parameters;               // This object holds the parameters the filter needs.

        this.inputDataObject = null;                // The original set of data that the filter is applied to.
        this.outputDataObject = null;               // The output when the filter is turned on.
    }

    // -------------------------------- STATUS FUNCTIONS ------------------------------- //
    /** ---------------- ON FUNCTION ------------------- /
     * 
     * @param {*} inputDataObject this is the data that is going to be filtered. See
     * the DataObject class for more info on the structure of this object.
     * 
     * @returns inputDataObject a new DataObject.
     * 
     */
    on(inputDataObject) {
        this.inputDataObject = inputDataObject;
        let columnIndex = this.targetColumn ? inputDataObject.getColumnIndex(this.targetColumn) : false;
        const rowSet = inputDataObject.rowArray.rowList;

        const FilteredDataSet = new DataObject({ });
        
        

        FilteredDataSet.columnArray = inputDataObject.columnArray;
        
        for(let rowIndex = 0, length = rowSet.length, rowObject, rowData; rowIndex < length; rowIndex += 1) {
            rowObject = rowSet[rowIndex];
            rowData = rowObject.rowData;
            switch (columnIndex) {
                case (!isNaN(columnIndex)): { // If columnIndex is specified then just filter on that column.
                    if (this[this.filterFunction](columnIndex, rowData, this.parameters)) {
                        FilteredDataSet.pushRow(rowData);
                    }
                    break;
                }
                default: { // If no columnIndex is specified look on all columns.
                    for (let columnNumber = 0, row_length = rowData.length; columnNumber < row_length; columnNumber += 1) {
                        if (this[this.filterFunction](columnNumber, rowData, this.parameters)) {
                            FilteredDataSet.pushRow(rowSet[rowIndex].rowData);
                            break; // If filter already added row to the filtered rows then break off the loop.
                        }
                    }
                }
            }
        }
        this.status = true;
        return FilteredDataSet;
    }


    /** ---------------- OFF FUNCTION ------------------- /
     * 
     * 
     * @returns the original DataObject passed.
     * 
     */
    off() {
        const returnValue = this.inputDataObject;
        this.inputDataObject = null;
        this.outputDataObject = null;
        this.status = false;

        return returnValue;
    }

     // ------------------------ NUMBER FILTERS ----------------------- //

    lessThan(targetColumnIndex, rowData, parameters) {
        return parseInt(rowData[targetColumnIndex]) < parseInt(parameters);
    }

    greaterThan(targetColumnIndex, rowData, parameters) {
        return parseInt(rowData[targetColumnIndex]) > parseInt(parameters);
    }

    inBetween(targetColumnIndex, rowData, parameters) {
        return parseInt(rowData[targetColumnIndex]) > parseInt(parameters[0]) &&
            parseInt(rowData[targetColumnIndex]) < parseInt(parameters[1]);
    }


    // ------------------------ DATE FILTERS ----------------------- //

    beforeDate(targetColumnIndex, rowData, parameters) {
        return Date.parse(rowData[targetColumnIndex]) < Date.parse(parameters);
    }

    afterDate(targetColumnIndex, rowData, parameters) {
        return Date.parse(rowData[targetColumnIndex]) > Date.parse(parameters);
    }

    inBetweenDates(targetColumnIndex, rowData, parameters) {
        return Date.parse(rowData[targetColumnIndex]) > Date.parse(parameters[0]) &&
            Date.parse(rowData[targetColumnIndex]) < Date.parse(parameters[1]);
    }


     // ------------------------ STRING FILTERS ----------------------- //

    startsWith() {

    }

    contains() {

    }

    endsWith() {

    }

    // ------------------------ UNIVERSAL FILTERS ----------------------- //

    equalTo(targetColumnIndex, rowData, parameters) {
        return rowData[targetColumnIndex] === parameters;
    }


}
