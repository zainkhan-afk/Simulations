class Graphics{
	constructor(){
		this.triangleP1 = createVector( 10, 0);
		this.triangleP2 = createVector(-2,  3);
		this.triangleP3 = createVector(-2, -3);
	}

	RotatePoint(pt, angle){
		let ptRotated = pt.copy();
		ptRotated.rotate(angle);
		// ptRotated.x = ptRotated.x*cos(angle);
		// ptRotated.y = ptRotated.y*sin(angle);

		return ptRotated;
	}

	Draw(boids){
		noFill();
		stroke(255);
		for (let  i = 0; i<boids.length; i++){
			let p1 = this.RotatePoint(this.triangleP1, boids[i].rotation);
			let p2 = this.RotatePoint(this.triangleP2, boids[i].rotation);
			let p3 = this.RotatePoint(this.triangleP3, boids[i].rotation);

			p1.add(boids[i].pos);
			p2.add(boids[i].pos);
			p3.add(boids[i].pos);

			triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
		}
	}
}