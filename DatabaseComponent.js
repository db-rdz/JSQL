const DatabaseLevel = 0;
const TableLevel = 1;
// const ColumnArrayLevel = 2;
// const ColumnLevel = 3;
// const RowArrayLevel = 4;
const RowLevel = 5;
// const CellLevel = 6;

export default class DatabaseComponent {
  constructor() {
    this.addCell = (params, counter, { table, row, cellPosition, cellType, cellData }) => {
      const functionCounter = counter || 0;
      switch (functionCounter) {
        case DatabaseLevel: {
          if (table) {
            const newCounter = TableLevel;
            this.tableList[table].addCell(params, newCounter);
          }
          break;
        }
        case TableLevel: {
          if (row) {
            const newCounter = RowLevel;
            this.dataObject.rowArray.rowList[row].addCell(params, newCounter);
          }
          break;
        }
        case RowLevel: {
          if (row) {
            this.dataObject.rowArray.rowList[row].addCell(cellPosition, cellData, cellType);
          }
          break;
        }
        default: {
          console.log('invalid function call no counter provided');
        }
      }
    };
  }
}
