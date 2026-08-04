class Controller{
    constructor(){

    }

    update(car){
        if (keyIsDown(87) && keyIsDown(83)) {
            // Both pressed — no acceleration
        } else if (keyIsDown(87)) {
            // W — accelerate forward
            car.throttle = lerp(car.throttle, 1.0, 0.1);
            this.tractionForce = p5.Vector.fromAngle(car.state.heading, car.throttle*car.maxEngineForce);
        } else if (keyIsDown(83)) {
            // S — accelerate backward
            car.throttle = lerp(car.throttle, -1.0, 0.1);
        }
    }
}