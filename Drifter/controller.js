class Controller {
    constructor() {
        this.engineAcc = 10;
    }

    update(car) {
        // Steering
        if (keyIsDown(65) && keyIsDown(68)) {
            car.desiredSteerAngle = 0;
        } else if (keyIsDown(65)) {
            car.desiredSteerAngle = -car.maxSteerAngle;
        } else if (keyIsDown(68)) {
            car.desiredSteerAngle = car.maxSteerAngle;
        } else {
            car.desiredSteerAngle = 0;
        }

        // Throttle — accelerate along the car's heading
        if (keyIsDown(87) && keyIsDown(83)) {
            // Both pressed — no acceleration
        } else if (keyIsDown(87)) {
            // W — accelerate forward
            car.acc = p5.Vector.fromAngle(car.heading, this.engineAcc);
        } else if (keyIsDown(83)) {
            // S — accelerate backward
            car.acc = p5.Vector.fromAngle(PI+car.heading, this.engineAcc);
        }
    }
}
