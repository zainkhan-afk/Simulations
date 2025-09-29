class Person{
	constructor(pos){
                this.pos = pos;
                this.vel = createVector(random(-1, 1) , random(-1, 1));
                this.angle = this.vel.heading();
                this.color = color(200, 200, 0);
	}

        Update()
        {
                this.pos.add(this.vel);
        }
}