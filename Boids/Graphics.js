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
		// for (let i = 0; i < boids.length; i++){
		// 	stroke(isDark ? 50 : 180);
		// 	beginShape();
		// 	for(let j = 0; j < boids[i].tail.length; j++){
		// 		vertex(boids[i].tail[j].x, boids[i].tail[j].y);
		// 	}
		// 	endShape();
		// }

		stroke(isDark ? 255 : 0);
		for (let  i = 0; i<boids.length; i++){
			
			push();
			translate(boids[i].pos);
			rotate(boids[i].rotation);
			
			
			triangle(this.triangleP1.x, this.triangleP1.y, 
				this.triangleP2.x, this.triangleP2.y, 
				this.triangleP3.x, this.triangleP3.y);
				pop();
		}
	}
}