const numParticles = 100;
const div = 25;
const mu = 0.9;
const deltaT = 2;
let sim;
let rows;
let cols;
let particles = [];

function mousePressed(event) {
	if(mouseButton === LEFT) 
	{
		let pos = createVector(mouseX - windowWidth/2, mouseY - windowHeight/2);
		let vel = createVector(0, 0);
		append(particles, new Particle(pos, vel));
  }
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	for (let i = 0; i<numParticles; i++){
		let pos = createVector(random(-windowWidth/2, windowWidth/2), random(-windowHeight/2, windowHeight/2));
		// let pos = createVector(0, 0);
		let vel = createVector(0, 0);
		append(particles, new Particle(pos, vel));
	}

	sim = new Simulation();
	rows = windowHeight / div;
	cols = windowWidth / div;
}

function draw() {
	background(0);
	translate(windowWidth/2, windowHeight/2);
	sim.Step(particles, rows, cols, div, mu, deltaT);
}