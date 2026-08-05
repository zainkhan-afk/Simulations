class State{
    constructor(pos, vel = createVector(0, 0), acc = createVector(0, 0)){
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.heading = 0;
    }

    update(dt){
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.acc.set(0);
    }
}

class Car{
    constructor(state){
        this.state = state;
        this.throttle = 0;
        this.maxEngineForce = 100;
        this.mass = 10;
    }

    applyForce(forces){
        // console.log(this.throttle);
        let totalForce = p5.Vector.add(forces.tractionForce, forces.dragForce, forces.rollingResistanceForce);
        this.state.acc.set(p5.Vector.mult(totalForce, 1/this.mass));
    }

    step(dt, forces){
        this.applyForce(forces);
        this.state.update(dt);
    }
}