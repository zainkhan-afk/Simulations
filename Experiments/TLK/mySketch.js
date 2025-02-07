// a shader variable
let theShader;
let shaderTex;
let font;
let numFrames;
let frameSum;
let angle;


function preload(){
  // load the shader
  font = loadFont("../fonts/KronaOne-Regular.ttf");
  theShader = loadShader('shaders/shader.vert', 'shaders/shader.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  
  noStroke();
  shaderTex = createGraphics(windowWidth, windowHeight, WEBGL);
  numFrames = 0;
  frameSum = 0;
  angle = 0;
  rectMode(CENTER);
  frameRate(60);

}

function draw() {   
  background(200);
  
  shaderTex.shader(theShader);
  theShader.setUniform("u_resolution", [windowWidth,windowHeight]);
  theShader.setUniform("u_time", millis() / 1000.0);
  // theShader.setUniform("u_sphere_pos",[0.0, -100.0, 50*sin(angle)]);
  shaderTex.rect(0,0,windowWidth,windowHeight);
  angle += 0.05;
  
  fill(200);
  textSize(10);
   
  texture(shaderTex);
  rect(0, 0, windowWidth/2,windowHeight/2);

  numFrames += 1;
  frameSum += frameRate();

  text("FrameRate: " + int(frameSum / numFrames),  0, -windowHeight/4 + 15);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}