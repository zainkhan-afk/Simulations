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
            ellipse(0, 0, 10, 20);
            fill(0, 0, 0);
            circle(0, 0, 5);
            pop();
        }
    }
}