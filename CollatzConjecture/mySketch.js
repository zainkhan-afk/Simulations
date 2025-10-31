let collatzRenderer;
function setup() 
{	
    createCanvas(windowWidth, windowHeight);
    collatzRenderer = new CollatzRenderer(createVector(100, windowHeight / 2));
    // stroke(10, 150);
    // strokeWeight(1);
    describe('A white circle on a gray background.');
    colorMode(HSB);
    background(0);
}

function draw()
{
    strokeCap(SQUARE);
    push();
    collatzRenderer.RenderIncremental();
    pop();
    // collatzRenderer.Render();
    // noLoop();
    // line(0, 0, 100, 100);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}