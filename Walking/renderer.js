class Renderer {
    constructor() {
    }

    render(people) {
        for (let i = 0; i < people.length; i++) {
            let person = people[i];
            fill(person.color);
            console.log(person.pos.x, person.pos.y);
            circle(person.pos.x, person.pos.y, 110);
            console.log("HERE");
        }
    }
}