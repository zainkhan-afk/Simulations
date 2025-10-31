class Renderer{
    constructor() {

    }

    RenderGrid(grid){
        stroke(0);
        for (let r = 0; r < grid.numRows; r++){
            for (let c = 0; c < grid.numCols; c++){
                let cell = grid.GetCellAt(r, c);
                let pos = cell.GetCellPosition();
                fill(100, 100, 100);
                rect(pos.x, pos.y, cell.size, cell.size);
            }
        }
        stroke(0);
        fill(255);
        text(int(frameRate()), 10, 10);
    }

    Render(sim){
        this.RenderGrid(sim.grid);
    }
}