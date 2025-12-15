let graphics;
let car;
function setup() 
{
	createCanvas(windowWidth, windowHeight);
	graphics = new Graphics();
	car = new Car(createVector(windowWidth / 2, windowHeight - 100), PI / 2);
}

function CheckInput()
{
	if (keyIsDown(87)){
		car.forwardDirectionForce = -6;
	}
	else if (keyIsDown(83)){
		car.forwardDirectionForce = 6;
	}
	else{
		car.forwardDirectionForce = 0;
	}
	
	if (keyIsDown(65)){
		car.steerAngle = PI / 5;
	}
	else if (keyIsDown(68)){
		car.steerAngle = -PI / 5;
	}
	else{
		car.steerAngle = 0;
	}
}

function draw()
{
	background(255);
	CheckInput();
	car.Step();
	
	graphics.Draw(car);
}