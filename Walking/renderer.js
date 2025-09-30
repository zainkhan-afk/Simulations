class Renderer {
    constructor() {
    }

    render(people) {
        for (let i = 0; i < people.length; i++) {
            push();
            let person = people[i];
            stroke(0);
            
            translate(person.pos.x, person.pos.y);
            rotate(person.angle);
            
            fill(0, 0, 0);
            ellipse(person.foot1 + 3, 5.5, 10, 5);
            ellipse(person.foot2 + 3, -5.5, 10, 5);
            fill(0, 50, 200);
            rect(0, 3, person.foot1, 5);
            rect(0, -8, person.foot2, 5);

            
            fill(person.color);
            ellipse(0, 0, 10, 20);
            fill(0, 0, 0);
            circle(0, 0, 12);
            pop();
        }
    }
}