const numPlanets = 50;
const G = 0.1;
let planets = [];
let graphics;
let physics;
let buttonPressStarted;
let buttonPressp1;
let buttonPressp2;
let newPlanetMass;
let drawTail;

function LoadStableOrbit1()
{
	let pos1 = createVector(windowWidth/2 - 200, windowHeight/2);
	let pos2 = createVector(windowWidth/2 + 200, windowHeight/2);
	let vel1 = createVector(0, 0);
	let vel2 = createVector(0, 0);
	let acc1 = createVector(0, 0);
	let acc2 = createVector(0, 0);
	let mass1 = 5000;
	let mass2 = 5000;
	
	let radius1 = 5 + mass1/100;
	let radius2 = 5 + mass2/100;
	
	let p12 = p5.Vector.sub(pos1, pos2);

	let v = sqrt((G * mass1) / p12.mag() / 2);
	
	vel1.y = v;
	vel2.y = -v;

	planets[0] = new Planet(pos1, vel1, acc1, radius1, mass1);
	planets[1] = new Planet(pos2, vel2, acc2, radius2, mass2);
	
	
	let pos3 = createVector(windowWidth/2 - 300, windowHeight/2);
	let pos4 = createVector(windowWidth/2 + 300, windowHeight/2);
	let vel3 = createVector(0, 0);
	let vel4 = createVector(0, 0);
	let acc3 = createVector(0, 0);
	let acc4 = createVector(0, 0);
	let mass3 = 1;
	let mass4 = 1;
	
	let radius3 = 5 + mass3/100;
	let radius4 = 5 + mass4/100;
	
	let p13 = p5.Vector.sub(pos1, pos3);

	v = 70*sqrt((G * mass3) / p13.mag() / 2);
	
	vel3.y = -v;
	vel4.y = v;

	planets[2] = new Planet(pos3, vel3, acc3, radius3, mass3);
	planets[3] = new Planet(pos4, vel4, acc4, radius4, mass4);
	
}

function LoadStableOrbit2()
{
	let pos1 = createVector(windowWidth/2, windowHeight/2);
	let pos2 = createVector(windowWidth/3, windowHeight/2);
	let pos3 = createVector(windowWidth/3 - 50, windowHeight/2);
	let vel1 = createVector(0, 0);
	let vel2 = createVector(0, 0);
	let vel3 = createVector(0, 0);
	let acc1 = createVector(0, 0);
	let acc2 = createVector(0, 0);
	let acc3 = createVector(0, 0);
	
	let mass1 = 1000;
	let mass2 = 1;
	let mass3 = 1;
	
	let radius1 = 5 + mass1 / 100;
	let radius2 = 5 + mass2 / 100;
	let radius3 = 5 + mass3 / 100;
	
	let p12 = p5.Vector.sub(pos1, pos2);
	let p13 = p5.Vector.sub(pos1, pos3);

	let v1 = sqrt((G * mass1) / p12.mag());
	let v2 = sqrt((G * mass1) / p13.mag());

	vel2.y = -v1;
	vel3.y = v2;
	
	
	planets[0] = new Planet(pos1, vel1, acc1, radius1, mass1);
	planets[1] = new Planet(pos2, vel2, acc2, radius2, mass2);
	planets[2] = new Planet(pos3, vel3, acc3, radius3, mass3);
}

function LoadRandomizedOrbit()
{
	let pos1 = createVector(windowWidth/2, windowHeight/2);
	let vel1 = createVector(0, 0);
	let acc1 = createVector(0, 0);
	let mass1 = 10000;
	let radius1 = 5 + mass1 / 100;
	planets[0] = new Planet(pos1, vel1, acc1, radius1, mass1);
	
	for (let i = 1; i<numPlanets; i++)
	{
			let pos2 = createVector(random(windowWidth/3), random(windowHeight/3));
			
			let vel2 = createVector(0, 0);
			let acc2 = createVector(0, 0);
			
			let mass2 = random(1, 10);
			let radius2 = 5 + mass2 / 100;

			let p12 = p5.Vector.sub(pos1, pos2);
			let v1 = sqrt((G * mass1) / p12.mag());
			
			if (random() > 0.5)
			{
				vel2.y = v1;
			}
			else
			{
				vel2.y = -v1;
			}
			
			planets[i] = new Planet(pos2, vel2, acc2, radius2, mass2);
	}
}

function LoadMultiOrbit() {
	let posStationary = createVector(windowWidth/2, windowHeight/2);
	let velStationary = createVector(0, 0);
	let accStationary = createVector(0, 0);
	let massStationary = 10000;
	
	let radiusStationary = 5 + massStationary/100;

	planets[0] = new Planet(posStationary, velStationary, accStationary, radiusStationary, massStationary);
	
	for (let i = 1; i < 15; i++){
		let pos1 = createVector(windowWidth/2 - radiusStationary - i*30, windowHeight/2);
		let vel1 = createVector(0, 0);
		let acc1 = createVector(0, 0);
		let mass = 0.1;
		let radius = 5 + mass/100;
		
		let p12 = p5.Vector.sub(posStationary, pos1);
		let v = sqrt((G * massStationary) / p12.mag());
		vel1.y = v;
		let p1 = new Planet(pos1, vel1, acc1, radius, mass);
		
		let pos2 = createVector(windowWidth/2 + radiusStationary + i*30, windowHeight/2);
		let vel2 = createVector(0, 0);
		let acc2 = createVector(0, 0);
		vel2.y = -v;
		
		let p2 = new Planet(pos2, vel2, acc2, radius, mass);
		append(planets, p1);
		append(planets, p2);
	}
	
}

function LoadTwistOrbit() {
	let pos1 = createVector(windowWidth/2 - 100, windowHeight/2);
	let pos2 = createVector(windowWidth/2 + 100, windowHeight/2);
	let vel1 = createVector(0, 0);
	let vel2 = createVector(0, 0);
	let acc1 = createVector(0, 0);
	let acc2 = createVector(0, 0);
	let mass1 = 5000;
	let mass2 = 5000;
	
	let radius1 = 5 + mass1/100;
	let radius2 = 5 + mass2/100;
	
	let p12 = p5.Vector.sub(pos1, pos2);

	let v = sqrt((G * mass1) / p12.mag() / 2);
	
	vel1.y = v;
	vel2.y = -v;

	planets[0] = new Planet(pos1, vel1, acc1, radius1, mass1);
	planets[1] = new Planet(pos2, vel2, acc2, radius2, mass2);
	
	
	let pos3 = createVector(windowWidth/2 - 150, windowHeight/2);
// 	let pos4 = createVector(windowWidth/2 + 150, windowHeight/2);
	let vel3 = createVector(0, 0);
// 	let vel4 = createVector(0, 0);
	let acc3 = createVector(0, 0);
// 	let acc4 = createVector(0, 0);
	let mass3 = 100;
// 	let mass4 = 10;
	
	let radius3 = 5 + mass3/100;
// 	let radius4 = 5 + mass4/100;
	
	let p13 = p5.Vector.sub(pos1, pos3);

	v = sqrt((G * mass2) / p13.mag() / 2);
	
	vel3.y = -1.4*v;
// 	vel4.y = v;

	planets[2] = new Planet(pos3, vel3, acc3, radius3, mass3);
// 	planets[3] = new Planet(pos4, vel4, acc4, radius4, mass4);
	
}

function LoadRandomPlanets()
{
	for (let i = 0; i < numPlanets; i++)
	{
		let pos = createVector(random(windowWidth), random(windowHeight));
		let vel = createVector(0, 0);
		let acc = createVector(random(-1, 1), random(-1, 1));
		// let acc = createVector(0, 0);
		let mass = random(100, 1000);
		let radius = 5 + mass / 100;
		planets[i] = new Planet(pos, vel, acc, radius, mass);
	}
}

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	physics = new Physics(G);
	graphics = new Graphics();
	LoadMultiOrbit();
	buttonPressStarted = false;
	drawTail = true;
	newPlanetMass = 1;
	textSize(16);
	frameRate(60);
}

function ShowText()
{
	stroke(0);
	strokeWeight(1);
	fill(150);
	text('Num Planets: ' + nf(planets.length), 10, 25);
	text('New Planet Mass: ' + nf(newPlanetMass), 10, 45);
}

function LoopPosition(planets)
{
	for (let i = 0; i < planets.length; i++)
			{
				let p = planets[i];
				if (p.pos.x < 0){p.pos.x = windowWidth;}
				else if (p.pos.x > windowWidth){p.pos.x = 0;}
				
				if (p.pos.y < 0){p.pos.y = windowHeight;}
				else if (p.pos.y > windowHeight){p.pos.y = 0;}
			}
}

function mousePressed(event) {
	if(mouseButton === LEFT) 
	{
		buttonPressp1 = createVector(mouseX, mouseY);
		buttonPressStarted = true;
  }
}

function mouseReleased(event) {
	if(mouseButton === LEFT && buttonPressStarted) 
	{
		buttonPressp2 = createVector(mouseX, mouseY);
		buttonPressStarted = false;
		AddNewPlanet();
  }
}

function keyTyped() 
{
	if (key == '0')
	{		
		planets = [];
	}
	else if (key == '1')
	{		
		planets = [];
		LoadRandomPlanets();
	}
	else if (key == '2')
	{		
		planets = [];
		LoadStableOrbit1();
	}
	else if(key == '3')
	{
		planets = [];
		LoadStableOrbit2();
	}
	else if (key == '4')
	{		
		planets = [];
		LoadRandomizedOrbit();
	}
	else if (key == '5')
	{		
		planets = [];
		LoadMultiOrbit();
	}
	else if (key == '6')
	{
		planets = [];
		LoadTwistOrbit();
	}
	else if(key == 't' || key == 'T')
	{
		drawTail = !drawTail;	
	}
}
function mouseWheel(event) 
{
  newPlanetMass -= event.delta * 0.1;
	
	if (newPlanetMass < 1)
	{
			newPlanetMass = 1;
	}
	
	else if (newPlanetMass > 10000)
	{
			newPlanetMass = 10000;
	}
	
}

function AddNewPlanet()
{
	mouseP12 = p5.Vector.sub(buttonPressp1, buttonPressp2);
	mouseP12.setMag(mouseP12.mag() * 0.03);
	let pos = buttonPressp2.copy();
	// let vel = mouseP12.copy();
	let vel = createVector(0, 0);

	let acc = mouseP12.copy();
	let radius = 5 + newPlanetMass / 100;
	
	let p = new Planet(pos, vel, acc, radius, newPlanetMass);
	append(planets, p);
}

function RemoveFarAwayPlanets()
{
	for (let i = 0; i < planets.length; i++)
	{
				let p = planets[i];
				let r = p.pos.mag();
		
				if (r > 5*windowWidth)
				{
					planets.splice(i, 1);
				}
	}
}

function draw() 
{
	background(0);
	RemoveFarAwayPlanets();
	physics.Step(planets);
	graphics.DrawObjects(planets, drawTail);
	ShowText();
	
	stroke(255, 0, 0);
	fill(0, 0, 255);
	if (buttonPressStarted)
	{
		line(buttonPressp1.x, buttonPressp1.y, mouseX, mouseY);
		circle(mouseX, mouseY, 10);
	}
	
	// LoopPosition(planets);

}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}