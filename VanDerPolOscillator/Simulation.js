class Simulation{
	constructor(){
		
	}
	
	
	DrawPhasePlot(rows, cols, div, mu){
		stroke(100);
		for (let r = -rows/2; r < rows/2; r++){
			for (let c = -cols/2; c < cols/2; c++){
				let x = c / (cols/10);
				let y = r / (rows/10);
				let v = createVector(mu*(x - 1 / 3*x*x*x - y), x / mu);
				if (v.mag() > div){
					v.setMag(div);
				}
				push();
				translate(c*div, r*div)
				// fill(0,0,255);
				// rect(0, 0, div, div);
				line(0, 0, v.x, v.y);
				pop();
			}
		}
	}
	
	Step(particles, rows, cols, div, mu, deltaT){
		this.DrawPhasePlot(rows, cols, div, mu);
		for (let i = 0; i<particles.length; i++){
			let p = particles[i];
			noStroke();
			fill(p.c);
			circle(p.pos.x, p.pos.y, 3);
			
			strokeWeight(0.8);
			stroke(p.c);
			noFill();
			beginShape();
			for (let j = 0; j < p.tail.length; j++)
			{
				vertex(p.tail[j].x, p.tail[j].y);
			}
			endShape();

			let x = (p.pos.x / div) / (cols/10);
			let y = (p.pos.y / div) / (rows/10);

			p.vel.x = mu*(x - 1 / 3*x*x*x - y);
			p.vel.y = x / mu; 
			if (p.vel.mag() > div){
				p.vel.setMag(div);
			}
			p.Update(deltaT);
		}
	}
}