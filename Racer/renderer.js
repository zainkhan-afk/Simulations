class Renderer{
    render(car){
        push();
        fill(0, 0, 200);
        translate(car.state.pos.x, car.state.pos.y);
        rotate(car.state.heading);
        rect(0, 0, 100, 50);
        pop();
    }
}