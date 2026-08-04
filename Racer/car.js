class State{
    pos = createVector(0, 0);
    vel = createVector(0, 0);
    acc = createVector(0, 0);

    update(dt, other){
        this.pos.add(p5.vector.mult(this.vel, dt));
        this.vel.add(p5.vector.mult(this.acc, dt));
        this.acc.set(0);
    }
}

class Car{
    constructor(state){
        this.state = state;

        this.mass = 10;
    }

    step(dt){
        this.state.update(dt);
    }
}