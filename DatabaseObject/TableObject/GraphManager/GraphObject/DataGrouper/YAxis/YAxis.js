import DataAction from './DataAction/DataAction'
export default class YAxis {
    // actionType, targetColumnList, groupedData
    constructor(groupedData, dataAction, label, color) {
        this.groupedData = groupedData;
        this.label = label;
        this.color = color;
        let { actionType, targetColumnList } = DataAction;
        this.dataAction = new DataAction({ groupedData: this.groupedData, actionType, targetColumnList })
    }

    getDataSet() {
        return  {
            label: this.label,
            backgroundColor: this.color,
            data: this.dataAction.getProcessedData()
        }
    }
}