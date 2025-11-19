let faces = [];
let numFaces = 1;
function setup() 
{
	
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < numFaces; i++){
        faces.push(new Face(createVector(windowWidth / 2, windowHeight / 2)));
    }
}

function draw()
{
    clear();
    background(71, 68, 63);
    for (let i = 0; i < numFaces; i++){
        faces[i].Step();
        faces[i].Render();
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}