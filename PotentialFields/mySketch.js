const cellSize = 10;
let noiseGenerator;
let graphics;

function setup() 
{
	createCanvas(windowWidth, windowHeight);

	noiseGenerator = new NoiseGen(cellSize);
	graphics = new Graphics(cellSize);
	noiseGenerator.PopulateImage();
}

function draw()
{
	background(0);
	let img = noiseGenerator.GetImage();
	let noiseGrid = noiseGenerator.GetNoiseGrid();

	image(img, 0, 0);
	graphics.Draw(noiseGrid);
}