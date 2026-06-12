let lights = [];
let moths = [];
let numMoths = 100;
let light_disp = 1;


function findClosestLightIndex(moth){
    let minD = 10000;
    let selectedLightIndex = -1;
    for (let i = 0; i < lights.length; i++){
        let light = lights[i];
        let d = moth.pos.dist(light.pos);
        if (d < minD){
            selectedLightIndex = i;
            minD = d;
        }
    }

    return selectedLightIndex;
}

function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    // append(lights, new Light(createVector(width / 2, height/4)));
    
    noStroke();
}

function draw()
{
    clear();
    background(10);
    noStroke();

    for (let j = 0; j < lights.length; j++){
        for (let i = 0; i < 25; i++){
            fill(255, 255, 0, 10 + i*1);
            circle(lights[j].pos.x, lights[j].pos.y, 5 + (25 - i)*3);
        }
    }
    
    strokeWeight(3);
    stroke(244, 150);
    for (let i = 0; i < moths.length; i++) {
        let moth = moths[i];
        
        let selectedLightIndex = findClosestLightIndex(moth);

        push();
        translate(moth.pos.x, moth.pos.y);
        // fill(255, 255, 255, 150);
        rotate(moth.heading);
        // ellipse(0, 0, moth.size, moth.size/6);
        line(-moth.size/2, 0, moth.size/2, 0)
        line(0, -moth.size/4, 0, moth.size/10)
        pop();
        
        if (selectedLightIndex > -1){
            let selectedLight = lights[selectedLightIndex];
            moth.adjust(selectedLight.pos);
        }
        moth.step(0.1);
    }

    if (moths.length < numMoths){
        if (random() < 0.01){
            let rVal = random();
            let xPos = rVal > 0.5 ? 0:width;
            let newMoth = new Moth(createVector(xPos, random(0.5*height, 0.7*height)));
            newMoth.vel.x = rVal > 0.5 ? 30:-30;
            append(moths, newMoth);
        }
    }
}


function addLight(x, y) {
    append(lights, new Light(createVector(x, y)));
}

function mousePressed() {
    addLight(mouseX, mouseY);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}