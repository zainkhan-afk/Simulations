class Moth{
	constructor(position){
        this.size = 50;
        this.pos = position;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.gravity = createVector(0, 10);

        this.heading = 0;
        this.desiredHeading = 0;
        
        this.maxSpeed = 10;
        this.flappingFrequency = 2;
        this.maxForce = 20;
        this.boundaryPadding = 100;
        this.boundaryCrossingMultiplier = 0.1;
        // this.animationPhase = -1;
        this.calcualteCorners();
        this.frame = 0;
	}

    calcualteCorners(){
        this.xMin = this.boundaryPadding;
        this.xMax = windowWidth - this.boundaryPadding;
        this.yMin = this.boundaryPadding;
        this.yMax = windowHeight - this.boundaryPadding;
    }

    adjust(lighPos){
        let diff = p5.Vector.sub(lightPos, this.pos);
        let target = diff.heading() + HALF_PI;
        while (target > PI)  target -= TWO_PI;
        while (target < -PI) target += TWO_PI;

        target += random(-0.3, 0.3);
        this.desiredHeading = target;
    }

    flap(){
        if (this.frame % this.flappingFrequency == 0){
            let flapAcc = createVector(0, this.maxForce).rotate(PI + this.heading);
            // flapAcc.x = this.maxForce*cos(this.heading + HALF_PI)
            // flapAcc.y = this.maxForce*sin(this.heading + HALF_PI)
            this.acc.add(flapAcc);
        }
    }

    step(dt)
    {
        this.frame += 1;
        this.flap();
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(50);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(this.gravity);

        let angleDiff = this.desiredHeading - this.heading;
        while (angleDiff > PI)  angleDiff -= TWO_PI;
        while (angleDiff < -PI) angleDiff += TWO_PI;
        
        this.heading += angleDiff * 0.15;

        if (this.heading > PI) {
            this.heading -= TWO_PI;
        } else if (this.heading < -PI) {
            this.heading += TWO_PI;
        }
    }
}