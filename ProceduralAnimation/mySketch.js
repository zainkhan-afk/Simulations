let pos;
let fishes = [];
let fishRadii = [];
let graphics;
let theShader;
let deltaT = 0.2;



function preload(){
    font = loadFont("../fonts/KronaOne-Regular.ttf");
    theShader = loadShader('shaders/shader.vert', 'shaders/shader.frag');
  }

function setup() 
{
	createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(font);

    pos = createVector(windowWidth / 4 , random(0, windowHeight));
	append(fishes, new Fish(pos));

    
    // graphics = new Graphics();
    shaderTex = createGraphics(windowWidth, windowHeight, WEBGL);
    noStroke();
    rectMode(CENTER);

    fishRadii = [16.0, 20.0, 20.0, 16.0, 12.0, 10.0, 8.0, 6.0];

    for (let i = 0; i < fishRadii.length; i++)
    {
        fishRadii[i] /= windowWidth;
    }
}

function draw()
{
    let fishPositions = [];

    for (let i = 0; i < fishes.length; i++)
    {
        fishes[i].Step(deltaT);
        for (let j = 0; j < fishes[i].num_circles; j++){
            fishPositions.push(fishes[i].circles[j].x / windowWidth, (windowHeight - fishes[i].circles[j].y) / windowWidth)
        }
    }

    // let vectorData = new Float32Array(fishPositions);

    shaderTex.shader(theShader);
    theShader.setUniform("u_resolution", [windowWidth,windowHeight]);
    theShader.setUniform("u_time", millis() / 1000.0);

    theShader.setUniform("fishSegmentsPositions", fishPositions);
    theShader.setUniform("segmentRadii", fishRadii);
    theShader.setUniform("numFishes", fishes.length);
    
    
    shaderTex.rect(0,0,windowWidth,windowHeight);

    fill(0);
    textSize(10);
    
    texture(shaderTex);
    rect(0, 0, windowWidth,windowHeight);

    text("FrameRate: " + int(frameRate()),  -windowWidth/2 + 10, -windowHeight/2 + 15);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}