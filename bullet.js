class Bullet {

  constructor(B, X, Y, H, V, S, D, C, BD, P) {
    this.bulletAngle = B;
    this.startX = X;
    this.startY = Y;
    this.hori = H;
    this.vert = V;
    this.bulletSpeed = S * m;
    this.bulletDistance = 0;
    this.bulletDamage = D;
    this.colour = C;
    this.protagonist = P;
    this.dist = BD;
  }


  // Custom method for updating the variables
  getHori(H) {
    this.hori = H;
  }
  
  getVert(V) {
    this.vert = V;
  }
  
  // Custom method for returning Variables
  returnXpos() {
    return this.xpos;
  }
  
  returnYpos() {
    return this.ypos;
  }
  
  returnBulletDamage() {
    return this.bulletDamage;
  }
  
  returnBulletDistance() {
    return this.bulletDistance;
  }
  
  returnHori() {
    return this.hori;
  }
  
  returnVert() {
    return this.vert;
  }
  
  returnProtagonist() {
    return this.protagonist;
  }
  
    display() {
    if (this.returnProtagonist() == true){
      if (this.returnBulletDistance() >= p.returnBulletDistance()) {
        dysfunctionalBullets.push(this)};
    }
    
    if (this.returnProtagonist() == false){
        if (this.returnBulletDistance() >= this.dist)dysfunctionalBullets.push(this);
    }
    
    // WHEN BULLET HITS A SQUARE
    
    for (let s of squares){
        if (s.returnHit() == false && this.returnXpos() > s.returnXpos() &&
            this.returnXpos() < (s.returnXpos() + s.returnWidth()) &&
            this.returnYpos() > s.returnYpos() &&
            this.returnYpos() < (s.returnYpos() + s.returnWidth())){
            
            s.damaged(this.bulletDamage, this.returnHori(), this.returnVert(), this.protagonist);
            particles.push(new Particle(s.returnXpos() + 15, s.returnYpos() + 15, s.returnColor(), 2));
            if (s.returnHealth() <= 0)if (destroyedSquares.includes(s)){} else {destroyedSquares.push(s);}
        }
        
    }
    
    // WHEN BULLET HITS A PENTAGON
    
    for (let f of pentagons){
        if (sqrt(sq(this.returnXpos() - f.returnXpos()) + sq(this.returnYpos() - f.returnYpos())) <= 25 && f.returnHit() == false){ 
            f.damaged(this.bulletDamage, this.returnHori(), this.returnVert(), this.protagonist);
            particles.push(new Particle(f.returnXpos(), f.returnYpos(), f.returnColor(), 2));
          if (f.returnHealth() <= 0){if (destroyedPentagons.includes(f)){} else {destroyedPentagons.push(f);}}
        }
        
    }
    
    // WHEN BULLET HITS A HEXAGON
    
    for (let h of hexagons){
        if (sqrt(sq(this.returnXpos() - h.returnXpos()) + sq(this.returnYpos() - h.returnYpos())) <= 25 && h.returnHit() == false){ 
            h.damaged(this.bulletDamage, this.returnHori(), this.returnVert(), this.protagonist);
            particles.push(new Particle(h.returnXpos(), h.returnYpos(), h.returnColor(), 2));
          if (h.returnHealth() <= 0)if (destroyedHexagons.includes(h)){} else {destroyedHexagons.push(h);}
        }
        
    }
    
    // WHEN BULLET HITS AN OPPONENT
    
    for (let o of opponents){
        if (sqrt(sq(o.returnX() - this.returnXpos()) + sq(o.returnY() - this.returnYpos())) <= 55 && this.protagonist == true){ 
            if (o.returnBulletHistory().includes(this)){} else {
                o.getBullet(this);
                o.shoved(this.bulletDamage);
                particles.push(new Particle(o.returnX(), o.returnY(), o.returnColor(), 5));
            }
        }
        if (o.returnHealth() <= 0)if (destroyedOpponents.includes(o)){} else {destroyedOpponents.push(o);}
    }
    
    // MOVE THE BULLET IN THE ANGLE IT WAS SHOT AT
    
    this.xpos = (width / 2) + this.startX + (this.hori * this.bulletAngle);
    this.ypos = (height / 2)+ this.startY + (this.vert * this.bulletAngle);
    
    fill(20);
    ellipse(this.xpos, this.ypos + 5, 20, 20);
    this.bulletAngle += this.bulletSpeed;
    
    fill(this.colour);
    ellipse(this.xpos, this.ypos, 20, 20);
    fill(this.colour);
    ellipse(this.xpos, this.ypos, 20 - 7, 20 - 7);
    
    this.bulletAngle += this.bulletSpeed;
    this.bulletDistance += 1;
  }
}
