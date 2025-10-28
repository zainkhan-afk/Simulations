class Grid{
	constructor(numRows, numCols, size){
		this.numRows = numRows;
		this.numCols = numCols;
		this.grid = [];

		for (let r = 0; r<this.numRows; r++){
			let row = [];
			for (let c = 0; c<this.numCols; c++){
				append(row, new Cell(r, c, size));
			}
			append(this.grid, row);
		}
	}

	GetCellAt(r, c){
		return this.grid[r][c];
	}

	Step(dt){
		for (let r = 0; r<this.numRows; r++){
			for (let c = 0; c<this.numCols; c++){
				this.grid[r][c].Step(dt);
			}
		}
	}
	 
}