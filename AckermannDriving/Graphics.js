class Graphics{
	constructor(){
	}

	DrawCar(car){
		imageMode(CENTER);
		image(this.carSprite, car.position.x, car.position.y);
		// Drawing main car body
		strokeWeight(1);
		stroke(255, 0, 0);
		noFill();
		beginShape();
		for (let i = 0; i < car.carTranformedBodyPts.length; i++){
			vertex(car.carTranformedBodyPts[i][0], car.carTranformedBodyPts[i][1]);
		}
		endShape(CLOSE);

		// Drawing Wheels
		strokeWeight(3);
		stroke(0, 255, 0);
		for (let i = 0; i < car.carTranformedWheelLinePts.length; i++){
			let x1 = car.carTranformedWheelLinePts[i][0];
			let y1 = car.carTranformedWheelLinePts[i][1];
			let x2 = car.carTranformedWheelLinePts[i][2];
			let y2 = car.carTranformedWheelLinePts[i][3];

			line(x1, y1, x2, y2);
		}

		// Drawing wheel trails
		strokeWeight(1);
		stroke(0);
		noFill();
		for (let i = 0; i < car.wheelTrail.length; i++){
			beginShape();
			for (let j = 0; j < car.wheelTrail[i].length; j++)
			{
				vertex(car.wheelTrail[i][j][0], car.wheelTrail[i][j][1]);
			}
			endShape();
		}
	}

	Draw(car){
		this.DrawCar(car);
	}
}