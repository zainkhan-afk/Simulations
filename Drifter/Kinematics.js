class Kinematics{
	constructor(carWidth, carLength){
		this.carWidth = carWidth;
		this.carLength = carLength;
	}

	GetWheelAngles(steerAngle){
		let innerWheelAngle = atan2((2*this.carLength*sin(steerAngle)), (2*this.carLength*cos(steerAngle) - this.carWidth*sin(steerAngle)));
		let outerWheelAngle = atan2((2*this.carLength*sin(steerAngle)), (2*this.carLength*cos(steerAngle) + this.carWidth*sin(steerAngle)));

		let wheelAngles = [outerWheelAngle, innerWheelAngle];

		return wheelAngles;
	}

	GetLinearVelociry(v, heading){
		let veclocity = createVector(v*cos(heading), v*sin(heading));
		return veclocity;
	}

	GetAngularVelociry(v, steerAngle){
		let angularVelocity = v / this.carLength * tan(steerAngle);
		return angularVelocity;
	}

	GetAngularVelociry2(v, heading, steerAngle){
		let turningRadius = this.carLength * tan(steerAngle);

		let r = createVector(turningRadius*cos(heading-PI/2), turningRadius*sin(heading-PI/2));
		
		let w = (r.x*v.y - r.y*v.x) / (r.x*r.x  + r.y*r.y);

		if (!w){return 0;}

		return w;
	}

	GetAngularAcceleration(f, m, steerAngle){
		if (abs(steerAngle) < 0.01) {return 0; }
		let turningRadius = this.carLength * tan(steerAngle);
		let w_dot = (f / m) / turningRadius;
		return w_dot; 
	}
}