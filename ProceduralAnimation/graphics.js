class Graphics{
    constructor()
    {

    }

    draw(fishes)
    {
        // noFill();
        fill(255);
        noStroke();
        for (let i = 0; i < fishes.length; i++)
        {
            let fish = fishes[i];
            for (let j = 0; j < fish.circles.length; j++)
            {
                circle(fish.circles[j].x, fish.circles[j].y, fish.radii[j]*2);
            }
        }
    }
}