class CarForces{
    constructor(tractionForce, dragForce, rollingResistanceForce){
        this.tractionForce = tractionForce;
        this.dragForce = dragForce;
        this.rollingResistanceForce = rollingResistanceForce;
    }
}


class Physics{
    constructor(){       
        this.Cdrag = 0.3;
    }

    calculateTractionForce(car){
        return p5.Vector.fromAngle(car.state.heading, car.throttle*car.maxEngineForce);
    }

    calculateRollingResistanceForce(car){
    }

    calculateDragForce(car){
        return p5.Vector.mult(car.state.vel, (-this.Cdrag*car.state.vel.mag()));
    }

    update(car){
        let tractionForce = this.calculateTractionForce(car);
        let dragForce = this.calculateDragForce(car);

        return new CarForces(tractionForce, dragForce, createVector(0, 0));
    }
}