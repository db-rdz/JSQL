export default class DataAction {
    constructor({ dataObject= {}, actionType = '', targetColumn = '', groupedData = {} }) {
        this.dataObject = dataObject;
        this.actionType = actionType;
        this.targetColumn = targetColumn;
        this.groupedData = groupedData;
        
        this.processedData = this.executeAction();
    }

    getProcessedData() {
        return this.processedData;
    }

    executeAction() {
        switch(this.actionType) {
            case "addColumn": {
                return this.addColumn(this.targetColumn);
            }
            case 'countColumn': {
                return this.countColumn(this.targetColumn);
            }
        }
    }

    addColumn(targetColumn) {
        const columnIndex = this.dataObject.getColumnIndex(targetColumn);
        const keys = Object.keys(this.groupedData);
        const processedData = [];
        for(let i = 0, key, rows, sum, length = keys.length; i < length; i += 1) {
            sum = 0;
            key = keys[i];
            rows = this.groupedData[key];

            for (let j = 0, columnValue, parsedValue, lengthJ = rows.length; j < lengthJ; j += 1) {
                columnValue = rows[j][columnIndex];
                parsedValue = parseInt(columnValue);
                if (isNaN(parsedValue)) {
                    continue;
                }
                sum += parsedValue;
            }
            processedData.push(sum);
        }
        return processedData;
    }

    countColumn(targetColumn) {
        const columnIndex = this.dataObject.getColumnIndex(targetColumn);
        const keys = Object.keys(this.groupedData);
        const processedData = [];
        for(let i = 0, key, rows, sum, count, length = keys.length; i < length; i += 1) {
            sum = 0;
            key = keys[i];
            rows = this.groupedData[key];
            count = rows.length;

            processedData.push(count);
        }
        return processedData;
    }


}