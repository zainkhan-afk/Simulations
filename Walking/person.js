class Person{
	constructor(pos){
                this.pos = pos;
                this.angle = random(0, 2*PI);
                this.vel = p5.Vector.fromAngle(this.angle);
                this.color = color(200, 200, 0);
                
                this.step = 0;
                this.numStepPoints = random(3, 5);
                this.stepDir = 1;
                this.stepSize = random(5, 10);

                this.velMag = (2 * self.stepSize) / (2 * self.numStepPoints + 1);
                this.vel.setMag(self.velMag);
                
                this.footPropelling = 0;
                
                this.foot1 = 0;
                this.foot2 = 0;                
                this.foot1Prev = 0;
                this.foot2Prev = 0;

                this.stepped = false;
                
                this.UpdateSteps();
	}

        UpdateSteps() {
                this.foot1Prev = this.foot1;
                this.foot2Prev = this.foot2;

                this.foot1 = this.stepSize * this.step / this.numStepPoints;
                this.foot2 = (this.foot1 * -1);

                if (this.footPropelling == 1){
                        console.log("Foot1", this.foot1Prev - this.foot1, this.vel.mag());
                }

                if (this.pos.x < 0 || this.pos.x > windowWidth) { this.vel.x *= -1; }
                if (this.pos.y < 0 || this.pos.y > windowHeight) { this.vel.y *= -1; }
        }

        Update(dt)
        {
                if (this.stepped) { this.stepped = false; }
                this.pos.add(p5.Vector.mult(this.vel, 2*dt));
                this.step += dt *this.stepDir;
                if (this.step >= this.numStepPoints) { 
                        this.stepDir *= -1;
                        this.footPropelling = 1;
                        this.stepped = true;
                }
                if (this.step <= -this.numStepPoints) { 
                        this.stepDir *= -1;
                        this.footPropelling = 2;
                        this.stepped = true;
                }
                this.UpdateSteps();
        }
}