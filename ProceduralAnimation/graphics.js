class Graphics{
    constructor()
    {
        this.headAnglePoints = [-PI / 3, -PI / 4, -PI / 6, 0, PI / 6, PI / 4, PI / 3];
        // this.headAnglePoints = [-PI / 2, -PI / 4, 0];
    }

    _DrawFishHead(fish)
    {
        circle(fish.circles[0].x, fish.circles[0].y, 1);
        for (let  i = 0; i < this.headAnglePoints.length; i++)
        {
            let headHeading = p5.Vector.fromAngle(this.headAnglePoints[i] + fish.velocity.heading(), fish.radii[0]);
            let headPoint = p5.Vector.add(fish.circles[0], headHeading);
            circle(headPoint.x, headPoint.y, 1);
        }   
    }

    _DrawFishBodySegments(fish)
    {
        for (let i = 1; i < fish.circles.length; i++)
        {
            let diff = p5.Vector.sub(fish.circles[i], fish.circles[i-1]);
            let p1 = p5.Vector.add(fish.circles[i-1], p5.Vector.fromAngle(diff.heading() + PI/2, fish.radii[i - 1]));
            let p2 = p5.Vector.add(fish.circles[i-1], p5.Vector.fromAngle(diff.heading() - PI/2, fish.radii[i - 1]));
            stroke(120);
            circle(fish.circles[i].x, fish.circles[i].y, 1)
            stroke(255, 0, 0);
            circle(p1.x, p1.y, 1);
            circle(p2.x, p2.y, 1);
        }
    }

    _DrawFins(fish)
    {
        stroke(255);
        let diff = p5.Vector.sub(fish.circles[2], fish.circles[1]);
        let finHeadingVector = p5.Vector.sub(fish.circles[0], fish.circles[1]);
        let finPos = p5.Vector.add(fish.circles[1], p5.Vector.fromAngle(diff.heading() - PI / 2, fish.radii[1]));
        push();
        translate(finPos.x, finPos.y);
        rotate(PI / 6 + finHeadingVector.heading());
        ellipse(0, 0, 10, 30);
        pop();
        
        finPos = p5.Vector.add(fish.circles[1], p5.Vector.fromAngle(diff.heading() + PI / 2, fish.radii[1]));
        push();
        translate(finPos.x, finPos.y);
        rotate(-PI / 6  + finHeadingVector.heading() - PI);
        ellipse(0, 0, 10, 30);
        pop();
        

        finHeadingVector = p5.Vector.sub(fish.circles[3], fish.circles[4]);
        diff = p5.Vector.sub(fish.circles[5], fish.circles[4]);
        finPos = p5.Vector.add(fish.circles[4], p5.Vector.fromAngle(diff.heading() - PI / 2, fish.radii[4]));
        push();
        translate(finPos.x, finPos.y);
        rotate(PI / 6 + finHeadingVector.heading());
        ellipse(0, 0, 7, 25);
        pop();

        finPos = p5.Vector.add(fish.circles[4], p5.Vector.fromAngle(diff.heading() + PI / 2, fish.radii[4]));
        push();
        translate(finPos.x, finPos.y);
        rotate(-PI / 6  + finHeadingVector.heading() - PI);
        ellipse(0, 0, 7, 25);
        pop();
    }

    _DrawFishTail(fish)
    {
        stroke(255);
        let diff = p5.Vector.sub(fish.circles[5], fish.circles[4]);

        let tailStart = fish.circles[fish.num_circles - 2].copy();
        let tailEnd = fish.circles[fish.num_circles - 1].copy();
        let tailEndOffset = p5.Vector.add(tailStart, p5.Vector.fromAngle(diff.heading(), fish.radii[fish.num_circles - 1]));

        
        beginShape();
        vertex(tailStart.x, tailStart.y);
        vertex(tailEnd.x, tailEnd.y);
        vertex(tailEndOffset.x, tailEndOffset.y);
        vertex(tailStart.x, tailStart.y);
        endShape();
        // line(tailStart.x, tailStart.y, tailEnd.x, tailEnd.y);
        // line(tailStart.x, tailStart.y, tailEndOffset.x, tailEndOffset.y);
        //line(fish.circles[fish.num_circles - 2].x, fish.circles[fish.num_circles - 2].y, fish.circles[fish.num_circles - 1].x, fish.circles[fish.num_circles - 1].y);
        //line(tailOffest.x, tailOffest.y, fish.circles[fish.num_circles - 2].x, fish.circles[fish.num_circles - 2].y);
    }
    
    _DrawFishOutline(fish)
    {
        fill(230, 150, 0);
        this._DrawFins(fish);
        this._DrawFishTail(fish);

        noStroke();
        fill(200, 100, 0);
        beginShape();
        let bodyAngleDiffSum = 0;
        // Draw the head
        for (let  j = 0; j < this.headAnglePoints.length; j++)
        {
            let headHeading = p5.Vector.fromAngle(this.headAnglePoints[j] + fish.velocity.heading(), fish.radii[0]);
            let headPoint = p5.Vector.add(fish.circles[0], headHeading);
            vertex(headPoint.x, headPoint.y);
        }
        for (let i = 1; i < fish.circles.length; i++)
        {
            let diff = p5.Vector.sub(fish.circles[i], fish.circles[i-1]);
            bodyAngleDiffSum += fish.circles[i].heading() - fish.circles[i - 1].heading();
            let p = p5.Vector.add(fish.circles[i - 1], p5.Vector.fromAngle(diff.heading() - PI/2, fish.radii[i - 1]));
            vertex(p.x, p.y);
        }
        for (let  j = this.headAnglePoints.length - 1; j >= 0; j--)
        {
            let headHeading = p5.Vector.fromAngle(PI - this.headAnglePoints[j] + fish.velocity.heading(), fish.radii[fish.circles.length - 2]);
            let headPoint = p5.Vector.add(fish.circles[fish.circles.length - 2], headHeading);
            vertex(headPoint.x, headPoint.y);
        }
        for (let i = fish.circles.length  - 1; i > 0; i--)
        {
            let diff = p5.Vector.sub(fish.circles[i], fish.circles[i-1]);
            let p = p5.Vector.add(fish.circles[i-1], p5.Vector.fromAngle(diff.heading() + PI/2, fish.radii[i - 1]));
            vertex(p.x, p.y);
        }
        endShape();

        fill(100);
        let eye1 = p5.Vector.fromAngle(PI/2 + fish.velocity.heading(), fish.radii[0]);
        let eye2 = p5.Vector.fromAngle(-PI/2 + fish.velocity.heading(), fish.radii[0]);

        eye1.add(fish.circles[0]);
        eye2.add(fish.circles[0]);
        circle(eye1.x, eye1.y, 5);
        circle(eye2.x, eye2.y, 5);

    }

    DrawFish(fishes)
    {
        stroke(255);
        for (let i = 0; i < fishes.length; i++)
        {
            let fish = fishes[i];
            // this._DrawFishHead(fish);
            // this._DrawFishBodySegments(fish);
            // this._DrawFishTail(fish);
            this._DrawFishOutline(fish);
        }
    }
}