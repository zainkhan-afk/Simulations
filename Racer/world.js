class World{
    constructor(){
        this.lines = [];
        this.div = 50; 
        this.numCols = int(width / this.div);
        this.numRows = int(height / this.div);

        for (let i = 0; i < this.numRows; i++){
            let data = {
                "x1" : 0,
                "y1" : i * this.div,
                "x2" : width,
                "y2" : i * this.div,
            }
            append(this.lines, data);
        }

        for (let i = 0; i < this.numCols; i++){
            let data = {
                "x1" : i * this.div,
                "y1" : 0,
                "x2" : i * this.div,
                "y2" : height,
            }
            append(this.lines, data);
        }
    }
}