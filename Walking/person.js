class Person{
	constructor(pos){
                this.pos = pos;
                this.vel = createVector(random(-1, 1) , random(-1, 1));
                this.color = color(100, 0, 0);
	}

        Update()
        {
                this.pos.add(this.vel);
        }
}