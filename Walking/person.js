class Person{
	constructor(pos){
                this.pos = pos;
                // this.vel = createVector(random(-0.5, 0.5) , random(-0.5, 0.5));
                // this.angle = this.vel.heading();
                // this.vel = createVector(0 , 0);
                this.angle = random(0, 2*PI);
                this.vel = p5.Vector.fromAngle(this.angle);
                this.color = color(200, 200, 0);
                this.step = 0;
                this.numSteps = 3;
                this.stepDir = 1;
                this.stepSize = 10;
                // this.stepSize = this.vel.mag();
                this.footPropelling = 0;
                this.foot1 = 0;
                this.foot2 = 0;
                this.foot1Prev = 0;
                this.foot2Prev = 0;
                this.UpdateSteps();
	}

        UpdateSteps() {
                this.foot1Prev = this.foot1;
                this.foot2Prev = this.foot2;

                this.foot1 = this.stepSize * this.step / this.numSteps;
                this.foot2 = (this.foot1 * -1);

                let delta = 0.3;

                if (this.footPropelling == 0) {
                        delta = this.foot1 - this.foot1Prev;
                }
                else {
                        delta = this.foot2 - this.foot2Prev;
                }

                if (Math.abs(this.vel.mag() - delta) > 0.0001) {
                        this.vel = p5.Vector.setMag(this.vel, delta);
                        this.vel = p5.Vector.fromAngle(this.angle, Math.abs(delta));
                        // this.vel.setMag(Math.abs(delta));
                        // console.log("diff", Math.abs(this.vel.mag() - delta));
                        // console.log(this.vel.mag(), delta);
                }
                // this.vel.setMag(1);
                // console.log(this.footPropelling, delta, typeof delta);
                // console.log(this.vel.mag());
        }

        Update(dt)
        {
                this.pos.add(p5.Vector.mult(this.vel, 1));
                // console.log(this.vel.x, this.vel.y);
                this.step += dt*this.stepDir*1;
                if (this.step >= this.numSteps) { 
                        this.stepDir *= -1;
                        this.footPropelling = 1;
                }
                if (this.step <= -this.numSteps) { 
                        this.stepDir *= -1;
                        this.footPropelling = 0;
                }
                this.UpdateSteps();
        }
}