class Hexagon {
  
  constructor(X, Y, N) {
    this.maxHealth = 500;
    this.health = 500;
    this.healthDecrement = 500;
    this.healthSubtractor = 1;
    this.ID = N;
    this.count = 0;
    this.bulletDamage = 0;
    this.damage = 50.0;
    this.xp = 800;
    this.driftX = 0;
    this.driftY = 0;
    this.drift = 0;
    this.acceleration = 0;
    this.startX = X;
    this.startY = Y;
    this.radian = radians(int(random(0, 360)));
    this.degrees = 0;
    this.xpos = 0;
    this.ypos = 0;
    this.squareWidth = 30;
    this.outline = color(235, 150, 214);
    this.hit = false;
    this.shove = false;
    this.showHealthBar = false;
    this.protagonist = false;
    
    this.driftX = cos(this.radian);
    this.driftY = sin(this.radian);
    this.xpos = this.startX + (this.driftX * this.drift);
    this.ypos = this.startY + (this.driftY * this.drift);

  }
  
  getHori(H) {
    this.hori = H;
  }
  
  getVert(V) {
    this.vert = V;
  }
  
  getHealthSubtractor(V) {
    this.healthSubtractor = V;
  }
  
  damaged(DMG, H, V, P) {
    this.hit = true;
    this.bulletDamage = DMG;
    this.showHealthBar = true;
    this.protagonist = P;
    this.driftX = H;
    this.driftY = V;
    this.startX = this.xpos - (this.driftX * this.drift);
    this.startY = this.ypos - (this.driftY * this.drift);
  }
  
  
  shoved(DMG, P) {
    this.shove = true;
    this.bulletDamage = DMG;
    this.showHealthBar = true;
    this.protagonist = P;
  }
  
  // Custom methods when Attributes increased
   incrementMaxHealth() { }
   incrementHealthRegen() { }
   incrementBulletSpeed() { }
   incrementBulletDamage() { healthSubtractor += 0.5; }
   incrementBulletDistance() { }
   incrementMovementSpeed() { }
   incrementBodyDamage() { }
  
  // Custom method for returning Variables
   returnXpos() { return  this.xpos; }
   returnYpos() { return  this.ypos; }
   returnWidth() { return  this.squareWidth; }
   returnHealth() { return  this.healthDecrement; }
   returnDamage() { return  this.damage; }
   returnXP() { return  this.xp; }
   returnID() { return  this.ID; }
   returnColor() { return  this.outline; }
   returnHit() { return  this.hit; }
  
  
  // Custom method for Polygon Drawing (AT CENTER)
   polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  
  
  // Custom method for drawing the object
   display() {
  
    this.xpos = this.startX + (this.driftX * this.drift);
    this.ypos = this.startY + (this.driftY * this.drift);
  
    // WHEN THE OPPONENTS SHOVE INTO HEXAGONS
  
    for (let o of opponents) {
      if (sqrt(sq(o.returnX() - this.returnXpos()) + sq(o.returnY() - this.returnYpos())) <= 60) {
        this.getHealthSubtractor(100);
        this.shoved(o.returnBodyDamage(), false);
        this.getHealthSubtractor(100);
        o.shoved(this.returnDamage());
        //particles.push(new Particle(p.returnXpos() + 15, p.returnYpos() + 15, p.returnColor(), 1));
      }
      if (this.returnHealth() <= 0) destroyedHexagons.push(this);
    }
  
    if (sqrt(sq(p.returnXpos() - this.returnXpos()) + sq(p.returnYpos() - this.returnYpos())) <= 60) {
      this.getHealthSubtractor(100);
      this.shoved(p.returnBodyDamage(), true);
      p.shoved(this.returnDamage());
      //particles.push(new Particle(p.returnXpos() + 15, p.returnYpos() + 15, p.returnColor(), 1));
    }
    if (this.returnHealth() <= 0) destroyedHexagons.push(this);
    
    
    push();
    translate(this.xpos, this.ypos + 6);
    rotate(degrees(this.degrees));
    fill(60);    // SHADOW
    this.polygon(0, 0, this.squareWidth, 6);
    pop();
    
    if (this.showHealthBar == true){
      // HEALTH BAR OUTLINE
      fill(60); 
      rect(this.xpos + 2 - 1 - (this.squareWidth / 2), this.ypos + 40 - 1, this.squareWidth + 2, 7); // need the y -1 for the top outline,  7 height, 5, increment
      ellipse(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40 - 1 + 3.5, 7, 7);
      ellipse(this.xpos + 2 + this.squareWidth - (this.squareWidth / 2), this.ypos + 40 - 1 + 3.5, 7, 7);
    
      if (this.healthDecrement > this.health){ // DECREMENT THE HEALTHBAR
        fill(0, 255, 0);
        rect(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40, this.squareWidth * (this.healthDecrement / this.maxHealth), 5);
        ellipse(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
        ellipse(this.xpos + 2 + this.squareWidth * (this.healthDecrement / this.maxHealth) - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
        this.healthDecrement -= this.healthSubtractor * m; // SOOO CLEAN!!
      } else{ // DO NOT MOVE HEALTH BAR
        fill(0, 255, 0);
        rect(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40, this.squareWidth * (this.health / this.maxHealth), 5);
        ellipse(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
        ellipse(this.xpos + 2 + this.squareWidth * (this.health / this.maxHealth) - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
      }
    }
    
    push();
    translate(this.xpos, this.ypos);
    rotate(degrees(this.degrees));
    
    if (this.hit == false && this.shove == false){ // DRAW REGULAR SQUARE OBJECT
      fill(235, 150, 214);
      this.polygon(0, 0, this.squareWidth, 6);
      fill(255, 170, 234);
      this.polygon(0, 0, this.squareWidth * 0.8, 6);
    } else {
      if (this.count == 0){
        if (this.hit == true){ 
          this.health -= this.bulletDamage; 
          this.acceleration += 0.01;
        }
        if (this.shove == true){
          this.health -= (this.bulletDamage * 1000); 
          this.acceleration += 0.08; 
          this.healthSubtractor = 50;
        }
      }
      if (this.count <= 10 / m){ // FLASH RED
        fill(235, 0, 0);   
        this.polygon(0, 0, this.squareWidth, 6);
        fill(255, 0, 0);
        this.polygon(0, 0, this.squareWidth * 0.8, 6);
      }
      if (this.count > 10 / m && this.count <= 20 / m){  // FLASH WHITE
        fill(235); 
        this.polygon(0, 0, this.squareWidth, 6);
        fill(255);
        this.polygon(0, 0, this.squareWidth * 0.8, 6);
      }
      if (this.count < 20 / m){this.count ++;} 
      else {this.hit = false; this.count = 0;}  // END THE HIT STAGE
    }
    
    this.degrees += 0.00005 * m;
    this.drift += (0.05 + this.acceleration) * m;
    pop();
  }
}