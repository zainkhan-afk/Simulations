class Graphics{
	constructor(){
	}

	DrawCar(car){
		// Drawing main car body using lines
		// noFill();
		
		push();
		
		strokeWeight(3);
		stroke(150);
		fill(150);
		translate(car.position.x, car.position.y);
		rotate(car.theta);
		beginShape();
		for (let i = 0; i < car.carBaseBodyPts.length; i++){
			vertex(car.carBaseBodyPts[i][0], car.carBaseBodyPts[i][1]);
		}
		endShape(CLOSE);
		
		for (let i = 0; i < car.carBaseBodyPts.length; i++){
			push();
			translate(car.carBaseBodyPts[i][0], car.carBaseBodyPts[i][1]);
			if (i == 1){
				rotate(car.wheelAngles[0]);
			}
			if (i == 2){
				rotate(car.wheelAngles[1]);
			}

			stroke(0);
			fill(0);
			rectMode(CENTER);
			rect(0, 0, 20, 6);
			pop();
		}

		pop();

		// Drawing Wheels
		// strokeWeight(6);
		// stroke(0);
		// for (let i = 0; i < car.carTranformedWheelLinePts.length; i++){
		// 	let x1 = car.carTranformedWheelLinePts[i][0];
		// 	let y1 = car.carTranformedWheelLinePts[i][1];
		// 	let x2 = car.carTranformedWheelLinePts[i][2];
		// 	let y2 = car.carTranformedWheelLinePts[i][3];

		// 	line(x1, y1, x2, y2);
		// }

		
		// Drawing wheel trails
		// strokeWeight(2);
		// stroke(100);
		// noFill();
		// for (let i = 0; i < car.wheelTrail.length; i++){
		// 	beginShape();
		// 	for (let j = 0; j < car.wheelTrail[i].length; j++)
		// 	{
		// 		vertex(car.wheelTrail[i][j][0], car.wheelTrail[i][j][1]);
		// 	}
		// 	endShape();
		// }

		// Drawing the car wheels
		// stroke(0);
		// fill(0);
		// rectMode(CENTER);
		// for (let i = 0; i < car.carTranformedBodyPts.length; i++){
		// 	push();
		// 	translate(car.position.x, car.position.x);
		// 	rotate(car.theta);
		// 	let wheelOffset = 0;

		// 	if ( i == 0){
		// 		wheelOffset = car.wheelAngles[0];
		// 	}
		// 	else if ( i == 3){
		// 		wheelOffset = car.wheelAngles[1];
		// 	}

		// 	// push();
		// 	// translate(car.carBaseBodyPts[i][0], car.carBaseBodyPts[i][1]);
		// 	// rotate(wheelOffset);
		// 	rect(0, 0, 200, 60);
		// 	// rect(car.carBaseBodyPts[i][0], car.carBaseBodyPts[i][1], 200, 60);
		// 	// pop();
		// 	pop();
		// }

		
		// Drawing the main car body sprite
		// car.carSprite.resize(100, 50);
		// push();
		// translate(car.position.x, car.position.y);
		// rotate(car.heading + PI);
		// imageMode(CENTER);
		// image(car.carSprite, 0, 0);
		// pop();
		
	}

	Draw(car){
		this.DrawCar(car);
	}
}