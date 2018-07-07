- JSQL Javascript Smart Table -

To use this plugin in npm run the following:

npm install jsql-smarttable

and then:

import { DatabaseObject, TableObject } from 'jsql-smarttable';

You can create a TableObject like this:

Const clientsTable  = new TableObject({
  name: 'Clients',
  dataObject: {
    columnList: [],
    rowList: [],
  },
  filterManager: {
    filterList: [filterObjects],
    taggedFilters: {key => filterObject},
    activatedFilters: [filterObjects],
  },
  options: {
    allowCellEditing: true,
    allowCellAdding: true,
    allowColumnAdding: true,
    allowColumnRemoving: true,
    allowRowAdding: true,
    allowRowRemoving: true,
    allowTableSearching: true,
    allowColumnSearching: true,
    allowFilterCreation: true,
    allowFilterDeletion: true,
    allowFiltering: true,
  }
});

