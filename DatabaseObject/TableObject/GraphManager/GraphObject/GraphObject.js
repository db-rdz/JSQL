import DataGrouper from './DataGrouper/DataGrouper';
import FilterManager from "../../FilterManager/FilterManager";

// DataGrouper must contain a 
export default class GraphObject {
    constructor({ options = {}, dataObject, filterManager = {}, graphType = {}, dataGrouper = {} }) {

        this.options = options;
        this.graphType = graphType
        let { filterList = [], taggedFilters = {}, activatedFilters = [] } = filterManager;
        this.filterManager = new FilterManager({ inputDataObject: dataObject, filterList, taggedFilters, activatedFilters });
        this.graphDataObject = this.filterManager.reApplyAllFilters();
        
        let { groupingType, targetColumn, yAxis } = dataGrouper;
        this.dataGrouper = new DataGrouper({ dataObject: this.graphDataObject, groupingType, targetColumn, yAxis });
    }

    getConstructingArguments() {
        return {
            options: this.options,
            graphType: this.graphType,
            dataGrouper: {
                groupingType: this.dataGrouper.groupingType,
                targetColumn: this.dataGrouper.targetColumn,
                yAxis: {
                    dataAction: {
                        actionType: this.dataGrouper.yAxis.actionType,
                        targetColumn: this.dataGrouper.yAxis.targetColumn,
                    },
                    label: this.dataGrouper.yAxis.label,
                    color: this.dataGrouper.yAxis.color,
                }
            }
        }
    }

    getChart() {
        return {
            type: this.graphType,
            data: this.dataGrouper.getData(),
            options: this.options
        }
    }

}