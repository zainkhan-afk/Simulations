class Simulation{
    constructor(){
        this.people = [];
    }

    AddPerson(person){
        append(this.people, person);
    }

    Update(dt){
        for (let i = 0; i < this.people.length; i++){
            this.people[i].Update(dt);
        }
    }
}