class Renderer{
    constructor(){

    }

    render(simulation){
        // stroke(0);
        for (let r = 0; r < simulation.grid.numRows; r++){
            for (let c = 0; c < simulation.grid.numCols; c++){
                let cell = simulation.grid.GetCellAt(r, c);
                let pos = cell.GetCellPosition();
                fill(100, cell.type, 10);
                rect(pos.x, pos.y, cell.size, cell.size);
            }
        }
    }
}