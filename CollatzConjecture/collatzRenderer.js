class CollatzRenderer{
	constructor(pos){
        this.pos = pos;
        this.angle = 0.15;
        this.segmentLength = 5;
        
        this.new_n = 1;
        this.incremental_n_list = [];
        this.incremental_angle_list = [];
        this.line_complete = false;
        this.incremental_n_list_idx = 0;
        this.incremental_translate = createVector(0, 0);
        this.incremental_rotation = 0;
	}

    collatz(n){
        if (n % 2 == 0) { return int(n / 2); }
        else { return (3*n + 1) / 2;}
    }

    Render(){
        translate(this.pos.x, this.pos.y);
        for (let i = 2; i < 3; i++)
        {
            let n = int(random(2, 100000));
            // let n = i;
            n = 20001;
            
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
                line(0, 0, this.segmentLength, 0);
                translate(this.segmentLength, 0);
            }
            pop();
        }
    }

    RenderIncremental(){
        translate(this.pos.x, this.pos.y);
        stroke(0, 50);
        strokeWeight(1);

        if (!this.line_complete)
        {
            // this.new_n = int(random(2, 100000));
            let n = int(random(2, 100000));
            // n = 20001;
            // let n = i;
            
            while (n > 1){
                let a = 0;
                
                if (n%2 == 0) {a = this.angle;}
                else {a = -this.angle;}
                
                append(this.incremental_n_list, n);
                append(this.incremental_angle_list, a);
                
                n = this.collatz(n);
            }
            append(this.incremental_n_list, 1);
            append(this.incremental_angle_list, -this.angle);

            this.line_complete = true;
            this.incremental_n_list_idx = this.incremental_n_list.length - 1;
        }
        else{
            for (let i = this.incremental_angle_list.length; i >= this.incremental_n_list_idx; i--){
                let a = this.incremental_angle_list[i];
                rotate(a);
                translate(this.segmentLength, 0);
            }
            line(0, 0, this.segmentLength, 0);
        }

        this.incremental_n_list_idx -= 1;

        if (this.incremental_n_list_idx <= 0){
            this.incremental_n_list = [];
            this.incremental_angle_list = [];
            this.line_complete = false;
            this.incremental_translate = this.pos.copy();
            this.incremental_rotation = 0;
            this.incremental_n_list_idx = 0;

        }
    }
}