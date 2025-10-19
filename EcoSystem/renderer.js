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
                fill(100, cell.type, 10);
                rect(pos.x, pos.y, cell.size, cell.size);
            }
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
        this.RenderAnimals(simulation.animals);

        this.RenderToolTip();
    }
}