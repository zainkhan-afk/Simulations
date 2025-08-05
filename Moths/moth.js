class Moth{
	constructor(position){
        this.size = 50;
        this.pos = position;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 10;
        this.flip = 1;
        this.maxForce = 0.1;
        this.boundaryPadding = 100;
        this.boundaryCrossingMultiplier = 0.1;
        this.animationPhase = -1;
        this.calcualteCorners();
        this.frame = 0;
	}

    calcualteCorners(){
        this.xMin = this.boundaryPadding;
        this.xMax = windowWidth - this.boundaryPadding;
        this.yMin = this.boundaryPadding;
        this.yMax = windowHeight - this.boundaryPadding;
    }

    step()
    {
        if (this.pos.x > this.xMax && this.acc.x > 0) {
            let val = this.pos.x - this.xMax;
            this.acc.x = -val* this.boundaryCrossingMultiplier;
            this.flip *= -1;
        }

        else if (this.pos.x < this.xMin && this.acc.x < 0) {
            let val = this.xMin - this.pos.x;
            this.acc.x = val* this.boundaryCrossingMultiplier;
            this.flip *= -1;
        }

        // console.log(this.pos.y, windowHeight)
        if (this.pos.y > this.yMax && this.acc.y > 0) {
            let val = this.pos.y - this.yMax;
            this.acc.y =  -val* this.boundaryCrossingMultiplier;
            this.flip *= -1;
        }

        else if (this.pos.y < this.yMin && this.acc.y < 0) {
            let val = this.yMin - this.pos.y;
            this.acc.y =  val * this.boundaryCrossingMultiplier;
            this.flip *= -1;
        }
        
        // this.acc.limit(this.maxForce);
        this.vel.limit(this.maxSpeed);
        
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.frame += 1;
        if (this.frame % 3 == 0){
            this.animationPhase *= -1;
        }
    }
}