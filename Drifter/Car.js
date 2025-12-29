class Car{
	constructor(position, theta){
		this.position = position;
		this.linearVelocity = createVector(0, 0);
		this.linearAcceleration = createVector(0, 0);
		this.theta = theta;
		console.log("Theta", this.theta);
		this.angularVelocity = 0;
		this.angularAcceleration = 0;
		
		this.maxVelocity = 10;
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

		const centripetalForce = p5.Vector.fromAngle(this.theta - PI / 2, fCent);
		
		return centripetalForce;

		// const velSq = p5.Vector.mult(this.linearVelocity, this.linearVelocity);
		// const fCent = p5.Vector.fromAngle(velSq.heading() + PI / 2, velSq.mag());
		// return fCent.mult(this.mass/turnRadius);
	}

	Step(dt){
		// this.linearAcceleration = p5.Vector.fromAngle(this.theta, this.forwardDirectionForce);
		// this.linearAcceleration.mult(1/this.mass);
		// this.angularAcceleration = this.carKinematics.GetAngularAcceleration(this.forwardDirectionForce, car.mass, this.steerAngle);
		// print(this.angularAcceleration);
		
		// DEBUG DRAW
		push();
		translate(this.position.x, this.position.y);
		// rotwate(this.theta);
		// line(0, 0, this.linearAcceleration.x, this.linearAcceleration.y);
		// this.linearVelocity.add(p5.Vector.mult(this.linearAcceleration, dt));
		this.linearVelocity.limit(this.maxVelocity);
		line(0, 0, this.linearVelocity.x, this.linearVelocity.y);
		pop();

		
		
		// this.linearVelocity = this.carKinematics.GetLinearVelociry(this.forwardDirectionForce, this.theta);
		this.angularVelocity = this.carKinematics.GetAngularVelociry2(this.linearVelocity, this.theta, this.steerAngle);
		
		
		let centF = this.CalculateCentripetalForce();
		if (centF.mag() > 5){
			centF.limit(5);
			print(centF);
			centF.mult(1/this.mass);
			this.linearAcceleration.add(p5.Vector.mult(centF, dt));

		}

		this.position.add(p5.Vector.mult(this.linearVelocity, dt));
		
		// this.angularVelocity += this.angularAcceleration*dt;
		this.theta += this.angularVelocity*dt;
		
		// this.linearVelocity.mult(0.99);
		this.linearAcceleration.set(0);
		this.angularAcceleration = 0;


		this.CalculateCarPts();
	}
}