class Particle{
	constructor(pos)
	{
		this.pos = pos;
		this.vel = createVector(0, 0);
		this.radius = 10;
	}

	IsPointOverlap(other)
	{
		let dist = sqrt((this.pos.x - other.pos.x)*(this.pos.x - other.pos.x) + (this.pos.y - other.pos.y)*(this.pos.y - other.pos.y));

		if (dist <= this.radius)
		{
			return true;
		}
		return false;
	}
}