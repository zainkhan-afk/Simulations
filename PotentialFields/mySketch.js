const cellSize = 30;
const numSamples = 100;
let noiseGenerator;
let graphics;
let logic;
let particles = [];
let repulsionPoints = [];
let noiseGrid = [];

function setup() 
{
	createCanvas(windowWidth, windowHeight);

	noiseGenerator = new NoiseGen(cellSize);
	graphics = new Graphics(cellSize);
	logic = new Logic(cellSize);

	noiseGenerator.GenerateNoise();
	noiseGenerator.PopulateImage();
	noiseGrid = noiseGenerator.GetNoiseGrid();

	frameRate(60);
}



function mouseReleased(event) {
	if(!keyIsDown(CONTROL) && mouseButton == LEFT) 
	{
		append(particles, new Particle(createVector(mouseX, mouseY)));
  	}

  	else if(keyIsDown(CONTROL) && mouseButton == LEFT) 
	{
		let mouseC = floor(mouseX / cellSize);
		let mouseR = floor(mouseY / cellSize);

		let numRows = ceil(windowHeight / cellSize);
		let numCols = ceil(windowWidth / cellSize);

		for (let r = mouseR - 1; r <= mouseR + 1; r++){
			if (r < 0 || r >= numRows) continue;
			for (let c = mouseC - 1; c <= mouseC + 1; c++){
				if (c < 0 || c >= numCols) continue;
				
				if (c == mouseC && r == mouseR) noiseGrid[r][c] += (-1 * 255);
				else if ((c == mouseC && r != mouseR) || c != mouseC && r == mouseR) noiseGrid[r][c] += (-0.5*255);
				else noiseGrid[r][c] += (-0.25*255);

			}
		}
		noiseGenerator.UpdateNoise(noiseGrid);
		noiseGenerator.PopulateImage();
  	}
}


function keyTyped() 
{
	if (key == 'c')
	{		
		particles = [];
	}

	else if (key == 's')
	{
		for (let i = 0; i<numSamples; i++)
		{
			let x = map(random(), 0, 1, 0, windowWidth);
			let y = map(random(), 0, 1, 0, windowHeight);
			
			let newP = new Particle(createVector(x, y));
			
			let validP = true;
			
			for (let j = 0; j<particles.length; j++) {
				if (newP.IsPointOverlap(particles[j]))
				{
					validP = false;
					break;
				} 
			}
			
			if (validP){
				append(particles, newP);
			}
		}
	}
}

function draw()
{
	background(0);
	let img = noiseGenerator.GetImage();

	image(img, 0, 0);
	graphics.Draw(noiseGrid, particles);
	logic.Step(noiseGrid, particles);
}