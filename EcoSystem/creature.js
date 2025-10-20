class Creature{
    constructor(pos){
        this.pos = pos;
        this.size = 10;
        this.health = 100;
        this.foodMatter = 10;
        this.hunger = 0;
        this.thirst = 0;
        this.age = 0;
        this.alive = true;
        
        this.maxSpeed = 2;
        this.maxForce = 0.1;
        this.ageThresh = 100;
        this.hungerThresh = 10;
        this.hungerInc = 0.1;
        this.consumptionRate = 0.1;

        // this.vel = p5.Vector.random2D();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    applyForce(force) {
        if (!this.alive) { return; }
        this.acc.add(force);
    }

    step(){
        if (!this.alive) { return; }
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.age += 0.1;
        this.hunger += this.hungerInc;

        if (this.hunger > this.hungerThresh)
        {
            this.health -= 0.5;
        }

        if (this.age >= this.ageThresh || this.health <= 0){
            this.alive = false;
        }
    }

    consume(other){
        let amount = min(this.consumptionRate, other.foodMatter);
        other.foodMatter -= amount;
        this.hunger -= amount;

    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target) {
        let desired = p5.Vector.sub(this.pos, target);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }
}