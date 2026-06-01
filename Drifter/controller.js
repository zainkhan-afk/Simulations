class Controller {
    constructor() {
        this.steerAngle = PI / 6; // 45 degrees
        this.engineAcc = 10;
    }

    update(car) {
        // Steering
        if (keyIsDown(65) && keyIsDown(68)) {
            car.wheelAngle = 0;
        } else if (keyIsDown(65)) {
            car.wheelAngle = -this.steerAngle;
        } else if (keyIsDown(68)) {
            car.wheelAngle = this.steerAngle;
        } else {
            car.wheelAngle = 0;
        }

        // Throttle — accelerate along the car's heading
        if (keyIsDown(87) && keyIsDown(83)) {
            // Both pressed — no acceleration
        } else if (keyIsDown(87)) {
            // W — accelerate forward
            car.acc = this.engineAcc;
        } else if (keyIsDown(83)) {
            // S — accelerate backward
            car.acc = -this.engineAcc;
        }
    }
}
