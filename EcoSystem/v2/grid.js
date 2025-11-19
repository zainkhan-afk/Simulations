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

    IsGrassCellStochastic(r, c, prob){
        if (this.gridCells[r][c].type == "grass" && this.gridCells[r][c].foodMatter > 0)
        {
            if (random() < prob){
                return this.gridCells[r][c];
            }
        }
        return null;
    }

    FindClosestGrassCell(row, col){
        let explored = [];
        let grassCell = this.IsGrassCellStochastic(row, col, 0.7);
        if (grassCell) { return grassCell; }
        append(explored, [row, col])

        let mostGrassyCell = null;

        let rowStart = row;
        let rowEnd = row;
        let colStart = col;
        let colEnd = col;
        // for (let i = 0; i < 2; i++){
        rowStart = max(row - 1, 0);
        rowEnd = min(row + 1, this.numRows - 1);

        colStart = max(col - 1, 0);
        colEnd = min(col + 1, this.numCols - 1);
        
        for (let r = rowStart; r <= rowEnd; r++){
            for (let c = colStart; c <= colEnd; c++){
                if (explored.includes([r, c])){
                    continue;
                }
                let grassCell = this.IsGrassCellStochastic(r, c, 1.0);
                if (grassCell) { 
                    if (!mostGrassyCell) {
                        mostGrassyCell = grassCell;
                    }else{
                        if (grassCell.foodMatter > mostGrassyCell.foodMatter){
                            mostGrassyCell = grassCell;
                        }
                    }
                }
                append(explored, [r, c])
            }
        }
        
        if (mostGrassyCell) {
            if (random() < 0.9) {
                return mostGrassyCell;
            }
        }
        let randomIndex = floor(random(explored.length));
        return this.gridCells[explored[randomIndex][0]][explored[randomIndex][1]]

    }

    FindClosestEnemyCell(r, c){
    }

}