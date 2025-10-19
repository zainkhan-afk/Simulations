let renderer;
let simulation;
let cellSize = 10;
let numRows = 50;
let numCols = 50;

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
    renderer.render(simulation);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
  if (window.selectedAnimal) {
    // Example: create a new creature based on selected animal
    switch (window.selectedAnimal) {
      case "rabbit":
        // call your rabbit spawning code
        console.log("Spawning a rabbit at", mouseX, mouseY);
        // e.g. grid.addCreature(new Rabbit(mouseX, mouseY));
        break;

      case "fox":
        console.log("Spawning a fox at", mouseX, mouseY);
        // e.g. grid.addCreature(new Fox(mouseX, mouseY));
        break;

      case "wolf":
        console.log("Spawning a wolf at", mouseX, mouseY);
        // e.g. grid.addCreature(new Wolf(mouseX, mouseY));
        break;
    }
  }
}