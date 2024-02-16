class Boid{
	constructor(pos, rotation, minVel, maxVel){
		this.pos = pos;
		this.vel = createVector(0, 0);
		this.rotation = rotation

		this.minVel = minVel;
		this.maxVel = maxVel;
	}

	Update(deltaT){
		if(this.vel.mag() > this.maxVel){ 
			this.vel.setMag(this.maxVel);
		}
		if(this.vel.mag() < this.minVel){ 
			this.vel.setMag(this.minVel);
		}
		this.rotation = this.vel.heading();
		this.pos.add(p5.Vector.mult(this.vel, deltaT));
	}
}