// a shader variable
let planetShader;
let cloudShader;
let galaxyShader;
let font;
let numFrames;
let frameSum;
let angle;


function preload(){
  // load the shader
  font = loadFont("../fonts/KronaOne-Regular.ttf");
  planetShader = loadShader('shaders/shader_planet.vert', 'shaders/shader_planet.frag');
  cloudShader = loadShader('shaders/shader_clouds.vert', 'shaders/shader_clouds.frag');
  galaxyShader = loadShader('shaders/shader_galaxy.vert', 'shaders/shader_galaxy.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  
  noStroke();
  // shaderTex = createGraphics(windowWidth, windowHeight, WEBGL);
  numFrames = 0;
  frameSum = 0;
  angle = 0;
  rectMode(CENTER);
  frameRate(120);

}

function draw() {
  blendMode(BLEND);
  // rotateX(numFrames * 0.01);
  // rotateZ(numFrames * 0.005);
  
  background(200);
  
  // planetShader.setUniform("u_resolution", [windowWidth,windowHeight]);
  cloudShader.setUniform("u_time", millis() / 1000.0);
  galaxyShader.setUniform("u_time", millis() / 500.0);
  galaxyShader.setUniform("u_resolution", [windowHeight,windowHeight]);
  
  fill(200);
  textSize(10);
  let radius = width / 10;
  
  push();
  rotateY(numFrames * 0.0003);
  shader(planetShader);
  sphere(radius, 200, 200);

  shader(cloudShader);
  sphere(radius * 1.1, 200, 200);
  pop();

  shader(galaxyShader);
  rect(0, 0, width, height);

  numFrames += 1;
  frameSum += frameRate();

  text("FrameRate: " + int(frameSum / numFrames),  0, -windowHeight/3);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}