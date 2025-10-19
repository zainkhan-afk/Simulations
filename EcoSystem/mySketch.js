let renderer;
let simulation;
let cellSize = 10;
let numRows = 50;
let numCols = 200;

function setup() 
{
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("main");
    
    let grid = new Grid(cellSize, numRows, numCols);
    simulation = new Simulation(grid);
    
    renderer = new Renderer();

    noStroke();
}

function draw()
{
    clear();
    background(200);
    
    renderer.Render(simulation);
    if (UIState.simulationRunning) {
        simulation.step();
    } else {
        fill(20);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Simulation Paused", width / 2, height / 2);
    }
    
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
  if (UIState.selectedAnimal) {
    // Example: create a new creature based on selected animal
    switch (UIState.selectedAnimal) {
      case "rabbit":
        // call your rabbit spawning code
        console.log("Spawning a rabbit at", mouseX, mouseY);
        simulation.AddAnimal(new Rabbit(createVector(mouseX, mouseY)));
        break;

      case "fox":
        console.log("Spawning a fox at", mouseX, mouseY);
        simulation.AddAnimal(new Fox(createVector(mouseX, mouseY)));
        break;

      case "wolf":
        console.log("Spawning a wolf at", mouseX, mouseY);
        simulation.AddAnimal(new Wolf(createVector(mouseX, mouseY)));
        break;
    }
  }
}