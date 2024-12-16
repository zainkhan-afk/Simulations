class Clouds{
	constructor(cell_size, x_inc, y_inc, t_scaler){
		this.cell_size = cell_size;
		this.x_inc = x_inc;
		this.y_inc = y_inc;
		this.t_scaler = t_scaler;
		this.cloud_map = [];
		this.cols = windowWidth / this.cell_size;
		this.rows = windowHeight / this.cell_size;

		for (let r = 0; r < this.rows; r++)
		{
			this.cloud_map[r] = [];
			for (let c = 0; c < this.cols; c++)
			{
				this.cloud_map[r][c] = 0;
			}

		}
	}
	Update(t)
	{
		let y = 0;
		for (let r = 0; r < this.rows; r++)
		{
			let x = 0;
			for (let r = 0; r < this.rows; r++)
			{
				this.cloud_map[r][c] = noise(x, y - t);
				x += this.x_inc;
			}
		}
		y += this.y_inc;
	}
}