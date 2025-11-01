class Simulation{
    constructor(grid){
        this.animals = [];
        this.animalCount = {rabbit:0, fox:0, wolf:0};
        this.grid = grid;
    }

    AddAnimal(animal){
        append(this.animals, animal);
        this.animalCount[animal.name] += 1;
    }


    animalBehaviour(){
        for (let  i = 0; i < this.animals.length; i++){
            let animal = this.animals[i];
            // Check if predator nearby
            // Check if food nearby
            if (animal.hunger > animal.hungerThresh * 0.6)
            {
                if (animal.type == "herbivor")
                {
                    // Find closest food
                    let animalCell = this.grid.PixelCoordinatesToCell(animal.pos);
                    if (animalCell)
                    {
                        let seekCell = this.grid.FindClosestGrassCell(animalCell.row, animalCell.col);
                        if (animalCell == seekCell && seekCell.foodMatter > 0){
                            animal.consume(seekCell);
                        }
                    }
                }
            }
            // Explore
        }
    }

    step(){
        this.animalBehaviour();
        for (let  i = 0; i < this.animals.length; i++){
            this.animals[i].step();
        }
    }
}