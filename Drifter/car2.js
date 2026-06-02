class Car{
	constructor(pos, heading){
        this.pos = pos;
        this.heading = heading;

        this.velHeading = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        
        this.headingDot = 0;
        this.mass = 10;
        
        this.wheelAngle = 0;

        this.maxVel = 100;
        
        this.carLength = 70;
        this.carWheelbaseWidth = 40;
        
        this.tyreLength = 30;
        this.tyreWidth = 10;

        // this.muStatic = 0.9; // Values for rubber and asphalt from https://www.engineeringtoolbox.com/friction-coefficients-d_778.html
        // this.muKinetic = 0.7;

        this.muStatic = 1.9;
        this.muKinetic = 1.7;

        this.normalForce = this.mass*10;
        this.staticForce = this.muStatic*this.normalForce;
        this.kineticForce = this.muKinetic*this.normalForce;
        this.slipped = false;

        console.log("staticForce", this.staticForce, "kineticForce", this.kineticForce);
	}

    update(dt)
    {


        if (this.slipped){
            fill(255, 0, 0);
        }
        else{
            fill(0, 255, 0);
        }

        rect(10, 10, 100, 100);
        // stroke(0);
        // fill(0);
        // text(centrifugalForce, 20, 50);

        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));


            // this.velHeading.x = cos(this.heading)*this.engineVel;
            // this.velHeading.y = sin(this.heading)*this.engineVel;
        
        this.acc.set(0);

        this.headingDot = this.vel.mag()/this.carLength*tan(this.wheelAngle);
        // this.pos.add(p5.Vector.mult(this.velHeading, dt));
        this.heading += this.headingDot*dt;

        // if (abs(this.engineVel) > 0.5){this.engineVel *= 0.99;}
        // else {this.engineVel = 0;}

        if (this.pos.x < -100) { this.pos.x = width + 100;}
        else if (this.pos.x > width+100) { this.pos.x = - 100;}

        if (this.pos.y < -100) { this.pos.y = height + 100;}
        else if (this.pos.y > height+100) { this.pos.y = - 100;}
    }
}