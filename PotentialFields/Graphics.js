class Graphics{
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

	DrawGrid(noiseGrid){
		let numRows = ceil(windowHeight / this.cellSize) + 1;
		let numCols = ceil(windowWidth / this.cellSize) + 1;
		
		fill(0);
		for (let r = 0; r < numRows - 1; r++){
			let y = r * this.cellSize + this.cellSize * 0.5;
			for(let c = 0; c < numCols - 1; c++){
				let x = c * this.cellSize + this.cellSize * 0.5;
				
				this.CalculateMaxNeighbourInfo(noiseGrid, r, c);

				
				let goalX = this.maxC * this.cellSize + this.cellSize * 0.5;
				let goalY = this.maxR * this.cellSize + this.cellSize * 0.5;

				let dirVec = createVector(goalX - x, goalY - y);
				dirVec.setMag(this.valDiff);

				stroke(255, 0, 0);
				line(x, y, x + dirVec.x, y + dirVec.y);
				stroke(0, 255, 0);
				circle(x + dirVec.x, y + dirVec.y, 0.8);
			}
		}
	}

	DrawParticles(particles){
		stroke(0);
		fill(0, 0, 255);
		for (let i = 0; i<particles.length; i++)
		{
			let p = particles[i];
			circle(p.pos.x, p.pos.y, p.radius);	
		}

	}

	Draw(noiseGrid, particles){
		this.DrawGrid(noiseGrid);
		this.DrawParticles(particles);
	}

}