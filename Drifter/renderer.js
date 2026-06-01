class Renderer{
    constructor(){
    }

    renderCar(car){
        push();
        
        translate(car.pos.x, car.pos.y);
        rotate(car.heading);
        push();
        translate(-car.carLength/2, 0)
        stroke(100);
        fill(50);
        rect(-car.tyreLength/2, -car.tyreWidth/2, 
              car.tyreLength,  car.tyreWidth);
        pop();

        push();
        translate(car.carLength/2, 0)
        rotate(car.wheelAngle);
        stroke(100);
        fill(50);
        rect(-car.tyreLength/2, -car.tyreWidth/2, 
              car.tyreLength,  car.tyreWidth);
            
        stroke(255, 0, 0);
        line(0, -car.carWheelbaseWidth/2, 0, car.carWheelbaseWidth/2);
        pop();

        stroke(255, 0, 0);
        line(-car.carLength/2, 0, car.carLength/2, 0);
        pop();
    }

    render(car){
        background(0);
        this.renderCar(car);
    }
}