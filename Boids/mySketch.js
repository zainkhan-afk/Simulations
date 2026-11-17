const numBoids = 500;
const protectedRadius = 20;
const visualRange = 50;
const borderMargin = 100;

const avoidFactor = 0.07;
const alignmentFactor = 0.1;
const centeringFactor = 0.005;
const turnFactor = 0.001;

const deltaT = 0.5;
const maxVel = 10;
const minVel = 6;

let graphics;
let logic;
let boids = [];

let isDark = true; // the site defaults to dark

window.addEventListener("message", (e) => {
  if (e.data && e.data.type === "theme") {
    isDark = e.data.theme === "dark";
  }
});


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
	background(isDark ? 0 : 200);
	graphics.Draw(boids);
	logic.Step(boids, deltaT);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}