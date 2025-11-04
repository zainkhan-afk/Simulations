class Birdge{
    constructor(){
        this.bridgeArchPositions = [];
        this.baseY = 0.7*windowHeight;
        this.pillarHeight = 50;
        this.deltaSpacingX = 150;
        this.noiseVal = 0;
        this.noiseDelta = 0.2;
        this.xOffset = 0;
        this.xDelta = 7;


        for (let i = 0; i < (windowWidth / this.deltaSpacingX) + 3; i++)
        {
            let x = (i - 2)*this.deltaSpacingX;
            let y = this.baseY;
            append(this.bridgeArchPositions, createVector(x, y));   
        }
    }

    Render(){
        noFill();
        strokeWeight(5);
        for (let i = 0; i < this.bridgeArchPositions.length; i++){
            let pos = this.bridgeArchPositions[i];
            let x1 = pos.x - 50 + this.xOffset;
            let x2 = pos.x + 50 + this.xOffset;

            beginShape();
            vertex(x1, this.baseY);
            for (let i = PI; i < 2*PI; i += 20/180*PI ){
                let x = 50*cos(i);
                let y = 50*sin(i) - this.pillarHeight;
                vertex(x + pos.x + this.xOffset, y + pos.y);
            }
            vertex(x2, this.baseY);
            endShape()

        }
        line(0, this.baseY - 50 - this.pillarHeight, windowWidth, this.baseY - 50 - this.pillarHeight);
        strokeWeight(2);
        
        for (let i = 0; i < 5; i++){
            fill(255, 0, 0);
            rect(300 + i*25, this.baseY - 50 - this.pillarHeight - 20, 20, 15);
            fill(0);
            circle(300 + i*25 + 5, this.baseY - 50 - this.pillarHeight - 5, 5);
            circle(300 + i*25 + 15, this.baseY - 50 - this.pillarHeight - 5, 5);
        }
        
    }
    Step(){
        this.xOffset -= this.xDelta;
        let xStart = this.bridgeArchPositions[0].x + this.xOffset
        if (xStart <= -this.deltaSpacingX){
            this.bridgeArchPositions.splice(0, 1);
        }
        let xEnd = this.bridgeArchPositions[this.bridgeArchPositions.length - 1].x + this.xOffset;

        
        if (xEnd <= windowWidth + this.deltaSpacingX)
        {
            let x = (xEnd - this.xOffset) + this.deltaSpacingX;   
            let y = this.baseY;
            // console.log(x, xEnd);
            append(this.bridgeArchPositions, createVector(x, y));   
            this.noiseVal += this.noiseDelta;       
        }
    }
}