class Creature{
    constructor(pos){
        this.pos = pos;
        this.size = 10;
        this.health = 100;
        this.foodMatter = 10;
        this.hunger = 0;
        this.thirst = 0;

        this.vel = createVector(0, 0);
    }

    Step(){
        this.pos.add(this.vel);
    }

    Consume(other){
        this.hunger += other.foodMatter;
    }
}