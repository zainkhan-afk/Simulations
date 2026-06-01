class Car{
	constructor(pos, heading){
        this.pos = pos;
        this.heading = heading;

        this.vel = createVector(0, 0);
        this.headingDot = 0;
        this.mass = 10;

        this.acc = 0;
        this.engineVel = 0;

        this.wheelAngle = 0;

        this.maxVel = 100;
        
        this.carLength = 70;
        this.carWheelbaseWidth = 40;
        
        this.tyreLength = 30;
        this.tyreWidth = 10;

        this.muStatic = 0.1;
        this.muKinetic = this.muStatic - 0.9*this.muStatic;

        this.normalForce = this.mass*10;
        this.staticForce = this.muStatic*this.normalForce;
        this.kineticForce = this.muKinetic*this.normalForce;

        console.log("staticForce", this.staticForce, "kineticForce", this.kineticForce);
	}

    update(dt)
    {
        this.engineVel += this.acc*dt;
        if (abs(this.engineVel) > this.maxVel) { this.engineVel = this.engineVel > 0 ? this.maxVel : -this.maxVel; }
        this.vel.x = cos(this.heading)*this.engineVel;
        this.vel.y = sin(this.heading)*this.engineVel;
        
        this.acc = 0;

        this.headingDot = this.engineVel/this.carLength*tan(this.wheelAngle);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.heading += this.headingDot*dt;

        if (abs(this.engineVel) > 0.5){this.engineVel *= 0.99;}
        else {this.engineVel = 0;}

        if (this.pos.x < -100) { this.pos.x = width + 100;}
        else if (this.pos.x > width+100) { this.pos.x = - 100;}

        if (this.pos.y < -100) { this.pos.y = height + 100;}
        else if (this.pos.y > height+100) { this.pos.y = - 100;}
    }
}