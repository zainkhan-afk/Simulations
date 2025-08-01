class Moth{
	constructor(position){
        this.size = 50;
        this.pos = position;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 3;
        this.maxForce = 0.1;
        this.calcualteCorners();
	}

    calcualteCorners(){
        this.xMin = 10;
        this.xMax = windowWidth - 10;
        this.yMin = 10;
        this.yMax = windowHeight - 10;
    }

    step()
    {
        if (this.pos.x > this.xMax && this.acc.x > 0) {
            let val = this.pos.x - this.xMax;
            this.acc.x = val* 0.5;
        }

        else if (this.pos.x < this.xMin && this.acc.x < 0) {
            let val = this.xMin - this.pos.x;
            this.acc.x = val* 0.5;
        }

        // console.log(this.pos.y, windowHeight)
        if (this.pos.y > this.yMax && this.acc.y > 0) {
            let val = this.pos.y - this.yMax;
            this.acc.y =  -val* 0.5;
        }

        else if (this.pos.y < this.yMin && this.acc.y < 0) {
            let val = this.yMin - this.pos.y;
            this.acc.y =  val * 0.5;
        }
        
        // this.acc.limit(this.maxForce);
        this.vel.limit(this.maxSpeed);
        
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
}