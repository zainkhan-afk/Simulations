let pos;
let collatzRenderer;
function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    collatzRenderer = new CollatzRenderer(createVector(windowWidth / 2, windowHeight / 2));
}

function draw()
{
    background(0);
    collatzRenderer.Render();
    noLoop();
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}