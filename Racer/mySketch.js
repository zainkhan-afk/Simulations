let renderer;
let car;
let controller;
let physics;
let world;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    
    car = new Car(new State(createVector(width/2, height/2)));
    world = new World();
    renderer = new Renderer();
    controller = new Controller()
    physics = new Physics();
}

function draw()
{
    background(0);
    controller.update(car);
    let forces = physics.update(car);
    car.step(0.1, forces);
    renderer.render(car, world);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}