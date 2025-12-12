// a shader variable
let planetShader;
let cloudShader;
let galaxyShader;
let font;
let numFrames;
let frameSum;
let angle;
let lightPos;

let ridgeNoiseAmpSlider;
let ridgeNoiseAmpSpan;
let ridgeNoiseFSlider;
let ridgeNoiseFSpan;
let ridgeNoiseOffsetSlider;
let ridgeNoiseOffsetSpan;

let terrainNoiseAmpSlider;
let terrainNoiseAmpSpan;
let terrainNoiseFSlider;
let terrainNoiseFSpan;
let terrainNoiseOffsetSlider;
let terrainNoiseOffestSpan;

let ridgeNoiseMaskFreqSlider;
let ridgeNoiseMaskFreqSpan;
let ridgeNoiseMaskOffsetSlider;
let ridgeNoiseMaskOffsetSpan;
let ridgeNoiseMaskThreshSlider;
let ridgeNoiseMaskThreshSpan;

function preload(){
  // load the shader
  font = loadFont("../fonts/KronaOne-Regular.ttf");
  planetShader = loadShader('shaders/shader_planet.vert', 'shaders/shader_planet.frag');
  cloudShader = loadShader('shaders/shader_clouds.vert', 'shaders/shader_clouds.frag');
  galaxyShader = loadShader('shaders/shader_galaxy.vert', 'shaders/shader_galaxy.frag');
  
  lightPos = [-0.5, -0.5, 1.0];

}

function createSliderWithName(name, sliderMin, sliderMax, sliderPos, sliderTick, position){
  let span = createSpan(name);
  span.position(position[0], position[1]);
  
  let slider = createSlider(sliderMin, sliderMax, sliderPos, sliderTick);
  slider.position(position[0] + 200, position[1]);
  slider.size(150);

  let spanValue = createSpan(name);
  spanValue.position(position[0] + 380, position[1]);

  return [slider, spanValue];
}

function setup() {
  randomSeed(3700);
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
  let res
  res = createSliderWithName("RidgeNoise Amp", 0, 5, random(0, 1.5), 0, [20, 20]);
  ridgeNoiseAmpSlider = res[0];
  ridgeNoiseAmpSpan = res[1];

  res = createSliderWithName("RidgeNoise Freq.", 0, 15, random(0, 5), 0, [20, 50]);
  ridgeNoiseFSlider = res[0];
  ridgeNoiseFSpan = res[1];

  res = createSliderWithName("RidgeNoise Offest.", 0, 15, random(0, 5), 0, [20, 80]);
  ridgeNoiseOffestSlider = res[0];
  ridgeNoiseOffsetSpan = res[1];

  res = createSliderWithName("TerrainNoise Amp", 0, 3, random(0, 1.5), 0, [20, 110]);
  terrainNoiseAmpSlider = res[0];
  terrainNoiseAmpSpan = res[1];
  
  res = createSliderWithName("TerrainNoise Freq.", 0, 15, random(0, 5), 0, [20, 140]);
  terrainNoiseFSlider = res[0];
  terrainNoiseFSpan = res[1];

  res = createSliderWithName("TerrainNoise Offest", 0, 15, random(0, 5), 0, [20, 170]);
  terrainNoiseOffestSlider = res[0];
  terrainNoiseOffestSpan = res[1];
  
  res = createSliderWithName("RidgeNoise M Freq.", 0, 10, random(0, 2.5), 0, [20, 200]);
  ridgeNoiseMaskFreqSlider = res[0];
  ridgeNoiseMaskFreqSpan = res[1];

  res = createSliderWithName("RidgeNoise M Offset", 0, 2, random(0.5, 0.6), 0, [20, 230]);
  ridgeNoiseMaskOffsetSlider = res[0];
  ridgeNoiseMaskOffsetSpan = res[1];

  res = createSliderWithName("RidgeNoise M Thresh", -3, 3, random(0.9, 0.99), 0, [20, 260]);
  ridgeNoiseMaskThreshSlider = res[0];
  ridgeNoiseMaskThreshSpan = res[1];
}

function draw() {
  blendMode(BLEND);
  background(200);
  fill(100);
  textSize(10);
  
  let ridgeAmp = ridgeNoiseAmpSlider.value();
  ridgeNoiseAmpSpan.html(round(ridgeAmp, 3));

  let ridgeF = ridgeNoiseFSlider.value();
  ridgeNoiseFSpan.html(round(ridgeF, 3));

  let ridgeOffest = ridgeNoiseOffestSlider.value();
  ridgeNoiseOffsetSpan.html(round(ridgeOffest, 3));

  let terrainAmp = terrainNoiseAmpSlider.value();
  terrainNoiseAmpSpan.html(round(terrainAmp, 3));

  let terrainF = terrainNoiseFSlider.value();
  terrainNoiseFSpan.html(round(terrainF, 3));

  let terrainOffsett = terrainNoiseOffestSlider.value();
  terrainNoiseOffestSpan.html(round(terrainOffsett, 3));
  
  let ridgeMaskFreq = ridgeNoiseMaskFreqSlider.value();
  ridgeNoiseMaskFreqSpan.html(round(ridgeMaskFreq, 3));
  
  let ridgeMaskOffset = ridgeNoiseMaskOffsetSlider.value();
  ridgeNoiseMaskOffsetSpan.html(round(ridgeMaskOffset, 3));
  
  let ridgeMaskThresh = ridgeNoiseMaskThreshSlider.value();
  ridgeNoiseMaskThreshSpan.html(round(ridgeMaskThresh, 3));

  // rotateX(numFrames * 0.01);
  // rotateZ(numFrames * 0.005);
  lightPos[0] = 0.5*sin(numFrames*0.01);
  // lightPos[2] = 5*cos(numFrames*0.005);
  
  
  planetShader.setUniform("uRidgeAmp", ridgeAmp);
  planetShader.setUniform("uRidgeF", ridgeF);
  planetShader.setUniform("uRidgeOffset", ridgeOffest);
  planetShader.setUniform("uTerrainAmp", terrainAmp);
  planetShader.setUniform("uTerrainF", terrainF);
  planetShader.setUniform("uTerrainOffset", terrainOffsett);
  planetShader.setUniform("uRidgeMaskFreq", ridgeMaskFreq);
  planetShader.setUniform("uRidgeMaskOffset", ridgeMaskOffset);
  planetShader.setUniform("uRidgeMaskThesh", ridgeMaskThresh);
  planetShader.setUniform("u_light_pos", lightPos);
  cloudShader.setUniform("u_time", millis() / 1000.0);
  
  galaxyShader.setUniform("u_time", millis() / 500.0);
  galaxyShader.setUniform("u_resolution", [windowHeight,windowHeight]);
  
  let radius = width / 10;
  
  push();
  rotateY(numFrames * 0.003);
  shader(planetShader);
  sphere(radius, 200, 200);

  // shader(cloudShader);
  // sphere(radius * 1.1, 200, 200);
  pop();

  // shader(galaxyShader);
  // rect(0, 0, width, height);

  numFrames += 1;
  frameSum += frameRate();

  text("FrameRate: " + int(frameSum / numFrames),  0, -windowHeight/3);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}