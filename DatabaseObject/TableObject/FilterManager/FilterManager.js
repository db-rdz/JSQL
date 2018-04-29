import FilterObject from './FilterObject/FilterObject';

export default class FilterManager {
    constructor({ inputDataObject, filterList = [], taggedFilters = [], activatedFilters = [] }) {
        this.activatedFilters = this.importFilters(activatedFilters);
        this.taggedFilters = this.importTaggedFilters(taggedFilters);
        this.filterList = this.importFilters(filterList);

        this.inputDataObject = inputDataObject;
        this.outputDataObject = inputDataObject;
    }

    importFilters(filterArray) {
        let filters =  [];
        for(let i = 0, length = filterArray.length; i < length; i += 1) {
            filters.push(new FilterObject(filterArray[i]));
        }
        return filters;
    }

    importTaggedFilters(taggedFilters) {
        let keys = Object.keys(taggedFilters);
        let taggedFilterMap = {};
        for (let i = 0, length = keys.lenqth; i < length; i += 1) {
            taggedFilterMap[keys[i]] = new FilterObject(taggedFilters[keys[i]]);
        }
        return taggedFilterMap;
    }

    createFilter(filterOptions) { // targetColumn, filterFunction, parameters, status, tag
        try {
            const filter = new FilterObject(filterOptions);
        
            if (filter.status) {
                const activatedFilterIndex = this.activatedFilters.length;
                filter.activatedFilterIndex = activatedFilterIndex;
                this.activatedFilters.push(filter);
            }

            if (filter.tag) {
                this.taggedFilters[filter.tag] = filter;
            }

            const filterListIndex = this.filterList.length;
            filter.filterListIndex = filterListIndex;
            this.filterList.push(filter);
            return filter;
        }
        catch (e) {
            return false;
        }
    }

    deleteFilter({ filterListIndex, filterTag }) {
        const filter = this.filterList[filterListIndex] || this.taggedFilters[filterTag];

        if (filter) {

            if (filter.status) {
                // Take some action if the filter is activated.
                this.outputDataObject = this.off({ filterListIndex, filterTag });
            }

            if (filter.tag) {
                delete this.taggedFilters[filter.tag];
            }
            this.filterList.splice(filter.filterListIndex, 1);
        }
        
        return this.outputDataObject;
    }

    on({ filterListIndex, filterTag }) {
        const filter = this.filterList[filterListIndex] || this.taggedFilters[filterTag];
        if (filter) {
            this.outputDataObject = filter.on(this.outputDataObject || this.inputDataObject);
            if (filter.status) {
                filter.activatedFilterIndex = this.activatedFilters.length;
                this.activatedFilters.push(filter);
            }
        }
        return this.outputDataObject;
    }

    off({ filterListIndex, filterTag }) {
        const filter = this.filterList[filterListIndex] || this.taggedFilters[filterTag];
        if (filter) {
            if (filter.status) {
                const activatedFilterIndex = filter.activatedFilterIndex;
                this.outputDataObject = filter.off();
                this.activatedFilters.splice(activatedFilterIndex, 1);
                const endIndex = this.activatedFilters.length - 1;
                this.reApplyFiltersInRange(activatedFilterIndex, endIndex);
            }
        }
        return this.outputDataObject;
    }

    reApplyAllFilters() {
        const start = 0;
        const end = this.activatedFilters.length - 1;
        this.outputDataObject = this.inputDataObject;
        return this.reApplyFiltersInRange(start, end);
    }

    // Private use only! IT will not set the outputDataObject to anything
    // and because of that it can only be used by functions that do reset the 
    // outputDataObject to something... So far there is only 3 functions that do
    // the reApplyAllFilters and the deleteFilter or off functions
    reApplyFiltersInRange(start, end) {
        const filter = this.activatedFilters[start];
        if (start <= end && filter) {
            this.outputDataObject = filter.on(this.outputDataObject);
            this.reApplyFiltersInRange(start + 1, end);
        } else {
            return this.outputDataObject;
        }

    }

    setInputDataObject(inputDataObject) {
        this.inputDataObject = inputDataObject;
        return this.reApplyAllFilters();
    }
}
