class Fish{
	constructor(position){
        this.boundary_limit_percent = 0.05;
        
		this.position = position;
        this.num_circles = 9;
        this.circles = [];
        this.radii = [16, 20, 20, 16, 12, 10, 8, 6, 40];

        this.velocity = createVector(random(-20, 20), random(-20, 20));
        this.velocity = createVector(15, 15);
        this.velocity = createVector(10, 10);
        this.acceleration = createVector(0, 0);
        append(this.circles, this.position.copy());
        for (let i = 1; i < this.num_circles; i++)
        {
            // append(this.radii, this.radii[i-1] * 0.8);
            let pos_diff = p5.Vector.fromAngle(this.velocity.heading(), this.radii[i-1]);
            
            let new_pos = p5.Vector.sub(this.circles[i-1], pos_diff);
            append(this.circles, new_pos);
        }

	}

    UpdateCircles()
    {
        this.circles[0] = this.position.copy();
        for (let i = 1; i < this.num_circles; i++)
        {
            let prev_node_pos = this.circles[i - 1];
            let diff = p5.Vector.sub(this.circles[i], prev_node_pos);
            diff.setMag(this.radii[i]);
            this.circles[i] = p5.Vector.add(this.circles[i-1], diff);
        }
    }

    CheckBoundaries()
    {
        // if (this.position.x > (1 - this.boundary_limit_percent) * windowWidth || this.position.x < this.boundary_limit_percent * windowWidth)
        // {
        //     this.acceleration.x = (windowWidth / 2 - this.position.x) / (windowWidth/4);
        // }

        // if (this.position.y > (1 - this.boundary_limit_percent) * windowHeight || this.position.y < this.boundary_limit_percent * windowHeight)
        // {
        //     this.acceleration.y = (windowHeight / 2 - this.position.y) / (windowHeight/4);
        // }

        this.acceleration.x = (mouseX - this.position.x) / (windowWidth / 10);
        this.acceleration.y = (mouseY - this.position.y) / (windowHeight / 10);
        // if (this.acceleration.mag() > 5){
        //     this.acceleration.setMag(5);
        // }
    }

	Step(deltaT){
        this.velocity = p5.Vector.add(this.velocity, p5.Vector.mult(this.acceleration, deltaT));
        if (this.velocity.mag() > 20){
            this.velocity.setMag(20);
        }
        this.position = p5.Vector.add(this.position, p5.Vector.mult(this.velocity, deltaT));

        this.acceleration.x = 0;
        this.acceleration.y = 0;
        
        this.UpdateCircles();
        this.CheckBoundaries();
	}

    Draw()
    {

    }
}