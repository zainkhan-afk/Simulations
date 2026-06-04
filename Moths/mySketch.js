let lightPos;
let moths = [];

function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    lightPos = createVector(windowWidth / 2, 0)
	append(moths, new Moth(createVector(width/2, height/2)));
    
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
        rotate(moth.vel.heading());
        // if (moth.animationPhase > 0){
        //     circle(-moth.size/5, moth.flip*(moth.animationPhase*-10), moth.size/2);
        //     circle(moth.size/5, moth.flip*(moth.animationPhase*-10), moth.size/2);
        // }
        // else{
        //     ellipse(-moth.size/5, moth.flip*(moth.animationPhase*-7), moth.size/2, moth.size/5);
        //     ellipse(moth.size/5, moth.flip*(moth.animationPhase*-7), moth.size/2, moth.size/5);
        // }
        ellipse(0, 0, moth.size/6, moth.size);
        pop();
        
        // let lightMoth = p5.Vector.sub(moth.pos, lightPos).normalize();
        // lightMoth.rotate(PI/2);
        // moth.acc = lightPos.mult(moth.flip*2);
        // console.log(moth.acc);
        moth.step(0.1);
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}