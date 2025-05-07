let pos;
let fishes = [];
let graphics;
let deltaT = 0.1;
function setup() 
{
	createCanvas(windowWidth, windowHeight);

    pos = createVector(windowWidth/2, windowHeight/2);
	append(fishes, new Fish(pos));
    graphics = new Graphics();

    // frameRate(1);
}

function draw()
{
	background(0);
    for (let i = 0; i < fishes.length; i++)
    {
        fishes[i].Step(deltaT);
    }
    graphics.draw(fishes);
}