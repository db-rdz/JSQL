import GraphObject from './GraphObject/GraphObject'
export default class GraphManager {
    constructor({ dataObject, graphList = [] }) {
        this.dataObject = dataObject;
        this.graphList = this.loadGraphList(graphList); // Create graph objects in for the passed graph list.
    }

    loadGraphList(graphList) {
        const results = [];
        for (let i = 0, graph, length = graphList.length; i < length; i += 1) {
            graph = graphList[i]

            let {options, filterManager, graphType, dataGrouper} =  graph;
            reuslts.push(new GraphObject({ dataObject: this.dataObject, options, filterManager, graphType, dataGrouper }));
        }
        return results;
    }
}
