export default class DataAction {
    constructor({ actionType, targetColumnList, groupedData }) {
        this.actionType = actionType;
        this.targetColumnList = targetColumnList;
        this.groupedData = groupedData;
        
        this.processedData = this.executeAction();
    }

    getProcessedData() {
        return this.processedData;
    }

    executeAction() {
        switch(this.actionType) {
            case "addColumn": {
                this.addColumn(this.targetColumnList[0]);
            }
        }
    }

    addColumn(targetColumn) {
        const columnIndex = this.groupedData.dataObject.getColumnIndex(targetColumn);
        const keys = Object.keys(this.groupedData);
        const processedData = [];
        for(let i = 0, key, rows, sum, length = keys.length; i < length; i += 1) {
            sum = 0;
            key = keys[i];
            rows = this.groupedData[key];

            for (let j = 0, columnValue, parsedValue, lengthJ = rows.length; j < lengthJ; j += 1) {
                columnValue = rows[columnIndex];
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


}