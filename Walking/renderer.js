class Renderer {
    constructor() {
        this.footsteps = [];
    }

    DebugGrid() {
        strokeWeight(1);
        stroke(0);
        text(round(frameRate()), 0, 10);

        let squareW = 10;
        let squareH = 10;
        
        let numRows = windowHeight / squareH;
        let numCols = windowWidth / squareW;

        stroke(220);
        for (let r = 0; r < numRows; r++) 
        {
            line(0, r*squareH, windowWidth, r*squareH);
        }
        for (let c = 0; c < numCols; c++) 
        {
            line(c*squareW, 0, c*squareW, windowHeight);
        }
    }

    render(sim) {
        // this.DebugGrid();
        for (let i = 0; i < sim.people.length; i++) {
            let person = sim.people[i];
            stroke(0);
            strokeWeight(1);

            fill(0, 0, 0);
            push();
            translate(person.leftFootPos.x, person.leftFootPos.y);
            rotate(person.vel.heading());
            ellipse(0, 0, 10, 5);
            pop();

            push();
            translate(person.rightFootPos.x, person.rightFootPos.y);
            rotate(person.vel.heading());
            ellipse(0, 0, 10, 5);
            pop();

            
            strokeWeight(5);
            stroke(0, 100, 200);
            line(person.leftFootPos.x, person.leftFootPos.y, person.leftFootAnchor.x, person.leftFootAnchor.y);
            
            
            stroke(0, 100, 200);
            line(person.rightFootPos.x, person.rightFootPos.y, person.rightFootAnchor.x, person.rightFootAnchor.y);

            let leftFootAnchorDiff = p5.Vector.sub(person.leftFootAnchor, person.leftFootPos);
            let rightFootAnchorDiff = p5.Vector.sub(person.rightFootAnchor, person.rightFootPos);
            
            // strokeWeight(2);
            // stroke(0, 255, 0);
            // line(person.leftFootPos.x - 30*cos(leftFootAnchorDiff.heading()), person.leftFootPos.y - 30*sin(leftFootAnchorDiff.heading()), person.leftFootAnchor.x, person.leftFootAnchor.y);
            // stroke(255, 0, 0);
            // line(person.rightFootPos.x - 30*cos(rightFootAnchorDiff.heading()), person.rightFootPos.y - 30*sin(rightFootAnchorDiff.heading()), person.rightFootAnchor.x, person.rightFootAnchor.y);

            // stroke(0);
            // strokeWeight(1);
            // let angles = [-30, 0, 30];
            // for (let  i = 0; i < angles.length; i++){
            //     let a = angles[i] / 180 * PI;
            //     line(person.leftFootPos.x - 30*cos(person.vel.heading() + a), person.leftFootPos.y - 30*sin(person.vel.heading() + a), person.leftFootAnchor.x, person.leftFootAnchor.y);
            //     line(person.rightFootPos.x - 30*cos(person.vel.heading() + a), person.rightFootPos.y - 30*sin(person.vel.heading() + a), person.rightFootAnchor.x, person.rightFootAnchor.y);
            // }

            
            stroke(0);
            strokeWeight(1);
            push();
            translate(person.pos.x, person.pos.y);
            rotate(person.vel.heading());
            fill(255, 0, 0);
            ellipse(0, 0, 10, person.bodyHeight);
            fill(0, 0, 0);
            circle(5, 0, 6);
            pop();
            
            // strokeWeight(2);
            // stroke(0, 255, 0);
            // line(person.leftFootAnchor.x + 30*cos(person.vel.heading()), person.leftFootAnchor.y + 30*sin(person.vel.heading()), person.leftFootAnchor.x, person.leftFootAnchor.y);
            // stroke(255, 0, 0);
            // line(person.rightFootAnchor.x + 30*cos(person.vel.heading()), person.rightFootAnchor.y + 30*sin(person.vel.heading()), person.rightFootAnchor.x, person.rightFootAnchor.y);

            

            
            // fill(0, 0, 0);
            // let leftFoot = person.GetLocalFootPos(0);
            // let rightFoot = person.GetLocalFootPos(1);

            // ellipse(leftFoot.x, leftFoot.y, 10, 5);
            // ellipse(rightFoot.x, rightFoot.y, 10, 5);
            

            
            // fill(0, 0, 0);
            // fill(person.foot1Color);
            // ellipse(person.foot1 + 3, 5.5, 10, 5);
            // fill(person.foot2Color);
            // ellipse(person.foot2 + 3, -5.5, 10, 5);
            
            // fill(0, 50, 200);
            // rect(0, 3, person.foot1, 5);
            // rect(0, -8, person.foot2, 5);

            
            // fill(person.color);
            // ellipse(0, 0, 10, 20);
            // fill(0, 0, 0);
            // circle(0, 0, 12);
            // pop();
        }
    }
}