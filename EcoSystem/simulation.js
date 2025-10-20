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

    step(){

    }
}