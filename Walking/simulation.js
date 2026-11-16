class Simulation{
    constructor(){
        this.people = [];
    }

    AddPerson(person){
        append(this.people, person);
    }

    BoundaryRepulsion(){
        let margin = 200;
        for (let i = 0; i < this.people.length; i++){
            let p = this.people[i];
            
            if (p.pos.x < margin || p.pos.x > windowWidth - margin) { 
                let f_x = p.pos.x < margin ? 3 : -3;
                p.ApplyForce(createVector(f_x, 0));
            }
            if (p.pos.y < margin || p.pos.y > windowHeight - margin) { 
                let f_y = p.pos.y < margin ? 3 : -3;
                p.ApplyForce(createVector(0, f_y));
            }
        }
    }

    Update(dt){
        // this.BoundaryRepulsion();
        for (let i = 0; i < this.people.length; i++){
            let dx = mouseX - this.people[i].pos.x;
            let dy = mouseY - this.people[i].pos.y;
            let df = createVector(dx, dy);
            this.people[i].ApplyForce(df);
            this.people[i].Update(dt);
        }
    }
}