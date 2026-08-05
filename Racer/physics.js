class CarForces{
    constructor(tractionForce, dragForce, rollingResistanceForce){
        this.tractionForce = tractionForce;
        this.dragForce = dragForce;
        this.rollingResistanceForce = rollingResistanceForce;
    }
}


class Physics{
    constructor(){       
        this.Cdrag = 0.4257;
        this.Crr = this.Cdrag*30;
    }

    calculateTractionForce(car){
        return p5.Vector.fromAngle(car.state.heading, car.throttle*car.maxEngineForce);
    }

    calculateRollingResistanceForce(car){
        return p5.Vector.mult(car.state.vel, -this.Crr);
    }

    calculateDragForce(car){
        return p5.Vector.mult(car.state.vel, (-this.Cdrag*car.state.vel.mag()));
    }

    update(car){
        let tractionForce = this.calculateTractionForce(car);
        let dragForce = this.calculateDragForce(car);
        let rollingresistanceForce = this.calculateRollingResistanceForce(car);

        return new CarForces(tractionForce, dragForce, rollingresistanceForce);
    }
}