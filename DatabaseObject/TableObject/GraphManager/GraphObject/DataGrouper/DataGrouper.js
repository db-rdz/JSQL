import XAxis from './XAxis/XAxis';
import YAxis from './YAxis/YAxis';

export default class DataGrouper {
    constructor({ dataObject = {}, groupingType = '', targetColumn = '', yAxis = {} }) {
        this.dataObject = dataObject;
        this.groupingType = groupingType;
        this.targetColumn = targetColumn;

        this.groupedData = this.groupData(targetColumn, groupingType);
        this.xAxis = new XAxis({ xAxisData: Object.keys(this.groupedData) });
        const { dataAction, label, color } = yAxis;
        this.yAxis = new YAxis({ dataObject: this.dataObject, groupedData: this.groupedData, dataAction, label, color });
    }

    getData() {
        return {
            labels: this.xAxis.getAxisData(),
            datasets: [this.yAxis.getDataSet()],
        }
    }


    groupData(targetColumn, groupingType = "Value") {
        switch (groupingType) {
            case "Value": {
                const groupedByValue = this.groupByValue(targetColumn);
                return groupedByValue;
            }
        }
    }

    groupByValue(targetColumn) {
        const groupedData = {};
        const targetColumnIndex = this.dataObject.getColumnIndex(targetColumn);
        const rowArray = this.dataObject.rowArray.rowList;
        let rowData;
        let dataKey;
        for (let i = 0, length = rowArray.length, rowObject; rowObject = rowArray[i], i < length; i += 1) {
            rowData = rowObject.rowData;
            dataKey = rowData[targetColumnIndex];
            if (groupedData[dataKey]) {
                groupedData[dataKey].push(rowData);
            } else {
                groupedData[dataKey] = [rowData];
            }
        }
        return groupedData;
    }
}