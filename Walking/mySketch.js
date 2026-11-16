let people = [];
let sim;
let numPeople = 1;
let renderer;
let dt = 0.1;
let frameCtr = 0;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    sim = new Simulation();
    renderer = new Renderer();
	
    for (let i = 0; i < numPeople; i++)
    {
        // append(people, new Person(createVector(random(100, windowWidth - 100), random(100, windowHeight - 100))));
        sim.AddPerson(new Person(createVector(windowWidth / 2, windowHeight / 2)));
    }
    
    noStroke();
    frameRate(1000);
}

function draw()
{
    clear();
    background(100);
    
    sim.Update(dt);
    renderer.render(sim);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}