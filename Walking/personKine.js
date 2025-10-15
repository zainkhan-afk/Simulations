class Person{
	constructor(pos){
                this.pos = pos;
                this.vel = p5.Vector.fromAngle(random()*2*PI, random(1, 2));
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

                let leftFootMoving = leftFootAnchorDiff.mag() > this.halfStepSize && leftFootAnchorDiff.angleBetween(this.vel) < PI / 10;
                let rightFootMoving = rightFootAnchorDiff.mag() > this.halfStepSize && rightFootAnchorDiff.angleBetween(this.vel) < PI / 10;

                if (this.halt)
                {
                        let leftMag = leftFootAnchorDiff.mag();
                        let leftAngleHeading = leftFootAnchorDiff.angleBetween(this.vel) / PI * 180;
                        let rightMag = rightFootAnchorDiff.mag();
                        let rightAngleHeading = rightFootAnchorDiff.angleBetween(this.vel) / PI * 180;
                        console.log("Left");
                        console.log("Mag: ", leftMag)
                        console.log("Angle: ", leftAngleHeading);
                        console.log("Right");
                        console.log("Mag: ", rightMag)
                        console.log("Angle: ", rightAngleHeading);
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
                        this.leftFootDesiredPos = p5.Vector.add(this.leftFootAnchor, leftFootAnchorDiff);
                        this.footStepPlanned = true;
                }
                else if(rightFootMoving)
                {
                        this.movingFoot = 1;
                        rightFootAnchorDiff.setMag(this.stepSize);
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
        
        Update(dt)
        {

                // if (this.pos.x < 0 || this.pos.x > windowWidth) { this.vel.x *= -1;}
                // if (this.pos.y < 0 || this.pos.y > windowHeight) { this.vel.y *= -1;}
                if (!this.halt){
                        this.pos.add(p5.Vector.mult(this.vel, dt));
                }
                else {
                        console.log("\nHalted")
                        console.log("FS Planned: ", this.footStepPlanned);
                        console.log("Moving Foot: ", this.movingFoot)
                        console.log("Left: ", this.leftFootPos, this.leftFootDesiredPos);
                        console.log("Right: ", this.rightFootPos, this.rightFootDesiredPos);
                        console.log("vel: ", this.vel.mag());
                        console.log("step size: ", this.stepSize);
                }
                this.UpdateAnchorAndDesiredFootPos();
                this.UpdateFootPos(dt);

        }
}