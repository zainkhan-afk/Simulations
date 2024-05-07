class Graphics{
	constructor(cellSize){
		this.cellSize = cellSize;
	}

	GetMaxNeighborRow(noiseGrid, currR, currC){
		let maxVal = noiseGrid[currR][currC];
		let maxR = currR;
		let maxC = currC;

		for (let r = currR - 1; r < currR + 1; r++){
			for (let c = currC - 1; c < currC + 1; c++){
				if (noiseGrid[r][c] > maxVal)
				{
					maxVal = noiseGrid[r][c];
					maxR = r;
					maxC = c;
				}
			}
		}


		return maxR;
	}

	GetMaxNeighborCol(noiseGrid, currR, currC){
		let maxVal = noiseGrid[currR][currC];
		let maxR = currR;
		let maxC = currC;

		for (let r = currR - 1; r < currR + 1; r++){
			for (let c = currC - 1; c < currC + 1; c++){
				if (noiseGrid[r][c] > maxVal)
				{
					maxVal = noiseGrid[r][c];
					maxR = r;
					maxC = c;
				}
			}
		}


		return maxC;
	}

	DrawGrid(noiseGrid){
		let numRows = int(windowHeight / this.cellSize) + 1;
		let numCols = int(windowWidth / this.cellSize) + 1;
		
		console.log(numRows, numCols);
		stroke(255, 0, 0);
		fill(255, 0, 0);
		for (let r = 1; r < numRows - 1; r++){
			let y = r * this.cellSize;
			for(let c = 1; c < numCols - 1; c++){
				let x = c * this.cellSize;
				let maxR = this.GetMaxNeighborRow(noiseGrid, r, c);
				let maxC = this.GetMaxNeighborCol(noiseGrid, r, c);


				if (maxR == r && maxC == c)
				{
					circle(x, y, 5);
				}
				else{
					let goalX = maxC * this.cellSize;
					let goalY = maxR * this.cellSize;

					line(x, y, goalX, goalY);
				}
			}
		}
	}

	Draw(noiseGrid){
		this.DrawGrid(noiseGrid);
	}

}