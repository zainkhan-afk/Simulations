class Logic{
	constructor(cellSize){
		this.cellSize = cellSize;

		this.maxC = 0;
		this.maxR = 0;
		this.valDiff = 0;
	}

	CalculateMaxNeighbourInfo(noiseGrid, currR, currC)
	{
		let maxVal = noiseGrid[currR][currC];
		this.maxR = currR;
		this.maxC = currC;

		let numRows = ceil(windowHeight / this.cellSize);
		let numCols = ceil(windowWidth / this.cellSize);

		for (let r = currR - 1; r <= currR + 1; r++){
			if (r < 0 || r >= numRows) continue;
			for (let c = currC - 1; c <= currC + 1; c++){
				if (c < 0 || c >= numCols) continue;
				if (noiseGrid[r][c] > maxVal)
				{
					maxVal = noiseGrid[r][c];
					this.maxR = r;
					this.maxC = c;
				}
			}
		}

		this.valDiff = abs(maxVal - noiseGrid[currR][currC]);
		if (this.valDiff < 1) this.valDiff = 1;
		if (this.valDiff > this.cellSize / 2) this.valDiff = this.cellSize / 2;
	}

	IsValidPos(p, particles)
	{
		for (let i = 0; i<particles.length; i++)
		{
			if (p != particles[i])
			{
				if (p.IsPointOverlap(particles[i])) return false;
			}
		}
		return true;
	}

	Step(noiseGrid, particles){
		for (let i = 0; i<particles.length; i++)
		{
			let p = particles[i];
			let r = floor(p.pos.y / this.cellSize);
			let c = floor(p.pos.x / this.cellSize);

			this.CalculateMaxNeighbourInfo(noiseGrid, r, c);

			let goalX = this.maxC * this.cellSize + this.cellSize * 0.5;
			let goalY = this.maxR * this.cellSize + this.cellSize * 0.5;

			let vel = createVector(goalX - p.pos.x, goalY - p.pos.y);
			
			vel.setMag(this.valDiff);

			p.vel = vel;

			let oldPos = p.pos.copy();

			p.pos.add(p.vel);

			if (!this.IsValidPos(p, particles)) p.pos = oldPos.copy();
		}
	}
}