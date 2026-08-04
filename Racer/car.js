class State{
    constructor(pos, vel = createVector(0, 0), acc = createVector(0, 0)){
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.heading = 0;
    }

    update(dt){
        this.pos.add(p5.vector.mult(this.vel, dt));
        this.vel.add(p5.vector.mult(this.acc, dt));
        this.acc.set(0);
    }
}

class Car{
    constructor(state){
        this.state = state;
        this.throttle = 0;
        
        this.mass = 10;
    }

    step(dt){
        this.state.update(dt);
    }
}