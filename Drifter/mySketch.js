let graphics;
let car;
let dt = 0.1;
function setup() 
{
	createCanvas(windowWidth, windowHeight);
	graphics = new Graphics();
	car = new Car(createVector(windowWidth / 10, windowHeight / 2), 0);
}

function CheckInput()
{
	if (keyIsDown(87)){
		car.forwardDirectionForce = 10;
	}
	else if (keyIsDown(83)){
		car.forwardDirectionForce = -10;
	}
	else{
		car.forwardDirectionForce = 0;
	}
	
	if (keyIsDown(65)){
		car.steerAngle = -PI / 5;
	}
	else if (keyIsDown(68)){
		car.steerAngle = PI / 5;
	}
	else{
		car.steerAngle = 0;
	}
}

function draw()
{
	background(255);
	CheckInput();
	graphics.Draw(car);
	car.Step(dt);
	
}