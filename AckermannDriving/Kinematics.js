class Kinematics{
	constructor(carWidth, carLength){
		this.carWidth = carWidth;
		this.carLength = carLength;
	}

	GetWheelAngles(steerAngle){
		let innerWheelAngle = atan2((2*this.carLength*sin(steerAngle)) / (2*this.carLength*cos(steerAngle) - this.carWidth*sin(steerAngle)));
		let outerWheelAngle = atan2((2*this.carLength*sin(steerAngle)) / (2*this.carLength*cos(steerAngle) + this.carWidth*sin(steerAngle)));

		let wheelAngles = [innerWheelAngle, outerWheelAngle];

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
}