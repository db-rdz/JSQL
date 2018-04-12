var expect = require('chai').expect;

import DatabaseComponent from '../DatabaseObject/DatabaseObject';
import DatabaseObject from '../DatabaseObject/DatabaseObject';

// let ExpectedResult = {
//     name: 'TestDataBase',
//     tableMap: {
//         clients: {
//             name: "Clients",
//             dataObject: {
//                 rowArray: [{}]
//             },
//         }
//     }
// }

describe('#JSQL QL', function() {
    // Positive Test ...............

    it('It should create a new Database Object with a name', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
    });

    it('It should add a new table to a DatabaseObject', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        result.addTable("Clients");
    });

    it('It should add a column to a TableObject', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        result.addTable("Clients");
        result.getTable("Clients").pushColumn("Name", "Text");
        result.getTable('Clients').dataObject.getNumberofColumns();
        result.getTable("Clients").dataObject.getColumnIndex("Name");
    });

    it('It should add a row to a TableObject that already has a column', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        result.addTable("Clients");
        result.getTable("Clients").pushColumn("Name", "Text");
        result.getTable("Clients").pushRow();
    });

    it('It should edit a cell', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        result.addTable("Clients");
        result.getTable("Clients").pushColumn("Name", "String");
        result.getTable("Clients").pushRow();
        result.getTable("Clients").editCell(0, "Name", "D");
    });


    it('It should add a row to a TableObject that already has a column', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        result.addTable("Clients");
        result.getTable("Clients").pushColumn("Name", "String");
        result.getTable("Clients").pushRow();
        result.getTable("Clients").editCell(0, "Name", "D");
    });
    
    it('It should add a row to a TableObject that already has a column', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        let table = result.addTable("Clients");
        table.pushColumn("Name", "String");
        table.pushColumn("Last Name", "String");
        table.pushRow();
        table.editCell(0, "Name", "Da");

        expect(table.dataObject.rowArray.rowList[0].rowData).to.have.lengthOf(2);
    });

    it('It should make shure that the filter dataobject is the same as the table dataobject', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        let table = result.addTable("Clients");
        table.pushColumn("Name", "String");
        table.pushColumn("Last Name", "String");
        table.pushRow();
        table.editCell(0, "Name", "Da");
        expect(table.filterManager.inputDataObject.rowArray.rowList[0].rowData).to.have.lengthOf(2);
    });
});

describe('#FilterManager', function() {
    it('It should create a filter', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        let table = result.addTable("Clients");
        table.pushColumn("Name", "String");
        table.pushColumn("Last Name", "String");
        table.pushRow();
        table.editCell(0, "Name", "Da");

        table.createFilter({ targetColumn: "Name", filterFunction: "equalTo", parameters: "Da" });
    });

    it('It should activate a filter', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        let table = result.addTable("Clients");
        table.pushColumn("Name", "String");
        table.pushColumn("Last Name", "String");
        table.pushRow();
        table.pushRow();
        table.editCell(0, "Name", "Da");

        table.createFilter({ targetColumn: "Name", filterFunction: "equalTo", parameters: "Da", tag: "test1" });
        table.activateFilter({ filterTag: "test1" });
    });


    it('It should activate a filter', function() {
        var result = new DatabaseObject({ name: "TestDatabase" });
        let table = result.addTable("Clients");
        table.pushColumn("Name", "String");
        table.pushColumn("Last Name", "String");
        table.pushRow();
        table.pushRow();
        table.editCell(0, "Name", "Da");
        table.editCell(1, "Name", "Da");

        table.createFilter({ targetColumn: "Name", filterFunction: "equalTo", parameters: "Da", tag: "test1" });
        const output = table.activateFilter({ filterTag: "test1" });
        expect(output.rowArray.rowList).to.have.lengthOf(2);
    });

});
