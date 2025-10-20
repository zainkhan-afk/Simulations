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
    
    PixelCoordinatesToCell(pos){
        let col = int(pos.x / this.cellSize);
        let row = int(pos.y / this.cellSize);

        if (col < 0 || col > this.numCols) { return null; }
        if (row < 0 || row > this.numRows) { return null; }

        return this.GetCellAt(row, col);
    }

}