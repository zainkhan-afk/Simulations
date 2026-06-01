let car;
let renderer;
let controller;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    car = new Car(createVector(100, height/2), 0);
    renderer = new Renderer();
    controller = new Controller();
}

function draw()
{
    controller.update(car);
    car.update(0.1);
    renderer.render(car);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}