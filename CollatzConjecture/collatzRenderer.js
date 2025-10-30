class CollatzRenderer{
	constructor(pos){
        this.pos = pos;
        this.angle = 0.1;
        this.segmentLength = 10;

	}

    collatz(n){
        if (n % 2 == 0) { return int(n / 2); }
        else { return (3*n + 1);}
    }

    Render(){
        translate(this.pos.x, this.pos.y);
        stroke(255, 100);
        strokeWeight(1);
        for (let i = 2; i < 10000; i++)
        {
            // let n = random(1);
            let n = i;
            
            let allValues = [];
            while (n > 1){
                append(allValues, n);
                n = this.collatz(n);
            }
            append(allValues, 1);

            push();
            for (let j = allValues.length - 1; j >= 0; j--){
                let n = allValues[j];
                if (n%2 == 0) {rotate(this.angle);}
                else {rotate(-this.angle);}
                translate(0, -this.segmentLength);
                line(0, 0, 0, this.segmentLength);
            }
            pop();
        }
    }
}