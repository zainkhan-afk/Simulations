class Renderer {
    constructor() {
    }

    render(people) {
        for (let i = 0; i < people.length; i++) {
            push();
            let person = people[i];
            translate(person.pos.x, person.pos.y);
            rotate(person.angle);
            fill(person.color);
            rect(0, 0, 10, 5);
            rect(0, -5, -10, 5);
            ellipse(0, 0, 10, 20);
            fill(0, 0, 0);
            circle(0, 0, 5);
            pop();
        }
    }
}