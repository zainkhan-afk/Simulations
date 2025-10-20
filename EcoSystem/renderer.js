class Renderer{
    constructor(){

    }

    RenderGrid(grid){
        // stroke(0);
        noStroke();
        for (let r = 0; r < grid.numRows; r++){
            for (let c = 0; c < grid.numCols; c++){
                let cell = grid.GetCellAt(r, c);
                let pos = cell.GetCellPosition();
                fill(10, cell.foodContent, cell.water);
                rect(pos.x, pos.y, cell.size, cell.size);
            }
        }
        stroke(0);
        fill(255);
        text(int(frameRate()), 10, 10);
    }

    RenderHUD(simulation){
        let i = 20;
        stroke(0);
        fill(255);
        textAlign(LEFT);
        for (const key in simulation.animalCount) {
            text(key + ":", windowWidth - 200, i)
            text(simulation.animalCount[key], windowWidth - 120, i)
            i += 20;
        }   
    }

    RenderAnimals(animals){
        for (let i = 0; i < animals.length; i++)
        {
            stroke(0);
            fill(animals[i].color);
            circle(animals[i].pos.x, animals[i].pos.y, animals[i].size);
        }
    }

    RenderToolTip(){
        if (UIState.selectedAnimal) {
            // Example: create a new creature based on selected animal
            switch (UIState.selectedAnimal) {
            case "rabbit":
                fill(100, 100, 200);
                circle(mouseX, mouseY, 10);
                break;

            case "fox":
                fill(200, 100, 100);
                circle(mouseX, mouseY, 20);
                break;

            case "wolf":
                fill(200, 200, 200);
                circle(mouseX, mouseY, 30);;
                break;
            }
        }
    }

    Render(simulation){
        this.RenderGrid(simulation.grid);
        this.RenderHUD(simulation);
        this.RenderAnimals(simulation.animals);

        this.RenderToolTip();
    }
}