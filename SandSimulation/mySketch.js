let particles = [];
let graphics;
let physics;
let state;
let rows, cols;
let div;
let mouseButtonPressed;

function setup() 
{
	div = 10;
	mouseButtonPressed = false;
	rows = int(windowHeight / div);
	cols = int(windowWidth / div);
	
	graphics = new Graphics();
	physics = new Physics();
	state = new State(rows, cols, div, div);

	createCanvas(windowWidth, windowHeight);
	// noStroke();
	strokeWeight(0.1);
	// frameRate(30);
}


function mousePressed(event) {
	if(mouseButton === LEFT) 
	{
		mouseButtonPressed = true;
  }
}

function mouseReleased(event) {
	if(mouseButton === LEFT && mouseButtonPressed) 
	{
		mouseButtonPressed = false;
  }
}

function AddSand(){
	let r = int(mouseY / div);
	let c = int(mouseX / div);
	
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
				let R = r + i;
				let C = c + j;
			
				if (R >= 0 && R < rows && C > 0 && C < cols) {
					let p = new Particle(R, C);
					append(particles, p);
				}
		}	
	}
}

function draw() 
{
	background(0);
	
	if (mouseButtonPressed){
		AddSand();
	}
	
	graphics.DrawObjects(particles, div, div);
	state = physics.Step(particles, state);
}