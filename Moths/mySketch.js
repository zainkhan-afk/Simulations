let lightPos;
let moths = [];
function setup() 
{
	
    createCanvas(windowWidth, windowHeight, WEBGL);
    lightPos = createVector(windowWidth / 2, 0)
	append(moths, new Moth(createVector(windowWidth / 4 , windowHeight / 4)));
    
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
        fill(255, 0, 0);
        ellipse(0, 0, moth.size/2, moth.size);
        pop();
        let light_post = p5.Vector.sub(moth.pos, lightPos).normalize();
        light_post.rotate(PI/2);
        moth.acc = light_post.mult(0.1);
        // console.log(moth.acc);
        moth.step();
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}