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
    renderer.render(car);
    car.update(0.1);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}