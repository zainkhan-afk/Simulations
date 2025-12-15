class Car{
	constructor(position, heading){
		this.position = position;
		this.linearVelocity = createVector(0, 0);
		this.linearAcceleration = createVector(0, 0);
		this.heading = heading;
		this.angularVelocity = 0;
		this.maxVelocity = 5;
		this.mass = 10;


		this.carWidth = 40;
		this.carLength = 60;
		this.wheelRadius = 6;

		this.wheelTrailSize = 100;

		this.carKinematics = new Kinematics(this.carWidth, this.carLength);

		this.carSprite = loadImage('https://raw.githubusercontent.com/zainkhan-afk/Simulations/main/AckermannDriving/sprites/small_car_sprite.png');

		this.carBaseBodyPts = [[- this.carLength/2, - this.carWidth/2], 
							   [  this.carLength/2, - this.carWidth/2], 
							   [  this.carLength/2,   this.carWidth/2], 
							   [- this.carLength/2,   this.carWidth/2]];
			
		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];
		this.wheelTrail = [[],[],[],[]];

		this.steerAngle = 0;
		this.forwardDirectionForce = 0;
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

		this.wheelAngles = this.carKinematics.GetWheelAngles(this.steerAngle);
		for (let i = 0; i < this.carBaseBodyPts.length; i++){
			let x =  this.carBaseBodyPts[i][0]*cos(this.heading) - this.carBaseBodyPts[i][1]*sin(this.heading) + this.position.x;
			let y =  this.carBaseBodyPts[i][0]*sin(this.heading) + this.carBaseBodyPts[i][1]*cos(this.heading) + this.position.y;
			append(this.carTranformedBodyPts, [x, y]);
			append(this.wheelTrail[i], [x, y]);
		}

		this.RemoveOldTyreTracks();
	}

	CalculateCentripetalForce(){
		if (abs(this.steerAngle) < 0.01) { return createVector(0, 0); }
		const turnRadius = tan(this.steerAngle)*this.carLength;
		const vel = this.linearVelocity.mag();
		const fCent = vel*vel * this.mass / turnRadius;

		const centripetalForce = p5.Vector.fromAngle(this.heading - PI / 2, fCent);

		return centripetalForce;

		// const velSq = p5.Vector.mult(this.linearVelocity, this.linearVelocity);
		// const fCent = p5.Vector.fromAngle(velSq.heading() + PI / 2, velSq.mag());
		// return fCent.mult(this.mass/turnRadius);
	}

	Step(){
		this.linearAcceleration = p5.Vector.fromAngle(this.heading, this.forwardDirectionForce);
		this.linearAcceleration.mult(1/this.mass);
		const centripetalForce = this.CalculateCentripetalForce();

		// rotate(this.heading);
		
		if (centripetalForce.mag() < 5) {centripetalForce.set(0);}
		else {
			print(int(this.linearAcceleration.heading() * 180 / PI) - int(centripetalForce.heading() * 180 / PI), int(this.linearAcceleration.heading() * 180 / PI), int(centripetalForce.heading() * 180 / PI));
			// centripetalForce.normalize();
		}
		centripetalForce.limit(7);
		centripetalForce.mult(1 / this.mass);
		strokeWeight(2);
		push();
		translate(this.position.x, this.position.y);
		stroke(255, 0, 0);
		line(0, 0, centripetalForce.x*25, centripetalForce.y*25);
		stroke(0, 255, 0);
		line(0, 0, this.linearAcceleration.x*25, this.linearAcceleration.y*25);
		this.linearAcceleration.add(centripetalForce);
		stroke(0, 0, 255);
		line(0, 0, this.linearAcceleration.x*25, this.linearAcceleration.y*25);
		stroke(0, 255, 255);
		line(0, 0, this.linearVelocity.x*25, this.linearVelocity.y*25);
		pop();
		// print(this.linearAcceleration);
		this.linearVelocity.add(this.linearAcceleration);
		this.linearVelocity.limit(this.maxVelocity);
		
		this.angularVelocity = this.carKinematics.GetAngularVelociry(this.linearVelocity.mag(), -this.steerAngle);
		
		this.linearAcceleration.set(0);

		this.position.add(this.linearVelocity);
		this.heading += this.angularVelocity;

		this.linearVelocity.mult(0.9);


		this.CalculateCarPts();
	}
}