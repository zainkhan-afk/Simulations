let graphics;

let clouds_layer1;
let clouds_layer2;
let clouds_layer3;

let t;

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	graphics = new Graphics();
	
	clouds_layer1 = new Clouds(50, 0.1, 0.1, 1.0);
	clouds_layer2 = new Clouds(50, 0.1, 0.1, 1.0);
	clouds_layer3 = new Clouds(50, 0.1, 0.1, 1.0);

	graphics.AddClouds(clouds_layer1);
	graphics.AddClouds(clouds_layer2);
	graphics.AddClouds(clouds_layer3);
	
	t = 0;
}


function draw()
{
	background(0, 150, 200);
	graphics.Draw();
	t += 0.02;
}