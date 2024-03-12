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

		this.wheelTrailSize = 100;

		this.carKinematics = new Kinematics(this.carWidth, this.carLength);

		// this.carSprite = loadImage('sprites/car_sprite.png');


		this.carBaseBodyPts = [[- this.carLength/2, - this.carWidth/2], 
							   [  this.carLength/2, - this.carWidth/2], 
							   [  this.carLength/2,   this.carWidth/2], 
							   [- this.carLength/2,   this.carWidth/2]];
			
		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];
		this.wheelTrail = [[],[],[],[]];

		this.steerAngle = 0;
		this.forwardDirectionVel = 0;
		this.maximumICCRadius = 100;

		this.carReactionAcceleration

		this.CalculateCarPts();
	}


	RemoveOldTyreTracks(){
		for (let i = 0; i < this.wheelTrail.length; i++){
			for (let j = 0; j < this.wheelTrail[i].length; j++)
			{
				if (j > this.wheelTrailSize)
				{
					this.wheelTrail[i].splice(0, this.wheelTrail[i].length - this.wheelTrailSize)
				}
			}
		}
	}

	CalculateCarPts(){
		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];

		let wheelAngles = this.carKinematics.GetWheelAngles(this.steerAngle);
		for (let i = 0; i < this.carBaseBodyPts.length; i++){
			let x =  this.carBaseBodyPts[i][0]*cos(this.heading) - this.carBaseBodyPts[i][1]*sin(this.heading) + this.position.x;
			let y =  this.carBaseBodyPts[i][0]*sin(this.heading) + this.carBaseBodyPts[i][1]*cos(this.heading) + this.position.y;
			append(this.carTranformedBodyPts, [x, y]);
			append(this.wheelTrail[i], [x, y]);


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

			append(this.carTranformedWheelLinePts, [wheelX1, wheelY1, wheelX2, wheelY2]);
		}

		this.RemoveOldTyreTracks();
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