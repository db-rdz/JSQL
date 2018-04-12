import FilterObject from './FilterObject/FilterObject';

export default class FilterManager {
    constructor({ inputDataObject, filterList = [], taggedFilters = {}, activatedFilters = [] }) {
        this.activatedFilters = activatedFilters;
        this.taggedFilters = taggedFilters;
        this.filterList = filterList;

        this.inputDataObject = inputDataObject;
        this.outputDataObject = null;
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
            this.filterList.push(filter);
            return filter;
        }
        catch (e) {
            return false;
        }
    }

    deleteFilter(filterListIndex) {
        let filter;
        if (filterListIndex) {
            filter = this.filterList[filterListIndex];
            if (filter) {

                if (filter.status) {
                    // Take some action if the filter is activated.
                    this.outputDataObject = filter.off();
                    const endIndex = this.activatedFilters.length - 1;
                    this.reApplyFiltersInRange(filters.activatedFilterIndex, endIndex);
                }

                isActivatedFilterRemoved = filter.activatedFilterIndex ? this.activatedFilter.splice(filter.activatedFilterIndex, 1) : null;
                isFilterTaggedFilterRemoved = filter.tag ? delete this.taggedFilters[filter.tag] : null;
                this.filterList.splice(filterListIndex, 1);
            }
        }
        return this.outputDataObject;
    }

    on({ filterListIndex, filterTag }) {
        const filter = this.filterList[filterListIndex] || this.taggedFilters[filterTag];
        if (filter) {
            this.outputDataObject = filter.on(this.outputDataObject || this.inputDataObject);
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
        this.outputDataObject;
    }

    reApplyAllFilters() {
        const start = 0;
        const end = this.activatedFilters.length - 1;
        return this.reApplyFiltersInRange(start, end);
    }

    reApplyFiltersInRange(start, end) {
        const filter = this.activatedFilters[start];
        if (start < end) {
            this.outputDataObject = filter.on(this.outputDataObject);
            this.reApplyFiltersInRange(start + 1, end);
        } else {
            return this.outputDataObject;
        }

    }
}
