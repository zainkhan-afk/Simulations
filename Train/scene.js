class Scene{
	constructor(){
        this.backgroundHills = new BackgroundHills();
        this.treeLine1 = new TreeLine(0.7*windowHeight, 100, 1);
        this.treeLine2 = new TreeLine(0.7*windowHeight, 100, 3);
        this.bridge = new Birdge();
        this.angOffset = 0;
    }

    Reflection(){
        let crop = get(0, 0, windowWidth, 0.7*windowHeight);
        let img = createImage(crop.width, windowHeight - crop.height); 
        img.copy(crop, 0, crop.height - img.height, crop.width, img.height, 
                                        0, 0, img.width, img.height);

        console.log(crop);
        console.log(img);
        console.log("----------")

        // let imgCopy = createImage(img.width, img.height); 
        // imgCopy.copy(img, 0, 0, img.width, img.height, 
        //                                 0, 0, imgCopy.width, imgCopy.height);

        img.loadPixels();
        // imgCopy.loadPixels();
        
        // let angX = this.angOffset;
        for (let x = 0; x < 4*img.width; x+=4){
            // let angY = this.angOffset;
            for (let y = img.height; y > -1; y--){
                let i = x + y*4*img.width;
                
                // let newX = floor(x/4) + int(10*sin(angY));
                // if (newX < 0) { newX = 0; }
                // if (newX >= img.width) { newX = img.width - 1; }
                // newX = newX * 4;
                
        //         let newY = y + int(1*sin(angX));
        //         if (newY < 0) { newY = 0; }
        //         if (newY >= img.height) { newY = img.height - 1; }
                // let newI = newX + y*4*img.width;;
                
                // img.pixels[i] = imgCopy.pixels[newI];
                // img.pixels[i + 1] = imgCopy.pixels[newI + 1];
                // img.pixels[i + 2] = imgCopy.pixels[newI + 2];
                // img.pixels[i + 3] = imgCopy.pixels[newI + 3];
                // img.pixels[i] = 200;
                img.pixels[i+1] *= 0.9;
                img.pixels[i+2] *= 0.7;
                
                // angY += 0.1;
            }
        //     angX += 0.2;
        }
        // this.angOffset += 0.1;
        // // console.log(img.pixels.length, img.width*img.height)
        img.updatePixels();
        
        push();
        translate(0, 1.0001*windowHeight);
        scale(1, -1);
        image(img, 0, 0);
        pop();
    }
    
    Render()
    {
        fill(0);
        text(int(frameRate()), 20, 30);
        this.backgroundHills.Render();
        this.treeLine1.Render();
        this.treeLine2.Render();
        this.bridge.Render();
        
        this.Reflection();
    }

    Step(){
        this.backgroundHills.Step();
        this.treeLine1.Step();
        this.treeLine2.Step();
        this.bridge.Step();
    }
}