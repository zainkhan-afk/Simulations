class Simulation{
    constructor(numRows, numCols, cellSize){
        this.grid = new Grid(numRows, numCols, cellSize);
    }

    Step(dt){
        this.grid.Step(dt);
    }
}