let renderer;
let car;
let controller;


function setup() 
{
    createCanvas(windowWidth, windowHeight);
    
    car = new Car(new State(createVector(width/2, height/2)));
    renderer = new Renderer();
    controller = new Controller()
}

function draw()
{
    background(0);
    controller.update(car);
    renderer.render(car);
    car.step(0.1);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}