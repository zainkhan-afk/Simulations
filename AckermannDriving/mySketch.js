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
		car.forwardDirectionVel = -2;
	}
	else if (keyIsDown(83)){
		car.forwardDirectionVel = 2;
	}
	else{
		car.forwardDirectionVel = 0;
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
	CheckInput();
	car.Step();
	
	background(0);
	graphics.Draw(car);
}