# JSQL Javascript Smart Table

JSQL is a pure javascript table manager. It is designed to be used to create advanced graphical table components with front end frameworks like react and vue.
To see some of its graphical components see the JSQL-Vue project: https://github.com/db-rdz/JSQL-Vue

## Installation

Install the jsql-smarttable package through npm:

```
npm install jsql-smarttable
```

and then import the package to your project:

```
import { TableObject } from 'jsql-smarttable';
```

## Table Constructor

The constructor of the TableObject class takes as a parameter a single Object. You can pass the desired table information or options within this object.
The following example shows all the keys that can be included in the constructor object:

```
Const clientsTable  = new TableObject({
  name: 'Clients',
  columns: [],
  rows: [],
  filters: [],
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
  },
});
```

## API

API docs coming soon...

## Examples

Examples coming soon...

## Roadmap
V1
- [x] Adding
  - [x] Adding Columns
  - [x] Adding Rows
  - [x] Adding Filters // Have some issues
- [x] Deleting
  - [x] Deleting Columns
  - [x] Deleting Rows
  - [x] Deleting Filters
- [ ] Editing
  - [x] Edit Table Name
  - [x] Edit Cells // Have some issues
  - [ ] Edit Columns
  - [x] Edit Filters
- [x] Filtering // Has some issues
- [x] Search
  - [x] Search Table
  - [x] Search Columns
- [ ] Sortable Columns
- [ ] Data Validation // Need to include custom Regex validation.

## NOTE

This project is at a beta state and is not ready for production.

## License

MIT License
