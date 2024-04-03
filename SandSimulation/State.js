class State
{
	constructor(rows, cols, w, h)
	{
		this.rows = rows;
		this.cols = cols;
		this.w = w;
		this.h = h;
		this.grid = [];
		this.EmptyGrid();
	}
	
	EmptyGrid()
	{
		for(let r = 0; r < this.rows; r++)
		{
			let row = [];
			for(let c = 0; c < this.cols; c++)
			{
				append(row, 0);
			}
			append(this.grid, row);
		}
	}
	
	SetValue(r, c)
	{
		this.grid[r][c] = 1;
	}
}