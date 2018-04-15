import XAxis from './XAxis/XAxis';
import YAxis from './YAxis/YAxis';

export default class DataGrouper {
    constructor({ dataObject, groupingType, targetColumn, yAxisList }) {
        this.dataObject = dataObject;
        this.groupingType = groupingType;
        this.targetColumn = targetColumn;

        this.groupedData = this.groupData(targetColumn, groupingType);
        this.xAxis = new XAxis({ xAxisData: Object.keys(this.groupedData) });
        this.yAxisList = this.createYAxisList(yAxisList);
    }

    getData() {
        const datasets = [];

        for (let i = 0 , length = this.yAxisList.length; i < length; i += 1) {
            datasets.push(this.yAxisList[i].getDataSet());
        }

        return {
            labels: this.xAxis.getAxisData(),
            datasets
        }
    }

    createYAxisList(yAxisList) {
        const result = [];
        for (let i = 0 , length = yAxisList.length; i <length; i += 1) {
            let { dataAction, label, color } = yAxisList[i];
            result.push( new YAxis({ dataObject: this.dataObject, groupedData: this.groupedData, dataAction, label, color }));
        }
        return result;
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