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
            // console.log(animal.age, animal.hunger, animal.health, animal.isHungry);
            if (animal.isHungry)
            {
                if (animal.type == "herbivor")
                {
                    let animalCell = this.grid.PixelCoordinatesToCell(animal.pos);
                    // Find animal cell
                    if (animalCell)
                    {
                        // Found food cell
                        if (animal.foodFound){
                            if (animal.foodCell)
                            {
                                // If on food cell
                                if (animal.onTarget){
                                    // Eat if there is food in cell
                                    if (animal.foodCell.foodMatter > 0){
                                        animal.consume(animal.foodCell);
                                    }
                                    else{
                                        animal.foodFound = false;
                                        animal.onTarget = false;
                                    }
                                }
                                // Approach food cell
                                else{
                                    let steer = animal.seek(animal.foodCell.GetCellCentroidPosition());
                                    animal.applyForce(steer);
                                }
                            }
                            else{
                                animal.foodFound = false;
                            }
                        }
                        else{
                            animal.foodCell = this.grid.FindClosestGrassCell(animalCell.row, animalCell.col);
                            animal.foodFound = true;
                        }
                    }
                }
            }
            
            // Explore
            else if (animal.gender == "m" && animal.findPartner){
                for (let  j = 0; j < this.animals.length; j++){
                    let otherAnimal = this.animals[j];
                    if (otherAnimal == animal || 
                        otherAnimal.gender == "m" || 
                        !otherAnimal.readyToReproduce || 
                        !otherAnimal.findPartner ||
                        animal.name != otherAnimal.name
                    ) { continue; }

                    const diff = p5.Vector.sub(animal.pos, otherAnimal.pos);
                    if (diff.mag() < 100){
                        if (!animal.onTarget){
                            let steer = animal.seek(otherAnimal.pos);
                            animal.applyForce(steer);
                        }
                        else{
                            let child = animal.reproduce(otherAnimal);
                            animal.onTarget = false;
                            append(this.animals, child);
                        }
                    }
                }
            }
        }
    }

    step(){
        for (let  i = 0; i < this.animals.length; i++){
            if (!this.animals[i].alive){
                this.animals.splice(0, 1);
            }
        }
        this.animalBehaviour();
        for (let  i = 0; i < this.animals.length; i++){
            if (this.animals[i].alive){
                this.animals[i].step();
            }
        }
    }
}