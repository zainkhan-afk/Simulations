class Car{
	constructor(pos, heading){
        this.pos = pos;
        this.heading = heading;

        this.velHeading = createVector(0, 0);
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
        let linearForce = this.acc*this.mass;
        let centrifugalForce = 0;
        this.engineVel += this.acc*dt;
        if (abs(this.engineVel) > this.maxVel) { this.engineVel = this.engineVel > 0 ? this.maxVel : -this.maxVel; }
        if (abs(this.wheelAngle)  > 0.1) {
            let turningRadius = abs(this.carLength*tan((HALF_PI - this.wheelAngle)));
            // console.log("turningRadius", turningRadius);
            centrifugalForce = (this.mass*(this.engineVel*this.engineVel)) / turningRadius;
            // console.log("centrifugalForce", centrifugalForce);
        }
        
        if (!this.slipped){
            if (abs(centrifugalForce) > this.staticForce){
                this.slipped = true;
            }
        }
        else{
            if (abs(centrifugalForce) < this.kineticForce){
                this.slipped = false;
            }
        }

        if (this.slipped){
            fill(255, 0, 0);
        }
        else{
            fill(0, 255, 0);
        }

        rect(10, 10, 100, 100);
        stroke(0);
        fill(0);
        text(centrifugalForce, 20, 50);

        if (this.slipped){
            // this.vel.add(p5.Vector.fromAngle(this.heading, this.engineVel));
            // this.vel.limit(this.maxVel);

            // let velNorm = p5.Vector.normalize(this.vel);
            // let headingNorm = p5.Vector.fromAngle(this.heading);
            // let dotVal = headingNorm.dot(velNorm);
            
            this.velHeading.x = cos(this.heading)*this.engineVel;
            this.velHeading.y = sin(this.heading)*this.engineVel;

            this.velHeading.x += 
            this.velHeading.y += 

            // console.log("dotVal", dotVal);
            // console.log("this.velHeading", this.velHeading.heading(), "-", "this.heading", this.heading);
            // console.log("this.vel", this.vel);

        }
        else{
            this.velHeading.x = cos(this.heading)*this.engineVel;
            this.velHeading.y = sin(this.heading)*this.engineVel;
        }
        
        this.acc = 0;

        this.headingDot = this.engineVel/this.carLength*tan(this.wheelAngle);
        this.pos.add(p5.Vector.mult(this.velHeading, dt));
        this.heading += this.headingDot*dt;

        // if (abs(this.engineVel) > 0.5){this.engineVel *= 0.99;}
        // else {this.engineVel = 0;}

        if (this.pos.x < -100) { this.pos.x = width + 100;}
        else if (this.pos.x > width+100) { this.pos.x = - 100;}

        if (this.pos.y < -100) { this.pos.y = height + 100;}
        else if (this.pos.y > height+100) { this.pos.y = - 100;}
    }
}