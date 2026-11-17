class Boid{
	constructor(pos, rotation, minVel, maxVel){
		this.pos = pos;
		this.vel = createVector(0, 0);
		this.rotation = rotation

		this.minVel = minVel;
		this.maxVel = maxVel;

		this.tail = [];
	}

	Update(deltaT){
		if(this.vel.mag() > this.maxVel){ 
			this.vel.setMag(this.maxVel);
		}
		if(this.vel.mag() < this.minVel){ 
			this.vel.setMag(this.minVel);
		}
		// if (frameCtr%3 == 0){this.tail.push(this.pos.copy());}
		// if (this.tail.length > 25){this.tail.shift();}
		this.rotation = this.vel.heading();
		this.pos.add(p5.Vector.mult(this.vel, deltaT));
	}
}