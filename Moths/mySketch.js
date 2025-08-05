let lightPos;
let moths = [];
function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    lightPos = createVector(windowWidth, windowHeight / 2)
	append(moths, new Moth(createVector(windowWidth / 1.5 , windowHeight )));
    
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
        if (moth.animationPhase > 0){
            circle(-moth.size/5, moth.flip*(moth.animationPhase*-10), moth.size/2);
            circle(moth.size/5, moth.flip*(moth.animationPhase*-10), moth.size/2);
        }
        else{
            ellipse(-moth.size/5, moth.flip*(moth.animationPhase*-7), moth.size/2, moth.size/5);
            ellipse(moth.size/5, moth.flip*(moth.animationPhase*-7), moth.size/2, moth.size/5);
        }
        ellipse(0, 0, moth.size, moth.size/6);
        pop();
        
        let lightMoth = p5.Vector.sub(moth.pos, lightPos).normalize();
        lightMoth.rotate(PI/2);
        moth.acc = lightMoth.mult(moth.flip*2);
        // moth.acc = lightPos.mult(moth.flip*2);
        // console.log(moth.acc);
        moth.step();
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}