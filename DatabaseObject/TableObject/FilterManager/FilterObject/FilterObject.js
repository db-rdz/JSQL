export default class FilterObject {
    constructor({ targetColumn, filterFunction, parameters }) {
        this.targetColumn = targetColumn;
        this.filterFunction = filterFunction;
        this.parameters = parameters;

        this.inputDataObject = null;
        this.outputDataObject = null;
    }

    on(inputDataObject) {
        this.inputDataObject = inputDataObject;
        const columnIndex = inputDataObject.getColumnIndex(this.targetColumn);
        const rowArrayObject = inputDataObject.rowArray;
        
        for(let i = 0, length = rowArrayObject.length; i < length; i += 1) {
            if (this[this.filterFunction](columnIndex, rowArrayObject[i].rowData, this.parameters)) {
                // TODO: FINISH ON FUNCTION
            }
        }
    }

    off() {

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
