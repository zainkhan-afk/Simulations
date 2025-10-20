let pos;
let exampleClass;
function setup() 
{
	
    createCanvas(windowWidth, windowHeight, WEBGL);
    pos = createVector(windowWidth / 4 , windowHeight / 4);
	exampleClass = new ExampleClass(pos);
    
    noStroke();
}

function draw()
{
    clear();
    background(0);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}