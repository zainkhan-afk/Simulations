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


	// Step(boids, deltaT){
	// 	for (let  i = 0; i<boids.length; i++){

	// 		let boid1 = boids[i];
	// 		let neighboringBoids = 0;
	// 		let vel = createVector(0, 0);
	// 		let distInProtectedRange = createVector(0, 0);
	// 		let alignmentVel = createVector(0, 0);
	// 		let avgBoidPos = createVector(0, 0);
			

	// 		for (let  j = 0; j<boids.length; j++){
	// 			let boid2 = boids[j];
				
	// 			if (i == j){
	// 				continue;
	// 			}

	// 			let boidDiff = p5.Vector.sub(boid1.pos, boid2.pos);

	// 			if (boidDiff.mag() < this.visualRange){
	// 				// Seperation
	// 				if(boidDiff.mag() < this.protectedRadius){
	// 					distInProtectedRange.add(boidDiff);
	// 				}
	// 				// Alignment
	// 				else{
	// 					alignmentVel.add(boid2.vel);
	// 					avgBoidPos.add(boid2.pos);
	// 					neighboringBoids += 1;
	// 				}
	// 			}

	// 		}

	// 		if (neighboringBoids>0){
	// 			alignmentVel.mult(1/neighboringBoids);
	// 			alignmentVel.sub(boid1.vel);


	// 			avgBoidPos.mult(1/neighboringBoids);
	// 			avgBoidPos.sub(boid1.pos);
	// 		}

	// 		let turnVel = this.AvoidCorner(boid1);
			

	// 		distInProtectedRange.mult(this.avoidFactor);
	// 		alignmentVel.mult(this.alignmentFactor);
	// 		avgBoidPos.mult(this.centeringFactor);
	// 		turnVel.mult(this.turnFactor);

	// 		boid1.vel.add(distInProtectedRange);
	// 		boid1.vel.add(alignmentVel);
	// 		boid1.vel.add(avgBoidPos);
	// 		boid1.vel.add(turnVel);

	// 		boid1.Update(deltaT);
	// 	}
	// }

	Step(boids, mouseVec, deltaT){
		for (let  i = 0; i<boids.length; i++){
			let boid1 = boids[i];
			if (frameCtr%2 == i%2){boid1.Update(deltaT);continue;}

			let neighborsInVisualRange = 0;
			let closeD = createVector(0, 0);
			let velAvg = createVector(0, 0);
			let posAvg = createVector(0, 0);
			for (let  j = 0; j<boids.length; j++){
				if (i == j) {continue;}

				let boid2 = boids[j];
				let boidDiff = p5.Vector.sub(boid1.pos, boid2.pos);
				let boidDist = boidDiff.mag();
				if (boidDist < this.visualRange){
					//  SEPARATION
					if (boidDist < this.protectedRadius){
						closeD.add(boidDiff)
					}

					// ALIGNMENT
					velAvg.add(boid2.vel);
					neighborsInVisualRange += 1;

					// COHESION
					posAvg.add(boid2.pos);

				}
			}

			
			let turnVel = this.AvoidCorner(boid1);
			turnVel.mult(this.turnFactor);
			
			closeD.mult(this.avoidFactor);
			if (neighborsInVisualRange > 0) {
				velAvg.mult(1/neighborsInVisualRange);
				posAvg.mult(1/neighborsInVisualRange);
			}
			velAvg.sub(boid1.vel);
			velAvg.mult(this.alignmentFactor);
			posAvg.sub(boid1.pos);
			posAvg.mult(this.centeringFactor);
			let predatorDiff = p5.Vector.sub(boid1.pos, mouseVec);
			if (predatorDiff.mag() < this.visualRange){
				predatorDiff.mult(2 / (predatorDiff.mag()+1));
				boid1.vel.add(predatorDiff);
			}
			
			boid1.vel.add(closeD);
			boid1.vel.add(velAvg);
			boid1.vel.add(turnVel);
			boid1.vel.add(posAvg);

			boid1.Update(deltaT);
		}
	}
}