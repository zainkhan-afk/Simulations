const numBoids = 500;
const protectedRadius = 20;
const visualRange = 50;
const borderMargin = 100;

const avoidFactor = 0.01;
const alignmentFactor = 0.05;
const centeringFactor = 0.001;
const turnFactor = 0.01;

const deltaT = 1;
const maxVel = 3;
const minVel = 1;

let graphics;
let logic;
let boids = [];
function setup() 
{
	createCanvas(windowWidth, windowHeight);


	for (let i = 0; i<numBoids; i++){
		let p = createVector(random(0, windowWidth), random(0, windowHeight));
		append(boids, new Boid(p, 0, minVel, maxVel));
	}

	graphics = new Graphics();
	logic = new Logic(protectedRadius, visualRange, borderMargin, avoidFactor, alignmentFactor, centeringFactor, turnFactor);
}

function draw()
{
	background(0);
	graphics.Draw(boids);
	logic.Step(boids, deltaT);
}