let pos;
let ang = 0;
let wingDist = 300;
let yOff = 300;

function drawWing(side){
    push();
    translate(width/2 + side*wingDist, height/2 - yOff);
    rotate(side*PI/6);
    beginShape();
    for (let x = -width/2; x < width/2; x++){
        vertex(x, (x/10)**2);
    }
    endShape();
    pop();
}


function setup() 
{
	
    createCanvas(windowWidth, windowHeight); 
}

function draw()
{
    background(0);
    noFill();
    stroke(200);
    // for (let i = 0; i < 100; i++) {
    //     stroke(100 + 50*sin(i/20 + ang));
    //     ellipse(0, 0, 400 - 4*i, 400 - 4*i);
    // }

    drawWing(1);
    drawWing(-1);
    ang += 0.1;
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}