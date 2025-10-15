let pos;
let exampleClass;
let people = [];
let numPeople = 1;
let renderer;
let dt = 0.1;
let frameCtr = 0;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    pos = createVector(windowWidth / 4 , windowHeight / 4);
    renderer = new Renderer();
	
    for (let i = 0; i < numPeople; i++)
    {
        // append(people, new Person(createVector(random(100, windowWidth - 100), random(100, windowHeight - 100))));
        append(people, new Person(createVector(windowWidth / 2, windowHeight / 2)));
    }
    
    noStroke();
    frameRate(60);
}

function draw()
{
    clear();
    background(255);
    renderer.render(people);

    for (let i = 0; i < people.length; i++) {
        let person = people[i];
        if (frameCtr == 300) {person.vel.setHeading(person.vel.heading() + 1 / 180 * PI); }
        person.Update(dt);
    }
    frameCtr += 1;
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}