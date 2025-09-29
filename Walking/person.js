class Person{
	constructor(pos){
                this.pos = pos;
                this.vel = createVector(random(-0.5, 0.5) , random(-0.5, 0.5));
                this.angle = this.vel.heading();
                this.color = color(200, 200, 0);
                this.step = 0;
                this.numSteps = 5;
	}

        Update()
        {
                this.pos.add(this.vel);
                this.step += 1;
                if (this.step >= this.numSteps) { this.step = 0;}
        }
}