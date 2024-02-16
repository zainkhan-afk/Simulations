class Logic{
	constructor(protectedRadius, visualRange, borderMargin, avoidFactor, alignmentFactor, centeringFactor, turnFactor){
		this.protectedRadius = protectedRadius;
		this.visualRange = visualRange;
		this.borderMargin = borderMargin;
		this.avoidFactor = avoidFactor;
		this.alignmentFactor = alignmentFactor;
		this.centeringFactor = centeringFactor;
		this.turnFactor = turnFactor;

	}

	AvoidCorner(boid){
		let turnVel = createVector(0, 0);
		if (boid.pos.x>windowWidth - this.borderMargin){
			let d = boid.pos.x - (windowWidth - this.borderMargin);
			turnVel.x += -1*d;
		}

		else if( boid.pos.x<this.borderMargin){
			let d = this.borderMargin - boid.pos.x;
			turnVel.x += d;
		}


		if (boid.pos.y>windowHeight - this.borderMargin){
			let d = boid.pos.y - (windowHeight - this.borderMargin);
			turnVel.y += -1*d;
		}

		else if (boid.pos.y<this.borderMargin){
			let d = this.borderMargin - boid.pos.y;
			turnVel.y += d;
		}

		return turnVel
	}


	Step(boids, deltaT){
		for (let  i = 0; i<boids.length; i++){

			let boid1 = boids[i];
			let neighboringBoids = 0;
			let vel = createVector(0, 0);
			let distInProtectedRange = createVector(0, 0);
			let alignmentVel = createVector(0, 0);
			let avgBoidPos = createVector(0, 0);
			

			for (let  j = 0; j<boids.length; j++){
				let boid2 = boids[j];
				
				if (i == j){
					continue;
				}

				let boidDiff = p5.Vector.sub(boid1.pos, boid2.pos);

				if (boidDiff.mag() < this.visualRange){
					// Seperation
					if(boidDiff.mag() < this.protectedRadius){
						distInProtectedRange.add(boidDiff);
					}
					// Alignment
					else{
						alignmentVel.add(boid2.vel);
						avgBoidPos.add(boid2.pos);
						neighboringBoids += 1;
					}
				}

			}


			// console.log("\n");
			// console.log(avgBoidPos);
			if (neighboringBoids>0){
				alignmentVel.mult(1/neighboringBoids);
				alignmentVel.sub(boid1.vel);


				avgBoidPos.mult(1/neighboringBoids);
				avgBoidPos.sub(boid1.pos);
			}

			let turnVel = this.AvoidCorner(boid1);
			

			distInProtectedRange.mult(this.avoidFactor);
			alignmentVel.mult(this.alignmentFactor);
			avgBoidPos.mult(this.centeringFactor);
			turnVel.mult(this.turnFactor);

			// console.log(avgBoidPos);

			boid1.vel.add(distInProtectedRange);
			boid1.vel.add(alignmentVel);
			boid1.vel.add(avgBoidPos);
			boid1.vel.add(turnVel);

			boid1.Update(deltaT);
		}
	}
}