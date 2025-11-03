class BackgroundHills{
	constructor(){
        this.backgroundHillPoints = [];
        this.backgroundHillPointsBaseY = 0.7*windowHeight;
        this.backgroundHillPointsDeltaX = 50;
        this.backgroundHillPointsHeight = 250;
        this.backgroundHillNoise = 0;
        this.backgroundHillNoiseDelta = 0.2;
        this.backgroundHillX = 0;
        this.backgroundHillDeltaX = 0.25;


        for (let i = 0; i < (windowWidth / this.backgroundHillPointsDeltaX) + 3; i++)
        {
            let x = (i - 2)*this.backgroundHillPointsDeltaX;
            let y = noise(this.backgroundHillNoise)*this.backgroundHillPointsHeight;
            append(this.backgroundHillPoints, createVector(x, this.backgroundHillPointsBaseY - y));   
            this.backgroundHillNoise += this.backgroundHillNoiseDelta;
        }
	}


    Render(){
        // stroke(255);
        fill(180, 10, 20);
        beginShape();
        vertex(this.backgroundHillPoints[0].x + this.backgroundHillX, this.backgroundHillPointsBaseY);

        for (let i = 0; i < this.backgroundHillPoints.length; i++){
            vertex(this.backgroundHillPoints[i].x + this.backgroundHillX, this.backgroundHillPoints[i].y);
        }
        vertex(this.backgroundHillPoints[this.backgroundHillPoints.length - 1].x + this.backgroundHillX, this.backgroundHillPointsBaseY);
        endShape();
    }

    Step(){
        this.backgroundHillX -= this.backgroundHillDeltaX;
        let xStart = this.backgroundHillPoints[0].x + this.backgroundHillX
        if (xStart <= -this.backgroundHillPointsDeltaX){
            this.backgroundHillPoints.splice(0, 1);
        }
        let xEnd = this.backgroundHillPoints[this.backgroundHillPoints.length - 1].x + this.backgroundHillX;

        
        if (xEnd <= windowWidth + this.backgroundHillPointsDeltaX)
        {
            let x = (xEnd - this.backgroundHillX) + this.backgroundHillPointsDeltaX;   
            let y = noise(this.backgroundHillNoise)*this.backgroundHillPointsHeight;
            // console.log(x, xEnd);
            append(this.backgroundHillPoints, createVector(x, this.backgroundHillPointsBaseY - y));   
            this.backgroundHillNoise += this.backgroundHillNoiseDelta;       
        }


        // console.log(this.backgroundHillPoints.length);
    }
}