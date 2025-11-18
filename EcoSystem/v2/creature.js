class Creature{
    constructor(pos){
        this.pos = pos;
        this.gender;

        if (random() > 0.5){
            this.gender = "m";
        }else{
            this.gender = "f";
        }

        this.size = 10;
        this.energy = 100;
        this.foodMatter = 10;
        this.age = 0;
        this.alive = true;
        
        this.maxSpeed = 2;
        this.maxForce = 1;
        this.maxHealth = 100;
        
        this.maxAge = 1000;
        this.reproductionAge = this.maxAge * 0.10;
        
        this.ageInc = 1;
        
        this.consumptionRate = 1.0;
        
        this.energyMovement = 0.1;
        this.energyReproduction = 0.25;
        
        this.isHungry = false;
        this.readyToReproduce = false;
        this.findPartner = false;
        this.flee = false;
        
        this.reproduceCooldown = 0;
        this.reproduceCooldownThresh = 100;

        this.target = null;
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
        
        if (!this.isHungry) {
            if (this.readyToReproduce){
                if (random() < 0.2){
                    if (this.reproduceCooldown > this.reproduceCooldownThresh){
                        this.findPartner = true;
                    }
                }
            }
        }
        // this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        // this.acc.mult(0);

        this.age += this.ageInc;
        this.energy -= self.energyMovement;

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

        if (this.age >= this.reproductionAge){
            this.readyToReproduce = true;
        }

        if (this.readyToReproduce){
            this.reproduceCooldown += 0.1;
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
        if (desired.mag() < this.size / 2) {
            this.onTarget = true;
            return createVector(0, 0);
        } 
        else{
            this.onTarget = false;
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

    reproduce(other) {
        this.findPartner = false;
        other.findPartner = false;
        this.reproduceCooldown = 0;
        other.reproduceCooldown = 0;
        if (random() < 0.4){
            const child = new this.constructor(createVector(other.pos.x + random(2, 7), other.pos.y + random(2, 7)));
            return child
        }
        return null;
    }
}