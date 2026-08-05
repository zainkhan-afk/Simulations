class Renderer{
    constructor(){
        this.camera = {"x" : 0, "y" : 0};
    }
    renderCar(car){
        push();
        translate(width/2, height/2);
        fill(0, 0, 200);
        // translate(car.state.pos.x - this.camera.x, car.state.pos.y - this.camera.y);
        rotate(car.state.heading);
        rect(0, 0, 100, 50);
        pop();
    }

    renderWorld(world){
        stroke(200);
        for (let world_line of world.lines){
            line(world_line.x1 + (world_line.x1 - this.camera.x)% world.div, 
                world_line.y1, 
                world_line.x2 + (world_line.x1 - this.camera.x)% world.div, 
                world_line.y2);
        }
    }

    render(car, world){
        this.camera.x = car.state.pos.x;
        this.camera.y = car.state.pos.y;
        this.renderWorld(world);
        this.renderCar(car);
    }
}