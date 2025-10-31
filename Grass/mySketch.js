let numRows = 25;
let numCols = 25;
let cellSize = 20;
let renderer;
let simulation;


function setup() 
{
    createCanvas(windowWidth, windowHeight);
    simulation = new Simulation(numRows, numCols, cellSize);
    renderer = new Renderer();
    noStroke();
}

function draw()
{
    clear();
    background(0);
    renderer.Render(simulation);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}