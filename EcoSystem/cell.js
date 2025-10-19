class Cell{
    constructor(row, col, size){
        this.row = row;
        this.col = col;
        this.size = size;
        this.type = random(0, 255);
    }

    GetCellPosition(){
        return createVector(this.col*this.size, this.row*this.size);
    }
}