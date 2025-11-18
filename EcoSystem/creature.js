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
        
        this.maxSpeed = 0.25;
        this.maxForce = 1;
        this.maxHealth = 100;
        this.ageThresh = 1000;
        this.hungerThresh = 10;
        this.hungerInc = 0.1;
        this.ageInc = 0.05;
        this.consumptionRate = 0.25;
        this.healthDecline = 0.1;
        this.isHungry = false;

        this.foodCell = null;
        this.foodFound = false;
        this.onFood = false;
        // this. = null;

        // this.vel = p5.Vector.random2D();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    applyForce(force) {
        if (!this.alive) { return; }
        // this.acc.add(force);
        this.vel = force;
    }

    step(){
        if (!this.alive) { return; }
        // this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        // this.acc.mult(0);

        this.age += this.ageInc;
        this.hunger += this.hungerInc;

        if (this.hunger > this.hungerThresh)
        {
            this.health -= this.healthDecline;
            this.isHungry = true;
        }

        if (this.health > this.maxHealth)
        {
            this.health = this.maxHealth;
        }

        if (this.age >= this.ageThresh || this.health <= 0){
            this.alive = false;
        }
    }

    consume(other){
        if (!this.isHungry){return;}
        let amount = min(this.consumptionRate, other.foodMatter);
        other.foodMatter -= amount;
        this.hunger -= amount;
        this.health += amount;

        if (this.hunger < 0){
            this.hunger = 0;
            this.isHungry = false;
        }
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        if (desired.mag() < 0.1) {
            this.onFood = true;
            return createVector(0, 0);
        } 
        else{
            this.onFood = false;
        }
        desired.setMag(this.maxSpeed);
        return desired;
        
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