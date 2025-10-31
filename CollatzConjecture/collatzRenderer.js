class CollatzRenderer{
	constructor(pos){
        this.pos = pos;
        this.angle = 8 / 180 * PI;
        this.segmentLength = 10;
        
        this.num_lines = 100;
        this.new_n = 1;
        this.line_complete = [];
        
        this.angle_list_idx = [];
        this.last_drawn_idx = [];
        this.angle_list = [];

        for (let i = 0; i < this.num_lines; i++){
            append(this.angle_list_idx, 0);
            append(this.last_drawn_idx, 0);
            append(this.angle_list, []);
            append(this.line_complete, false);
        }
	}

    collatz(n){
        if (n % 2 == 0) { return int(n / 2); }
        else { return int((3*n + 1) / 2);}
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
        // rotate(-PI/2);

        for (let i = 0; i < this.num_lines; i++){
            if (!this.line_complete[i])
            {
                let n = int(random(2, 100000));
                // n = 20001;
                // let n = i;
                
                while (n > 1){
                    let a = 0;
                    
                    if (n%2 == 0) {a = this.angle;}
                    else {a = -this.angle;}
                    
                    append(this.angle_list[i], a);
                    
                    n = this.collatz(n);
                }
                append(this.angle_list[i], -this.angle);

                this.line_complete[i] = true;
                this.angle_list_idx[i] = this.angle_list[i].length - 1;
                this.last_drawn_idx[i] = this.angle_list[i].length - 1;
            }
            else{
                push();
                for (let j = this.angle_list[i].length - 1; j >= this.angle_list_idx[i]; j--){
                    let a = this.angle_list[i][j];
                    translate(1 / log(i)*this.segmentLength, 0);
                    // translate(this.segmentLength, 0);
                    rotate(a);

                    if (j < this.last_drawn_idx[i]){
                        let h = i / this.angle_list[i].length * 255;
                        let s = 100;
                        let v = 200;
                        h = h%255;
                        stroke(h, s, v, 0.2);
                        // stroke(200, 100, 200);
                        // fill(h);
                        // rect(0, 0, 100, 100);
                        // stroke(120, 0, 200, 20);
                        strokeWeight(log(j));
                        line(0, 0, 1 / log(i)*this.segmentLength, 0);
                        // line(0, 0, this.segmentLength, 0);
                    }
                }
                pop();
                this.last_drawn_idx[i] = this.angle_list_idx[i];
                this.angle_list_idx[i] -= 1;

                if (this.angle_list_idx[i] <= 0){
                    this.angle_list[i] = [];
                    this.angle_list_idx[i] = 0;
                    this.last_drawn_idx[i] = 0;
                    this.line_complete[i] = false;
                }
            }
        }
        // else{
        //     for (let i = 0; i < this.num_lines; i++){
        //         for (let j = this.angle_list[i].length; j >= this.angle_list_idx[i]; j--){
        //             let a = this.angle_list[i][j];
        //             // translate(1 / log(i)*this.segmentLength, 0);
        //             translate(this.segmentLength, 0);
        //             rotate(a);
        //             if (j < this.last_drawn_idx[i]){
        //                 let h = i /this.angle_list.length * 1000;
        //                 let s = 0;
        //                 let v = 200;
        //                 h = h%255;
        //                 stroke(h, s, v, 20);
        //                 // stroke(200, 0, 200, 20);
        //                 // stroke(120, 0, 200, 20);
        //                 strokeWeight(log(j));
        //                 // line(0, 0, 1 / log(i)*this.segmentLength, 0);
        //                 line(0, 0, this.segmentLength, 0);
        //             }
        //         }
        //     }
        //     this.last_drawn_idx[i] = this.angle_list_idx[i];
        //     this.angle_list_idx[i] -= 1;
            
        //     if (this.angle_list_idx[i] <= 0){
        //         this.angle_list[i] = [];
        //         this.angle_list_idx[i] = 0;
        //         this.last_drawn_idx[i] = 0;
        //         this.line_complete[i] = false;
        //         // this.angle_list_idx = 0;

        //         // for (let i = 0; i < this.num_lines; i++){
        //         //     append(this.angle_list_idx, 0);
        //         //     append(this.last_drawn_idx, 0);
        //         //     append(this.angle_list, []);
        //         // }
        //     }
        // }        
    }
}