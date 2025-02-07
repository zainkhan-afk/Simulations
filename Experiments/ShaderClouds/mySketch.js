// a shader variable
let theShader;
let shaderTex;
let frame_rate;
let font;



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
  frame_rate = 0;
  rectMode(CENTER);
}

function draw() {  
  // theShader.setUniform('u_resolution', [windowWidth, windowHeight]);
  // theShader.setUniform("u_time", millis() / 100.0);
  // shader(theShader);
  // rect(0,0,windowWidth, height);
  
  background(200);
  
  shaderTex.shader(theShader);
  theShader.setUniform("u_resolution", [windowWidth,windowHeight]);
  theShader.setUniform("u_time", millis() / 1000.0);
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