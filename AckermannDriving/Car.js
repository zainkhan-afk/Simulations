class Car{
	constructor(position, heading){
		this.position = position;
		this.linearVelocity = createVector(0, 0);
		this.linearAcceleration = createVector(0, 0);
		this.heading = heading;
		this.angularVelocity = 0;


		this.carWidth = 20;
		this.carLength = 40;
		this.wheelRadius = 6;

		this.carKinematics = new Kinematics(this.carWidth, this.carLength);

		this.carBaseBodyPts = [[- this.carLength/2, - this.carWidth/2], 
							   [  this.carLength/2, - this.carWidth/2], 
							   [  this.carLength/2,   this.carWidth/2], 
							   [- this.carLength/2,   this.carWidth/2]];
			
		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];

		this.steerAngle = 0;
		this.forwardDirectionVel = 0;
		this.maximumICCRadius = 100;

		this.carReactionAcceleration

		this.CalculateCarPts();
	}


	CalculateCarPts(){
		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];

		let wheelAngles = this.carKinematics.GetWheelAngles(this.steerAngle);
		for (let i = 0; i < this.carBaseBodyPts.length; i++){
			let x =  this.carBaseBodyPts[i][0]*cos(this.heading) - this.carBaseBodyPts[i][1]*sin(this.heading) + this.position.x;
			let y =  this.carBaseBodyPts[i][0]*sin(this.heading) + this.carBaseBodyPts[i][1]*cos(this.heading) + this.position.y;
			append(this.carTranformedBodyPts, [x, y]);


			let wheelOffset = 0;

			if ( i == 0){
				wheelOffset = wheelAngles[0];
			}
			else if ( i == 3){
				wheelOffset = wheelAngles[1];
			}

			let wheelX1 = x + this.wheelRadius*cos(this.heading - wheelOffset);
			let wheelY1 = y + this.wheelRadius*sin(this.heading - wheelOffset);

			let wheelX2 = x - this.wheelRadius*cos(this.heading - wheelOffset);
			let wheelY2 = y - this.wheelRadius*sin(this.heading - wheelOffset);

			// if (i == 0)
			// {
			// 	wheelX1 =  wheelX1*cos(wheelAngles[0]) + wheelY1*sin(wheelAngles[0]);
			// 	wheelY1 = -wheelX1*sin(wheelAngles[0]) + wheelY1*cos(wheelAngles[0]);
			// 	wheelX2 =  wheelX2*cos(wheelAngles[1]) + wheelY2*sin(wheelAngles[1]);
			// 	wheelY2 = -wheelX2*sin(wheelAngles[1]) + wheelY2*cos(wheelAngles[1]);
			// }

			append(this.carTranformedWheelLinePts, [wheelX1, wheelY1, wheelX2, wheelY2]);
		}
	}

	Step(){
		this.linearAcceleration = createVector(0, 0);
		this.linearVelocity = this.carKinematics.GetLinearVelociry(this.forwardDirectionVel, this.heading);
		this.angularVelocity = this.carKinematics.GetAngularVelociry(this.forwardDirectionVel, this.steerAngle);

		this.linearVelocity.add(this.linearAcceleration);

		this.position.add(this.linearVelocity);
		this.heading += this.angularVelocity;

		this.CalculateCarPts();
	}
}