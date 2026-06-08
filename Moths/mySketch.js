let lightPos;
let moths = [];
let numMoths = 100;

function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    lightPos = createVector(width / 2, height/4)
    for (let i = 0 ; i <  numMoths; i++){
	    append(moths, new Moth(createVector(random(width/2 - 100, width/2 + 100), random(0.5*height, 0.7*height))));
    }
    
    noStroke();
}

function draw()
{
    clear();
    background(10);
    fill(255);
    circle(lightPos.x, lightPos.y, 150);

    
    for (let i = 0; i < moths.length; i++) {
        let moth = moths[i];
        push();
        translate(moth.pos.x, moth.pos.y);
        fill(255, 255, 255);
        rotate(moth.heading);
        ellipse(0, 0, moth.size, moth.size/6);
        pop();
        
        moth.adjust(lightPos);
        moth.step(deltaTime/300);
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}