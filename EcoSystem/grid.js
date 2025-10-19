class Grid{
    constructor(cellSize, numRows, numCols){
        this.cellSize = cellSize;
        this.numRows = numRows;
        this.numCols = numCols;
        this.gridCells = [];
        
        for (let r = 0; r < this.numRows; r++){
            let row = []
            for (let c = 0; c < this.numCols; c++){
                append(row, new Cell(r, c, this.cellSize));
            }
            append(this.gridCells, row);
        }

    }
    GetCellAt(row, col){
        return this.gridCells[row][col];
    }
    
    PixelCoordinatesToGridCoordinates(pos){
    }

}