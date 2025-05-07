class Fish{
	constructor(position){
        this.boundary_limit_percent = 0.05;
        
		this.position = position;
        this.num_circles = 8;
        this.circles = [];
        this.radii = [8, 10, 10, 8, 6, 5, 4, 3];

        this.velocity = createVector(random(-20, 20), random(-20, 20));
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
        if (this.position.x > (1 - this.boundary_limit_percent) * windowWidth || this.position.x < this.boundary_limit_percent * windowWidth)
        {
            this.acceleration.x = (windowWidth / 2 - this.position.x) / (windowWidth/2);
        }

        if (this.position.y > (1 - this.boundary_limit_percent) * windowHeight || this.position.y < this.boundary_limit_percent * windowHeight)
        {
            this.acceleration.y = (windowHeight / 2 - this.position.y) / (windowHeight/2);
        }
    }

	Step(deltaT){
        this.velocity = p5.Vector.add(this.velocity, p5.Vector.mult(this.acceleration, deltaT));
        this.position = p5.Vector.add(this.position, p5.Vector.mult(this.velocity, deltaT));

        this.acceleration.x = 0;
        this.acceleration.y = 0;
        
        this.UpdateCircles();
        this.CheckBoundaries();
	}
}