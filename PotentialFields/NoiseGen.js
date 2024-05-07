class NoiseGen{
	constructor(div){
		this.div = div;		
		this.noiseScale = 0.1;
		this.noiseMaxVal = 255;

		this.Reset();

	}

	Reset(){
		this.noiseGrid = [];
		this.image = createImage(windowWidth, windowHeight);
	}

	GenerateNoise()
	{
		let numRows = ceil(windowHeight / this.div);
		let numCols = ceil(windowWidth / this.div);
		
		for (let r = 0; r < numRows; r++){
			this.noiseGrid[r] = []
			for(let c = 0; c < numCols; c++){
				this.noiseGrid[r][c] = map(noise(r*this.noiseScale, c*this.noiseScale), 0, 1, 0, 255);
			}
		}
	}

	UpdateNoise(newNoise)
	{
		this.noiseGrid = newNoise;
	}

	PopulateImage(){
		for(let x = 0; x < windowWidth; x++){
			let c = floor(x / this.div);
			for(let y = 0; y < windowHeight; y++){
				let r = floor(y / this.div);
				let val = this.noiseGrid[r][c];
				this.image.set(x, y, val);
			}
		}
		this.image.updatePixels();
	}
	GetImage(){
		return this.image;
	}
	GetNoiseGrid(){
		return this.noiseGrid;
	}


}