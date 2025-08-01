class Moth{
	constructor(position){
        this.size = 50;
        this.pos = position;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 3;
        this.maxForce = 0.1;
	}

    step()
    {
        if (this.pos.x > windowWidth && this.acc.x > 0) {
            this.acc.mult([-2.0, 0.0]);
        }

        else if (this.pos.x < 0 && this.acc.x < 0) {
            this.acc.mult([-2.0, 0.0]);
        }

        // console.log(this.pos.y, windowHeight)
        if (this.pos.y > windowHeight && this.acc.y > 0) {
            this.acc.mult([0.0, -1.0]);
        }

        else if (this.pos.y < 0 && this.acc.y < 0) {
            this.acc.mult([0.0, -1.0]);
        }
        
        this.acc.limit(this.maxForce);
        this.vel.limit(this.maxSpeed);
        
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
}