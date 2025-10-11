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

                this.stepSize = 10;
                this.halfStepSize = this.stepSize / 2;

                this.movingFoot = 0;
                this.footStepPlanned = true;
                this.halt = false;
	}

        GetLocalFootPos(foot)
        {
                if (foot == 0)
                {
                        return p5.Vector.sub(this.pos, this.leftFootPos);
                }
                else
                {
                        return p5.Vector.sub(this.pos, this.rightFootPos);
                }
        }

        UpdateFootPos(dt)
        {
                if (this.movingFoot == 0)
                {
                        let footDelta = p5.Vector.sub(this.leftFootDesiredPos, this.leftFootPos);
                        if (footDelta.mag() < 0.01) {
                                this.footStepPlanned = false;
                                this.movingFoot = 1;
                                return;
                        }
                        // console.log("footDelta", footDelta);
                        this.leftFootPos.add(p5.Vector.mult(footDelta, dt));
                        // console.log(this.leftFootPos, this.leftFootDesiredPos);

                }
                else
                {
                        let footDelta = p5.Vector.sub(this.rightFootDesiredPos, this.rightFootPos);
                        if (footDelta.mag() < 0.01) {
                                this.footStepPlanned = false;
                                this.movingFoot = 0;
                                return;
                        }
                        this.rightFootPos.add(p5.Vector.mult(footDelta, dt));
                }
        }

        CalculateDesiredFootPos(dt)
        {
                let footDist = max(this.pos.dist(this.leftFootPos), this.pos.dist(this.rightFootPos));
                
                if (footDist <= this.stepSize / 2) { return; }
                this.footStepPlanned = false;

                let leftFootHeading = p5.Vector.sub(this.pos, this.leftFootPos).heading();
                let rightFootHeading = p5.Vector.sub(this.pos, this.rightFootPos).heading();
                
                if (leftFootHeading < 0 || rightFootHeading < 0){
                        console.log(leftFootHeading*180/PI, rightFootHeading*180/PI);
                        this.footStepPlanned = true;
                }
                
                if (this.footStepPlanned) { return; }
                
                if (this.pos.dist(this.leftFootPos) > this.pos.dist(this.rightFootPos)) {
                        this.movingFoot = 0;
                }
                else{
                        this.movingFoot = 1;
                }

                let stepSizeVector = p5.Vector.fromAngle(this.vel.heading(), this.stepSize);

                if (this.movingFoot == 0)
                {
                        this.leftFootDesiredPos.add(stepSizeVector);
                        this.footStepPlanned = true;
                        // console.log(stepSizeVector);
                        // console.log(this.leftFootPos, this.leftFootDesiredPos);
                }
                else if (this.movingFoot == 1)
                {
                        this.rightFootDesiredPos.add(stepSizeVector);
                        this.footStepPlanned = true;
                        // console.log(stepSizeVector);
                        // console.log(this.leftFootPos, this.leftFootDesiredPos);
                }
        }

        UpdateAnchorAndDesiredFootPos(){
                this.leftFootAnchor = createVector(this.pos.x  + sin(this.vel.heading())*this.footPitch / 2, this.pos.y - cos(this.vel.heading())*this.footPitch / 2);
                this.rightFootAnchor = createVector(this.pos.x - sin(this.vel.heading())*this.footPitch / 2, this.pos.y + cos(this.vel.heading())*this.footPitch / 2);

                let leftFootAnchorDiff = p5.Vector.sub(this.leftFootAnchor, this.leftFootPos);
                let rightFootAnchorDiff = p5.Vector.sub(this.rightFootAnchor, this.rightFootPos);

                if (rightFootAnchorDiff.mag() > this.stepSize || leftFootAnchorDiff.mag() > this.stepSize)
                {
                        // this.halt = true;
                }
                else{
                        this.halt = false;
                }

                if (this.footStepPlanned)
                {
                        return;
                }

                
                if (leftFootAnchorDiff.mag() > this.halfStepSize && leftFootAnchorDiff.angleBetween(this.vel) < 0.001)
                {
                        leftFootAnchorDiff.setMag(this.stepSize);
                        this.leftFootDesiredPos = p5.Vector.add(this.leftFootAnchor, leftFootAnchorDiff);
                        this.footStepPlanned = true;
                        // this.leftFootPos = p5.Vector.sub(this.leftFootAnchor, leftFootAnchorDiff);
                }

                if (rightFootAnchorDiff.mag() > this.halfStepSize && rightFootAnchorDiff.angleBetween(this.vel) < 0.001)
                {
                        rightFootAnchorDiff.setMag(this.stepSize);
                        this.rightFootDesiredPos = p5.Vector.add(this.rightFootAnchor, rightFootAnchorDiff);
                        this.footStepPlanned = true;
                        // this.rightFootPos = p5.Vector.sub(this.rightFootAnchor, rightFootAnchorDiff);
                }
        }
        
        Update(dt)
        {

                if (!this.halt){
                        this.pos.add(p5.Vector.mult(this.vel, dt));
                }
                this.UpdateAnchorAndDesiredFootPos();
                this.UpdateFootPos(dt);
                // this.leftFootPos = createVector(this.pos.x - cos(this.vel.heading())*this.leftFootAnchor.y, this.pos.y + sin(this.vel.heading())*this.leftFootAnchor.y);
                // this.rightFootPos = createVector(this.pos.x - cos(this.vel.heading())*this.rightFootAnchor.y, this.pos.y + sin(this.vel.heading())*this.rightFootAnchor.y);
                // this.leftFootPos.add(p5.Vector.mult(this.vel, dt));
                // this.rightFootPos.add(p5.Vector.mult(this.vel, dt));

                // this.CalculateDesiredFootPos(dt);
                // this.UpdateFootPos(dt);
                // this.leftFootPos = createVector(this.pos.x, this.pos.y - this.bodyHeight / 2);
                // this.rightFootPos = createVector(this.pos.x, this.pos.y + this.bodyHeight / 2);
        }
}