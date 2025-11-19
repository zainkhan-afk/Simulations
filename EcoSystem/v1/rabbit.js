class Rabbit extends Creature {
    constructor(pos){
        super(pos);
        this.size = 10;
        this.color = color(100, 100, 100);
        this.color_m = color(100, 100, 200);
        this.color_f = color(200, 100, 100);
        this.name = "rabbit";
        this.type = "herbivor";
    }
}