class TreeLine{
    constructor(baseY, deltaSpacingX, xDelta){
		this.tree1 = loadImage('/Train/assets/images/Tree - Pine 04.png');
		// this.tree1 = loadImage('https://raw.githubusercontent.com/zainkhan-afk/Simulations/main/AckermannDriving/sprites/small_car_sprite.png');

        this.treePositions = [];
        this.baseY = baseY;
        this.deltaSpacingX = deltaSpacingX;
        this.treePositionsHeight = 250;
        this.noiseVal = 0;
        this.noiseDelta = 0.2;
        this.xOffset = 0;
        this.xDelta = xDelta;


        for (let i = 0; i < (windowWidth / this.deltaSpacingX) + 3; i++)
        {
            let x = (i - 2)*this.deltaSpacingX;
            let y = this.baseY;
            append(this.treePositions, createVector(x, y));   
            this.noiseVal += this.noiseDelta;
        }
    }

    Render(){
		// imageMode(CENTER);
        console.log(this.tree1);
        for (let i = 0; i < this.treePositions.length; i++){
            // console.log(this.tree1);
            image(this.tree1, this.treePositions[i].x + this.xOffset, this.treePositions[i].y - this.tree1.height);
            // image(this.tree1, 500, 500);
        }
    }
    Step(){
        this.xOffset -= this.xDelta;
        let xStart = this.treePositions[0].x + this.xOffset
        if (xStart <= -2*this.deltaSpacingX){
            this.treePositions.splice(0, 1);
        }
        let xEnd = this.treePositions[this.treePositions.length - 1].x + this.xOffset;

        
        if (xEnd <= windowWidth + this.deltaSpacingX)
        {
            let x = (xEnd - this.xOffset) + this.deltaSpacingX;   
            let y = this.baseY;
            // console.log(x, xEnd);
            append(this.treePositions, createVector(x, y));   
            this.noiseVal += this.noiseDelta;       
        }
    }
}