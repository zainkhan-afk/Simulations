class Cell{
    constructor(row, col, size){
        this.row = row;
        this.col = col;
        this.size = size;
        this.type = 255*noise(row/10, col/10);
    }

    GetCellPosition(){
        return createVector(this.col*this.size, this.row*this.size);
    }
}