class Cell{
    constructor(r, c, size){
        this.r = r;
        this.c = c;
        this.size = size;       
        this.pos = createVector(this.c*this.size, this.r*this.size);

        this.grass = [];

        append(this.grass, createVector(this.pos.x + this.size / 2,this.pos.y + this.size / 2));
    }

    GetCellPosition(){
        return this.pos;
    }

    Step(){

    }
}