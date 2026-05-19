let numPts = 500;
let z = 0;
let noiseMaxAmp = 0.3;
let dropletPos;


function setup()
{
    createCanvas(windowWidth, windowHeight);
    dropletPos = createVector(width/2, height/2);
}

function draw()
{
    translate(dropletPos.x, dropletPos.y);
    background(250);

    fill(28,163,236);
    // stroke(100, 0, 0);
    noStroke();
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
    let maxTheta = TWO_PI * 2;
    let steps = 300;
    let thetaDelta = maxTheta / steps;
    for (let theta = 0; theta <= maxTheta; theta += thetaDelta) {
        let r = exp(sin(theta)) - 2 * cos(4 * theta) + pow(sin((2 * theta - PI) / 24), 5);
        let x = r * cos(theta);
        let y = r * sin(theta);
        
        let mag = map(noise(x, y, z), 0, 1, 50, 100);
        let ptX = r*mag*cos(theta);
        let ptY = r*mag*sin(theta);

        vertex(ptX, ptY);
    }
    endShape(CLOSE);
    z += 0.01;
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}