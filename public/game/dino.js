class Dino {
  constructor(x, y,s, textures) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.textures = textures;
    this.h = s;
    this.w = this.h * (this.textures[0].width/this.textures[0].height);
    this.basey = y - this.h;
    this.currTexIndex = 0;
    this.lastTextureChange = 0;//in frame count
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.y > this.basey) {
      this.pos.y = this.basey;
      this.vel.y = 0;
    }
    if (this.pos.y < 0) this.pos.y = 0; 
}
  
  show() {

    if(frameCount - this.lastTextureChange > (1/(dino_speed/128))){
      if(this.pos.y >= this.basey - 0.01){
       this.lastTextureChange = frameCount;
       if(this.currTexIndex) this.currTexIndex = 0;
       else this.currTexIndex = 1;
    }else this.currTexIndex = 2;

  }


    push();
    fill(10, 20, 200, 200);
    noStroke();
    stroke(255);
    noFill();
    // image(uImg, this.pos.x, this.pos.y, this.w, this.h);
    const currTexture = this.textures[this.currTexIndex];
  
    image(currTexture, this.pos.x, this.pos.y, this.w, this.h);

    rect(100,this.basey,10,10)
    
   //  noFill();
   // stroke(100,200);
    //rect(this.pos.x, this.pos.y, this.w, this.h);
    //ellipse(this.pos.x + this.w / 2, this.pos.y + this.h / 2,this.h);
    pop();
  }

  gravity() {
    if (this.pos.y < this.basey) this.vel.y += 1.5;
  }
  jump() {
    if (this.vel.y == 0) {
      const vel_y = 25;
      this.vel.y -= vel_y;
      jumpSound.play();
    }
  }
  collided(other) {
    return (
      this.pos.x + this.w > other.pos.x &&
      this.pos.x < other.pos.x + other.w &&
      this.pos.y + this.h > other.pos.y &&
      this.pos.y < other.pos.y + other.w
    );
  }
}
