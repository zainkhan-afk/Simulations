class Particle{
	constructor(pos, vel){
		this.pos = pos;
		this.vel = vel;
		this.tailLen = 50;
		this.tail = []
		this.c = color(random(100, 255), random(100, 255), random(100, 255));
	}
	
	Update(deltaT){
		append(this.tail, this.pos.copy());
		
		if (this.tail.length>this.tailLen)
		{
			reverse(this.tail);
			this.tail.pop();
			reverse(this.tail);
		}
		
		this.pos.add(this.vel.mult(deltaT));
	}
}