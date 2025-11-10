class Face{
	constructor(pos){
        this.pos = pos;
        this.face_base = loadImage('/Faces/face_no_eye.png');
        this.face_eye_holes = loadImage('/Faces/face_1.png');
        this.face_eye_lids = loadImage('/Faces/eyelids.png');
        this.eye = loadImage('/Faces/eye.png');
        
        this.face_image_height = 200;
        this.eye_image_height = 20;
        
        this.face_base.resize(0, this.face_image_height);
        this.face_eye_holes.resize(0, this.face_image_height);
        this.face_eye_lids.resize(0, this.face_image_height);
        this.eye.resize(this.eye_image_height, this.eye_image_height);
        
        this.left_eye_pos_anchor = createVector(this.pos.x - 0.14*this.face_base.width, this.pos.y - 0.11*this.face_base.width);
        this.right_eye_pos_anchor = createVector(this.pos.x + 0.16*this.face_base.width, this.pos.y - 0.11*this.face_base.width);

        this.left_eye_pos = this.left_eye_pos_anchor.copy();
        this.right_eye_pos = this.right_eye_pos_anchor.copy();

        this.angle = 0;
	}
    
    Render(){
        imageMode(CENTER);
        this.face_base.resize(0, this.face_image_height);
        this.face_eye_holes.resize(0, this.face_image_height);
        this.face_eye_lids.resize(0, this.face_image_height);
        let currentEye = createImage(this.eye.width, this.eye.height); 
        currentEye.copy(this.eye, 0, 0, this.eye.width, this.eye.height, 
                                        0, 0, currentEye.width, currentEye.height);
        currentEye.resize(this.eye_image_height, this.eye_image_height);
        
        // this.left_eye_pos = createVector(this.pos.x - 0.2*this.face.width, this.pos.y - 0.15*this.face.width);
        // this.right_eye_pos = createVector(this.pos.x + 0.2*this.face.width, this.pos.y - 0.15*this.face.width);
        
        image(this.face_base, this.pos.x, this.pos.y);
        image(currentEye, this.left_eye_pos.x, this.left_eye_pos.y);
        image(currentEye, this.right_eye_pos.x, this.right_eye_pos.y);
        image(this.face_eye_lids, this.pos.x, this.pos.y + 15*(1 + cos(this.angle)) / 2);
        image(this.face_eye_holes, this.pos.x, this.pos.y);
    }

    Step(){
        // this.left_eye_pos_anchor = createVector(this.pos.x - 0.2*this.face.width, this.pos.y - 0.15*this.face.width);
        // this.left_eye_pos_anchor = createVector(this.pos.x + 0.2*this.face.width, this.pos.y - 0.15*this.face.width);
        // this.left_eye_pos = this.left_eye_pos_anchor.copy();
        // this.right_eye_pos = this.right_eye_pos_anchor.copy();
        let mousePos = createVector(mouseX, mouseY);
        this.left_eye_pos = p5.Vector.sub(mousePos, this.left_eye_pos_anchor);
        this.left_eye_pos.limit(5);
        this.left_eye_pos.add(this.left_eye_pos_anchor);

        this.right_eye_pos = p5.Vector.sub(mousePos, this.right_eye_pos_anchor);
        this.right_eye_pos.limit(5);
        this.right_eye_pos.add(this.right_eye_pos_anchor);

        this.angle += 0.1;
    }
}