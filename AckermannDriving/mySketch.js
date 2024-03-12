let graphics;
let car;
function setup() 
{
	createCanvas(windowWidth, windowHeight);
	graphics = new Graphics();
	car = new Car(createVector(windowWidth / 2, windowHeight - 100), 0);
}

function draw()
{
	background(0);
	graphics.Draw(car);
}