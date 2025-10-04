class Person{
	constructor(pos){
                this.pos = pos;
                this.vel = p5.Vector.fromAngle(PI);
                this.color = color(200, 200, 0);

                this.bodyHeight = 20;

                this.leftFootPos = createVector(this.pos.x + 10, this.pos.y - this.bodyHeight / 2);
                this.rightFootPos = createVector(this.pos.x, this.pos.y + this.bodyHeight / 2);

                this.leftFootDesiredPos = this.leftFootPos.copy();
                this.rightFootDesiredPos = this.rightFootPos.copy();

                this.stepSize = 10;

                this.movingFoot = 0;
                this.footStepPlanned = true;
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
                        if (footDelta.mag() < 0.001) {
                                // this.footStepPlanned = false;
                                // this.movingFoot = 1;
                                return;
                        }
                        // console.log("footDelta", footDelta);
                        this.leftFootPos.add(p5.Vector.mult(footDelta, dt));
                        // console.log(this.leftFootPos, this.leftFootDesiredPos);

                }
                else
                {
                        let footDelta = p5.Vector.sub(this.rightFootDesiredPos, this.rightFootPos);
                        if (footDelta.mag() < 0.001) {
                                // this.footStepPlanned = false;
                                // this.movingFoot = 0;
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
        
        Update(dt)
        {

                this.pos.add(p5.Vector.mult(this.vel, dt));
                // this.leftFootPos.add(p5.Vector.mult(this.vel, dt));
                // this.rightFootPos.add(p5.Vector.mult(this.vel, dt));
                let leftFootHeading = p5.Vector.sub(this.pos, this.leftFootPos).heading();
                let rightFootHeading = p5.Vector.sub(this.pos, this.rightFootPos).heading();
                console.log(leftFootHeading*180/PI, rightFootHeading*180/PI);

                // this.CalculateDesiredFootPos(dt);
                // this.UpdateFootPos(dt);
                // this.leftFootPos = createVector(this.pos.x, this.pos.y - this.bodyHeight / 2);
                // this.rightFootPos = createVector(this.pos.x, this.pos.y + this.bodyHeight / 2);
        }
}