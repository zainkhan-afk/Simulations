let numPts = 500;
let z = 0;
let noiseMaxAmp = 3;
let dropletPos;
let accum = 0;


function setup()
{
    createCanvas(windowWidth, windowHeight);
    dropletPos = createVector(width/2, height/2);
}

function draw()
{
    translate(dropletPos.x, dropletPos.y);
    background(250);

    // fill(28,163,236);
    noFill();
    // stroke(100, 0, 0);
    // noStroke();
    beginShape();
    // for (let angle = 0; angle < TWO_PI; angle += TWO_PI / numPts){
    //     let x = map(cos(angle), -1, 1, 0, noiseMaxAmp);
    //     let y = map(sin(angle), -1, 1, 0, noiseMaxAmp);

    //     let mag = map(noise(x, y, z), 0, 1, 150, 300);
    //     let ptX = mag*cos(angle);
    //     let ptY = mag*sin(angle);

    //     vertex(ptX, ptY);
    // }
    let sc = 100;
    let maxTheta = TWO_PI;
    let steps = 3000;
    let thetaDelta = maxTheta / steps;
    let removeChunkDelta = 20/180*PI;
    for (let theta = 0; theta <= maxTheta; theta += thetaDelta) {
        if (theta < removeChunkDelta || theta > (TWO_PI - removeChunkDelta)){continue;}
        else if (theta > (PI - removeChunkDelta) &&  theta < (PI + removeChunkDelta)){continue;}
        else if (theta > ((PI + HALF_PI) - removeChunkDelta) &&  theta < ((PI + HALF_PI) + removeChunkDelta)){continue;}
        // if (theta > (TWO_PI - removeChunkDelta)){continue;}
        // if (theta < removeChunkDelta){continue;}
        // if (theta > (TWO_PI - PI / 10)){continue;}
        // if (theta < PI / 10){continue;}
        // if (theta > (PI - PI / 10)){continue;}
        let r = exp(sin(theta)) - 2 * cos(4 * theta) + pow(sin((2 * theta - PI) / 24), 5);
        // let x = r * cos(theta);
        // let y = r * sin(theta);
        let x = map(r*cos(theta), -1, 1, 0, noiseMaxAmp);
        let y = map(r*sin(theta), -1, 1, 0, noiseMaxAmp);
        
        let magn = map(noise(x, y, z), 0, 1, 50, 100);
        let ptX = r*magn*cos(theta);
        let ptY = r*magn*sin(theta);

        vertex(ptX, ptY);
    }
    endShape(CLOSE);
    accum += 5*thetaDelta;
    if (accum > maxTheta) {
        accum = 0; 
    }
    z += 0.01;
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}