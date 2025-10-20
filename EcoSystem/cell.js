class Cell{
    constructor(row, col, size){
        this.row = row;
        this.col = col;
        this.size = size;
        this.growthRate = 0.1;
        this.maxGrowth = random(80, 100);
        
        
        let n = noise(row/10, col/10);
        let thresh = 0.4;

        if (n > thresh) {
            this.foodContent = (n - thresh) / (1 - thresh) * 100;
            this.water = 0;
            this.type = "grass";
        }
        else{
            this.water = n / thresh * 100;
            this.foodContent = 0;
            this.type = "water";
        }
    }

    GetCellPosition(){
        return createVector(this.col*this.size, this.row*this.size);
    }

    Step(){
        if (this.type == "grass") {
            if (this.foodContent < this.maxGrowth){
                this.foodContent += this.growthRate;
                if (this.foodContent > this.maxGrowth){
                    this.foodContent = this.maxGrowth;
                }
            }
        }
    }
}