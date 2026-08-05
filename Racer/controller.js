class Controller{
    constructor(){

    }

    update(car){
        if (keyIsDown(87) && keyIsDown(83)) {
            car.throttle = lerp(car.throttle, 0, 0.3);
            // Both pressed — no acceleration
        } else if (keyIsDown(87)) {
            // W — accelerate forward
            car.throttle = lerp(car.throttle, 1.0, 0.1);
        } else if (keyIsDown(83)) {
            // S — accelerate backward
            car.throttle = lerp(car.throttle, -1.0, 0.1);
        }
        else{
            car.throttle = lerp(car.throttle, 0, 0.3);
        }
    }
}