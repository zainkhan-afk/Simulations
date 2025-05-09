let pos;
let fishes = [];
let graphics;
let deltaT = 0.1;
function setup() 
{
	createCanvas(windowWidth, windowHeight);

    pos = createVector(windowWidth / 4 , random(0, windowHeight));
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
    graphics.DrawFish(fishes);
}