class Planet 
{
  constructor(pos, vel, acc, radius, mass) 
	{
		this.pos = pos;
		this.vel = vel;
		this.acc = acc;
    this.radius = radius;
		this.mass = mass;
		this.maxVel = createVector(10, 10);
		this.tailLen = 300;
		this.tail = []
		this.c = color(random(100, 255), random(100, 255), random(100, 255));
  }
	
	Update()
	{
		append(this.tail, this.pos.copy());
		// print(this.tail);
		if (this.tail.length>this.tailLen)
		{
			reverse(this.tail);
			this.tail.pop();
			reverse(this.tail);
		}
		
		this.pos.add(this.vel);
		this.acc = createVector(0, 0);
	}
}