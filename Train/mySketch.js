let scene;
function setup() 
{
    createCanvas(windowWidth, windowHeight);
    scene = new Scene();
}

function draw()
{
    scene.Step();
    background(0);
    scene.Render();
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}