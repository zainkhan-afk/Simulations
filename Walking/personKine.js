class Person{
	constructor(pos){
                this.pos = pos;
                // this.vel = p5.Vector.fromAngle(random()*2*PI, random(1, 2));
                this.vel = p5.Vector.fromAngle(PI/2, random(1, 2));
                this.acc = createVector(0, 0);

                this.max_vel = this.vel.mag();
                this.max_force = 0.1;

                this.color = color(200, 200, 0);

                this.bodyHeight = 20;
                this.footPitch = 10;

                this.leftFootAnchor = createVector(this.pos.x  + sin(this.vel.heading())*this.footPitch / 2, this.pos.y - cos(this.vel.heading())*this.footPitch / 2);
                this.rightFootAnchor = createVector(this.pos.x - sin(this.vel.heading())*this.footPitch / 2, this.pos.y + cos(this.vel.heading())*this.footPitch / 2);

                this.leftFootPos = this.leftFootAnchor.copy();
                this.rightFootPos = this.rightFootAnchor.copy();

                this.leftFootDesiredPos = this.leftFootPos.copy();
                this.rightFootDesiredPos = this.rightFootPos.copy();

                this.stepSize = 8 + this.vel.mag();
                this.halfStepSize = this.stepSize / 2;

                this.movingFoot = 0;
                this.footStepPlanned = true;
                this.halt = false;
	}

        UpdateFootPos(dt)
        {
                if (this.movingFoot == 0)
                {
                        let footDelta = p5.Vector.sub(this.leftFootDesiredPos, this.leftFootPos);
                        // console.log("Left: ", footDelta.mag());
                        if (footDelta.mag() < 0.1) {
                                this.footStepPlanned = false;
                                // this.movingFoot = 1;
                                this.leftFootPos = this.leftFootDesiredPos.copy();
                                // console.log("Left Reached, switching to right");
                                return;
                        }
                        // footDelta.setMag(this.vel.mag());
                        // console.log("footDelta", footDelta);
                        this.leftFootPos.add(p5.Vector.mult(footDelta, dt));
                        // console.log(this.leftFootPos, this.leftFootDesiredPos);

                }
                else
                {
                        let footDelta = p5.Vector.sub(this.rightFootDesiredPos, this.rightFootPos);
                        // console.log("Right: ", footDelta.mag());
                        if (footDelta.mag() < 0.1) {
                                this.footStepPlanned = false;
                                // this.movingFoot = 0;
                                this.rightFootPos = this.rightFootDesiredPos.copy();
                                // console.log("Right Reached, switching to left");
                                return;
                        }
                        // footDelta.setMag(this.vel.mag());
                        this.rightFootPos.add(p5.Vector.mult(footDelta, dt));
                }
        }

        UpdateAnchorAndDesiredFootPos(){
                this.leftFootAnchor = createVector(this.pos.x  + sin(this.vel.heading())*this.footPitch / 2, this.pos.y - cos(this.vel.heading())*this.footPitch / 2);
                this.rightFootAnchor = createVector(this.pos.x - sin(this.vel.heading())*this.footPitch / 2, this.pos.y + cos(this.vel.heading())*this.footPitch / 2);

                let leftFootAnchorDiff = p5.Vector.sub(this.leftFootAnchor, this.leftFootPos);
                let rightFootAnchorDiff = p5.Vector.sub(this.rightFootAnchor, this.rightFootPos);

                // push();
                // translate(100, 100);
                // stroke(0, 255, 0);
                // line(0, 0, 25*cos(leftFootAnchorDiff.heading()), 25*sin(leftFootAnchorDiff.heading()));
                // stroke(255, 0, 0);
                // line(0, 0, 25*cos(rightFootAnchorDiff.heading()), 25*sin(rightFootAnchorDiff.heading()));
                // stroke(0, 0, 255);
                // line(0, 0, 25*cos(this.vel.heading()), 25*sin(this.vel.heading()));
                // pop();


                // push();
                // translate(200, 100);
                // stroke(0, 255, 0);
                // line(0, 0, 25*cos(leftFootAnchorDiff.angleBetween(this.vel)), 25*sin(leftFootAnchorDiff.angleBetween(this.vel)));
                // stroke(255, 0, 0);
                // line(0, 0, 25*cos(rightFootAnchorDiff.angleBetween(this.vel)), 25*sin(rightFootAnchorDiff.angleBetween(this.vel)));
                // stroke(0, 0, 255);
                // line(0, 0, 25*cos(this.vel.heading()), 25*sin(this.vel.heading()));
                // pop();
                
                // stroke(0);
                // strokeWeight(1);
                // let angles = [0];
                // for (let  i = 0; i < angles.length; i++){
                //         let a = angles[i] / 180 * PI;
                //         line(30*cos(a), 30*sin(a), 0, 0);
                //         line(30*cos(a), 30*sin(a), 0, 0);
                // }





                if (rightFootAnchorDiff.mag() > this.stepSize || leftFootAnchorDiff.mag() > this.stepSize)
                {
                        this.halt = true;
                }
                else{
                        this.halt = false;
                }

                if (this.footStepPlanned)
                {
                        return;
                }

                let leftFootMoving = leftFootAnchorDiff.mag() > this.halfStepSize && leftFootAnchorDiff.angleBetween(this.vel) < PI / 3;
                let rightFootMoving = rightFootAnchorDiff.mag() > this.halfStepSize && rightFootAnchorDiff.angleBetween(this.vel) < PI / 3;

                if (this.halt)
                {
                        let leftMag = leftFootAnchorDiff.mag();
                        let leftAngleHeading = leftFootAnchorDiff.angleBetween(this.vel) / PI * 180;
                        let rightMag = rightFootAnchorDiff.mag();
                        let rightAngleHeading = rightFootAnchorDiff.angleBetween(this.vel) / PI * 180;
                        // console.log("Left");
                        // console.log("Mag: ", leftMag)
                        // console.log("Angle: ", leftAngleHeading);
                        // console.log("Right");
                        // console.log("Mag: ", rightMag)
                        // console.log("Angle: ", rightAngleHeading);
                }

                if (leftFootMoving && rightFootMoving)
                {
                        if (leftFootAnchorDiff.mag() > rightFootAnchorDiff.mag()){
                                rightFootMoving = false;    
                        }
                        else{
                                leftFootMoving = false;
                        }
                }
                if (leftFootMoving)
                {
                        this.movingFoot = 0;
                        leftFootAnchorDiff.setMag(this.stepSize);
                        leftFootAnchorDiff.setHeading(this.vel.heading());
                        this.leftFootDesiredPos = p5.Vector.add(this.leftFootAnchor, leftFootAnchorDiff);
                        this.footStepPlanned = true;
                }
                else if(rightFootMoving)
                {
                        this.movingFoot = 1;
                        rightFootAnchorDiff.setMag(this.stepSize);
                        rightFootAnchorDiff.setHeading(this.vel.heading());
                        this.rightFootDesiredPos = p5.Vector.add(this.rightFootAnchor, rightFootAnchorDiff);
                        this.footStepPlanned = true;
                }

                // if (leftFootAnchorDiff.mag() > this.halfStepSize && leftFootAnchorDiff.angleBetween(this.vel) < 0.001)
                // {
                //         leftFootAnchorDiff.setMag(this.stepSize);
                //         this.leftFootDesiredPos = p5.Vector.add(this.leftFootAnchor, leftFootAnchorDiff);
                //         this.footStepPlanned = true;
                //         // this.leftFootPos = p5.Vector.sub(this.leftFootAnchor, leftFootAnchorDiff);
                // }

                // if (rightFootAnchorDiff.mag() > this.halfStepSize && rightFootAnchorDiff.angleBetween(this.vel) < 0.001)
                // {
                //         rightFootAnchorDiff.setMag(this.stepSize);
                //         this.rightFootDesiredPos = p5.Vector.add(this.rightFootAnchor, rightFootAnchorDiff);
                //         this.footStepPlanned = true;
                //         // this.rightFootPos = p5.Vector.sub(this.rightFootAnchor, rightFootAnchorDiff);
                // }
        }
        
        ApplyForce(force){
                force.limit(this.max_force);
                this.acc.add(force);
        }

        Update(dt)
        {
                let maxTurn = PI / 500;
                // if (this.pos.x < 0 || this.pos.x > windowWidth) { this.vel.x *= -1;}
                // if (this.pos.y < 0 || this.pos.y > windowHeight) { this.vel.y *= -1;}
                if (!this.halt){
                        const newVal = p5.Vector.add(this.vel, p5.Vector.mult(this.acc, dt));

                        let diff = newVal.heading() - this.vel.heading();
                        while (diff > PI) diff -= TWO_PI;
                        while (diff < -PI) diff += TWO_PI;

                        diff = constrain(diff, -maxTurn, maxTurn);

                        let newAngle = this.vel.heading() + diff;
                        console.log("DIFF", diff*180/PI);
                        this.vel = p5.Vector.fromAngle(newAngle).setMag(newVal.mag());
                        
                        // this.vel = newVal.copy();
                        this.vel.limit(this.max_vel);
                        this.pos.add(p5.Vector.mult(this.vel, dt));
                        this.acc.set(0);
                }
                else {
                        // console.log("\nHalted")
                        // console.log("FS Planned: ", this.footStepPlanned);
                        // console.log("Moving Foot: ", this.movingFoot)
                        // console.log("Left: ", this.leftFootPos, this.leftFootDesiredPos);
                        // console.log("Right: ", this.rightFootPos, this.rightFootDesiredPos);
                        // console.log("vel: ", this.vel.mag());
                        // console.log("step size: ", this.stepSize);
                }
                this.UpdateAnchorAndDesiredFootPos();
                this.UpdateFootPos(dt);

        }
}