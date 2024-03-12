class Car{
	constructor(position, heading){
		this.position = position;
		this.linearVelocity = createVector(0, 0);
		this.heading = heading;
		this.angularVelocity = 0;


		this.carWidth = 20;
		this.carLength = 40;
		this.wheelRadius = 6;

		let carKinematics = Kinematics(this.carWidth, this.carLength);

		this.carBaseBodyPts = [[- this.carWidth/2, - this.carLength/2], 
							   [  this.carWidth/2, - this.carLength/2], 
							   [  this.carWidth/2,   this.carLength/2], 
							   [- this.carWidth/2,   this.carLength/2]];
			
		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];

		this.steeringAngle = 0;
		this.maximumICCRadius = 100;

		for (let i = 0; i < this.carBaseBodyPts.length; i++){
			let x =  this.carBaseBodyPts[i][0]*cos(this.heading) + this.carBaseBodyPts[i][1]*sin(this.heading) + this.position.x;
			let y = -this.carBaseBodyPts[i][0]*sin(this.heading) + this.carBaseBodyPts[i][1]*cos(this.heading) + this.position.y;
			append(this.carTranformedBodyPts, [x, y]);

			let wheelX1 = x;
			let wheelX2 = x;

			let wheelY1 = y - this.wheelRadius;
			let wheelY2 = y + this.wheelRadius;
			append(this.carTranformedWheelLinePts, [wheelX1, wheelY1, wheelX2, wheelY2]);
		}
	}

	Step(){
		this.position.add(this.linearVelocity);
		this.heading += this.angularVelocity;

		this.carTranformedBodyPts = [];
		this.carTranformedWheelLinePts = [];
		for (let i = 0; i < this.carBaseBodyPts.length; i++){
			let x =  this.carBaseBodyPts[i][0]*cos(this.heading) + this.carBaseBodyPts[i][1]*sin(this.heading) + this.position.x;
			let y = -this.carBaseBodyPts[i][0]*sin(this.heading) + this.carBaseBodyPts[i][1]*cos(this.heading) + this.position.y;
			append(this.carTranformedBodyPts, [x, y]);

			let wheelX1 = x;
			let wheelX2 = x;

			let wheelY1 = y - this.wheelRadius;
			let wheelY2 = y + this.wheelRadius;
			append(this.carTranformedWheelLinePts, [wheelX1, wheelY1, wheelX2, wheelY2]);
		}
	}
}