let lightPos;
let moths = [];
let numMoths = 100;
let light_disp = 1;

function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    lightPos = createVector(width / 2, height/4)
    // for (let i = 0 ; i <  numMoths; i++){
	//     append(moths, new Moth(createVector(random(width/2 - 100, width/2 + 100), random(0.5*height, 0.7*height))));
    // }
    
    noStroke();
}

function draw()
{
    clear();
    background(10);
    for (let i = 0; i < 25; i++){
        fill(255, 255, 0, i*1);
        circle(lightPos.x, lightPos.y, 50 + i*5);
    }

    
    for (let i = 0; i < moths.length; i++) {
        let moth = moths[i];
        push();
        translate(moth.pos.x, moth.pos.y);
        fill(255, 255, 255, 150);
        rotate(moth.heading);
        ellipse(0, 0, moth.size, moth.size/6);
        pop();
        
        moth.adjust(lightPos);
        moth.step(0.1);
    }

    if (moths.length < numMoths){
        if (random() < 0.01){
            let newMoth = new Moth(createVector(0, random(0.5*height, 0.7*height)));
            newMoth.vel.x = random(0, 30);
            append(moths, newMoth);
        }
    }

    // lightPos.x += light_disp;

    // if (lightPos.x > width){
    //     light_disp *= -1;
    // }
    // else if (lightPos.x < 0){
    //     light_disp *= -1;
    // }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}