class Protagonist {
  
    constructor(X, Y, C) {
      this.barrel = 20;
    
      this.healthRegen = 240.0 / m;
      this.healing = 1.0;
      this.maxHealth = 100;
      this.healthDecrement = 100;
      this.health = 100;
      this.healthSubtractor = 1.0;
      this.damageTaken = 0;
      this.size = 80;
    
      this.bulletSubtractor = 1.0;
    
      this.count = 0;
      this.outline = color(0, 180, 235);
      this.bulletColor = color(0, 200, 255);
    
      this.bodyDamage = 20.0;
      this.reload = 0.5;
      this.movementSpeed = 1;
    
      this.acceleration = 0.004;
      this.velocityX = 0;
      this.velocityY = 0;
    
      this.bulletSpeed = 1;
      this.bulletDamage = 30.0;
      this.bulletDistance = 20;
      this.recoil = 0.1;
    
      this.xp = 0;
      this.xpIncrement = 0;
      this.xpAdder = 5.0;
      this.level = 1;
      this.levelRequirements = 1000;
      this.points = 0;
      this.ePoints = 0;
    
      this.startX = X;
      this.startY = Y;
      this.x = 0.0;
      this.y = 0.0;
      this.xpos = 0.0;
      this.ypos = 0.0;
    
      this.hori = cos(0);
      this.vert = sin(0);
      this.horiOpp = 0.0;
      this.vertOpp = 0.0;
    
      this.shove = false;
      this.showHealthBar = false;
      // this.showChart = false;
      this.bulletsHit = [];
    
      this.c = C;
    }
    
    // Custom method for updating the variables
    Goleft() {   
      if (this.velocityX > (-1 * this.movementSpeed)) { 
        this.velocityX -= this.acceleration * m; 
      }
      this.x += this.velocityX * m;
    }
        
    Goright() {
      if (this.velocityX < this.movementSpeed) { 
        this.velocityX += this.acceleration * m; 
      }
      this.x += this.velocityX * m;
    }
    
    Goup() {
      if (this.velocityY > (-1 * this.movementSpeed)) { 
        this.velocityY -= this.acceleration * m; 
      }
      this.y += this.velocityY * m;
    }
      
    Godown() {
      if (this.velocityY < this.movementSpeed) { 
        this.velocityY += this.acceleration * m; 
      }
      this.y += this.velocityY * m;
    }
     
    GoleftFalse() {   
      if (this.velocityX < 0) { 
        this.velocityX += this.acceleration * m; 
      }
      this.x += this.velocityX * m;
    }
        
    GorightFalse() {
      if (this.velocityX > 0) { 
        this.velocityX -= this.acceleration * m; 
      }
      this.x += this.velocityX * m;
    }
      
    GoupFalse() {
      if (this.velocityY < 0) { 
        this.velocityY += this.acceleration * m; 
      }
      this.y += this.velocityY * m;
    }
        
    GodownFalse() {
      if (this.velocityY > 0) { 
        this.velocityY -= this.acceleration * m; 
      }
      this.y += this.velocityY * m;
    }
      
     getHori(H) { 
      this.hori = H; 
    }
    
     getVert(V) { 
      this.vert = V; 
    }
    
     getHoriOpp(H) { 
      this.horiOpp = H; 
      this.velocityX += (H * this.recoil);
    }
    
     getVertOpp(V) { 
      this.vertOpp = V;  
      this.velocityY += (V * this.recoil);
    }
    
     getShowChart(S) { 
      showChart = S; 
    }
    
     incrementXP(XP) { 
      this.xp += XP; 
      this.totalXP += XP;  //global
    }
    
     getBullet(B) { 
      this.bulletsHit.push(B); 
    }
    
     incrementMaxHealth() { 
      if (this.ePoints <= 0) { 
        this.points--; 
      } 
      this.maxHealth += 30;  
      this.healthDecrement += 30; 
      this.health += 30; 
      if (this.points == 0 && this.ePoints == 0) { 
        c.hideChart(); 
      }
    }
      
     incrementHealthRegen() { 
      if (this.ePoints <= 0) { 
        this.points--; 
      } 
      this.healthRegen -= 4; 
      this.healing += 0.1;  
      if (this.points == 0 && this.ePoints == 0) { 
        c.hideChart(); 
      }
    }
    
     incrementBulletSpeed() { 
      if (this.ePoints <= 0) { 
        this.points--; 
      } 
      this.bulletSpeed += 0.1;  
      if (this.points == 0 && this.ePoints == 0) { 
        c.hideChart(); 
      }
    }
    
     incrementBulletDamage() { 
      if (this.ePoints <= 0) { 
        this.points--; 
      } 
      this.bulletDamage += 5; 
      this.bulletSubtractor += 0.5;  
      if (this.points == 0 && this.ePoints == 0) { 
        c.hideChart(); 
      }
    }
    
     incrementBulletDistance() { 
      if (this.ePoints <= 0) { this.points--; } 
      this.bulletDistance += 4;  
      if (this.points == 0 && this.ePoints == 0) { c.hideChart(); }
    }
    
     incrementMovementSpeed() { 
      if (this.ePoints <= 0) { this.points--; } 
      this.movementSpeed += 0.04; 
      this.acceleration += 0.0001;   
      if (this.points == 0 && this.ePoints == 0) { c.hideChart(); }
    }
    
     incrementBodyDamage() { 
      if (this.ePoints <= 0) { this.points--; } 
      this.bodyDamage += 10;  
      if (this.points == 0 && this.ePoints == 0) { c.hideChart(); }
    }
    
    shoved(DMG) {
      this.shove = true;
      this.damageTaken = DMG;
      this.showHealthBar = true;
    }
    
    // Custom method for returning variables
     returnXpos() { return  this.xpos; }
     returnYpos() { return  this.ypos; }
     returnX() { return this.x; }
     returnY() { return this.y; }
     returnHori() { return  this.hori; }
     returnVert() { return  this.vert; }
    
     returnBulletSpeed() { return  this.bulletSpeed; }
     returnBulletDistance() { return  this.bulletDistance; }
     returnBulletDamage() { return  this.bulletDamage; }
     returnBodyDamage() { return  this.bulletDamage; }
     returnHealthRegen() { return  this.healthRegen; }
     returnBulletSubtractor() { return  this.bulletSubtractor; }
     returnReload() { return  this.reload; }
    
     returnVelocityX() { return  this.velocityX; }
     returnVelocityY() { return  this.velocityY; }
    
     returnPoints() { return  this.points + this.ePoints; }
     returnColor() { return  this.outline; }
     returnBulletColor() { return  this.bulletColor; }
     returnBulletHistory() { return  this.bulletsHit; }
     returnLevel() { return  this.level; }
     returnHealth() { return  this.healthDecrement; }
    
     incrementHealth() { 
      if (this.health < this.maxHealth) { 
        if ((this.health + this.healing) > this.maxHealth) { 
          this.health += (this.maxHealth - this.health);
        } else {
          this.health += this.healing; 
        }
      } 
      if (this.health >= this.maxHealth) { 
        this.showHealthBar = false; 
        this.health = this.maxHealth; 
      }
      return 0; 
    }
    
    
    // Custom method for drawing the object
     display() {
    
      this.xpos = this.startX + this.x;
      this.ypos = this.startY + this.y;
      fill(50);
      ellipse(this.xpos, this.ypos + 5, this.size, this.size);    // SHADOW
    
      if (this.showHealthBar == true){
    
        // HEALTH BAR OUTLINE
        rect(this.xpos + 2 - 1 - (this.size / 2), this.ypos + 60 - 1, this.size + 2, 7);
        ellipse(this.xpos + 2 - 1 - (this.size / 2), this.ypos + 60 - 1 + 3.5, 5, 5);
        ellipse(this.xpos + 2 - 1 + this.size + 2 - (this.size / 2), this.ypos + 60 - 1 + 3.5, 7, 7);
    
        if (this.healthDecrement > this.health){  // DECREMENT THE HEALTHBAR
          fill(0, 255, 0);
          rect(this.xpos + 2 - (this.size / 2), this.ypos + 60, this.size * (this.healthDecrement / this.maxHealth), 5);
          ellipse(this.xpos + 2 - (this.size / 2), this.ypos + 60 + 2.5, 5, 5);
          ellipse(this.xpos + 2 + this.size * (this.healthDecrement / this.maxHealth) - (this.size / 2), this.ypos + 60 + 2.5, 5, 5);
    
          this.healthDecrement -= 0.2 * m;    // SOOO CLEAN!!
    
        } else{  // DO NOT MOVE HEALTH BAR
          fill(0, 255, 0);
          rect(this.xpos + 2 - (this.size / 2), this.ypos + 60, this.size * (this.health / this.maxHealth), 5);
          ellipse(this.xpos + 2 - (this.size / 2), this.ypos + 60 + 2.5, 5, 5);
          ellipse(this.xpos - (this.size / 2) + 2 + (this.size * (this.health / this.maxHealth)), this.ypos + 60 + 2.5, 5, 5);
        }
      }
    
      if (this.shove == false){    // DRAW REGULAR SQUARE OBJECT
    
        fill(0, 180, 235);
        ellipse(this.xpos, this.ypos, this.size, this.size);
        fill(0, 200, 255);
        ellipse(this.xpos, this.ypos, this.size - 12, this.size - 12);
    
        // AIMER
        fill(20);
        ellipse(this.xpos + (this.hori * 60), this.ypos + (this.vert * 60) + 5, this.barrel * 1, this.barrel * 1);
        fill(0, 180, 235);
        ellipse(this.xpos + (this.hori * 60), this.ypos + (this.vert * 60), this.barrel * 1, this.barrel * 1);
        fill(0, 200, 255);
        ellipse(this.xpos + (this.hori * 60), this.ypos + (this.vert * 60), this.barrel * 1 - 6, this.barrel * 1 - 6);
      } 
      
      if (this.shove == true){
        if (this.count == 0){this.health -= (this.damageTaken); } // REALLY COOL JUST ONE TIME HIT
        if (this.count <= 10 / m){    // FLASH RED
          fill(235, 0, 0); ellipse(this.xpos, this.ypos, this.size, this.size);
          fill(255, 0, 0); ellipse(this.xpos, this.ypos, this.size - 12, this.size - 12);
          
          // AIMER
          fill(20); ellipse(this.xpos + (this.hori * 60), this.ypos  + (this.vert * 60) + 5, this.barrel * 1, this.barrel * 1);
          fill(255, 0, 0); ellipse(this.xpos + (this.hori * 60), this.ypos + (vert * 60), this.barrel * 1, this.barrel * 1);
        }
        if (this.count > 10 / m && this.count <= 20 / m){  // FLASH WHITE
          fill(235); ellipse(this.xpos, this.ypos, this.size, this.size);
          fill(255); ellipse(this.xpos, this.ypos, this.size - 12, this.size - 12);
          
          // AIMER
          fill(20); ellipse(this.xpos + (this.hori * 60), this.ypos  + (this.vert * 60) + 5, this.barrel * 1, this.barrel * 1);
          fill(255); ellipse(this.xpos + (this.hori * 60), this.ypos + (this.vert * 60), this.barrel * 1, this.barrel * 1);
        }
        if (this.count < 20 / m){this.count ++;} else {this.shove = false; this.count = 0;}  // END THE HIT STAGE
      }
    }
      
     hud(){
      // WHEN THE LEVEL UP BAR IS FULL, INCREASE LEVEL AND LEVEL REQUIREMENTS
      if (this.xpIncrement >= this.levelRequirements){ 
        this.level ++; this.points ++; 
        this.xp -= this.levelRequirements; 
        this.xpIncrement = 0; 
        this.xpAdder += 0.2; 
        this.levelRequirements += 250; 
        
        if (this.points >= 1) c.showChart(this.points);
      }
      
      fill(50, 50, 50, 200);
      rect(width / 2 - 105, (height * 0.15) - 50, 210, 30); // BAR OUTLINE
      arc(width / 2 - 105, (height * 0.15) - 50 + 15, 30, 30, HALF_PI, PI + HALF_PI);
      arc(width / 2 + 105, (height * 0.15) - 50 + 15, 30, 30, -HALF_PI, HALF_PI);
    
      textSize(30);
      textAlign(CENTER);
    
      // DRAW THE LEVEL TEXT
      for (let x = -4; x < 4; x++) {
        for (let y = -4; y < 4; y++) {
          text("LEVEL  " + this.level, (width / 2) + x, (height * 0.15) - 60 + y);
        }
      }
      fill(255);
      for (let x = -2; x < 2; x++) {
        for (let y = -2; y < 2; y++) {
          text("LEVEL  " + this.level, (width / 2) + x, (height * 0.15) - 60 + y);
        }
      }
    
      // DRAW HOW MUCH EXP PLAYER HAS RELATIVE TO LEVEL BAR LENGTH
      if (this.xpIncrement < this.xp) {
        ellipse(width / 2 - 105, (height * 0.15) - 45 + 10, 20, 20);
        rect(
          width / 2 - 105,
          (height * 0.15) - 45,
          200.0 * (this.xpIncrement / this.levelRequirements),
          20
        );
        ellipse(
          width / 2 - 105 + 200.0 * (this.xpIncrement / this.levelRequirements),
          (height * 0.15) - 45 + 10,
          20,
          20
        );
    
        this.xpIncrement += this.xpAdder * m; // SOOO CLEAN!!
      } else {
        rect(width / 2 - 105, (height * 0.15) - 45, 200.0 * (this.xp / this.levelRequirements), 20);
        ellipse(width / 2 - 105, (height * 0.15) - 45 + 10, 20, 20);
        ellipse(
          width / 2 - 105 + 200.0 * (this.xp / this.levelRequirements),
          (height * 0.15) - 45 + 10,
          20,
          20
        );
      }
    }
  }
    
    // BONUS CODE
    /*
    function upRight() {
      x += sqrt(movementSpeed / 2);
      y -= sqrt(movementSpeed / 1.2);
    }
    function upLeft() {
      x -= sqrt(movementSpeed / 2);
      y -= sqrt(movementSpeed / 1.2);
    }
    function downRight() {
      x += sqrt(movementSpeed / 2);
      y += sqrt(movementSpeed / 1.2);
    }
    function downLeft() {
      x -= sqrt(movementSpeed / 2);
      y += sqrt(movementSpeed / 1.2);
    }
    */





class Opponent {
  
  constructor(X, Y, BS, BS2, BD, BD2, D, D2, MS, MS2, R, R2, S, S2, MH, MH2, BR, BR2, B) {
    // this.maxHealth = 1000;
    // this.healthDecrement = 1000;
    // this.health = 1000;
    this.healthSubtractor = 1.0;
    this.damageTaken = 0;
    this.bulletSubtractor = 1.0;
    this.size = 80;
  
    this.count = 0;
    this.outline = color(225, 0, 0);
    this.bulletColor = color(255, 0, 0);
  
    this.bodyDamage = 20.0;
    // this.movementSpeed = 1;
    // this.bulletSpeed = 1;
    this.bulletDamage = 10.0;
    // this.bulletDistance = 50;
    // this.bulletReload = 0.4;
    // this.range = 300;
    // this.sight = 500;
  
    // this.barrels = 1;
  
    this.fireRate = 0;
  
    // this.startX = X;
    // this.startY = Y;
    this.dist = 0;
  
    this.hori = cos(0);
    this.vert = sin(0);
  
    this.shove = false;
    this.showHealthBar = false;

    // this.showChart = false;
    this.inRange = false;
  
    this.a = 0; 
    this.b = 0;
    this.d = 0; 
    this.e = 0; 
    this.r = 0; 
    this.rr = 0; 
    this.rl = 0; 
    this.rb = 0; 
    this.rf = 0;
    this.j = 0; 
    this.k = 0; 
    this.jr = 0; 
    this.kr = 0; 
    this.jl = 0; 
    this.kl = 0; 
    this.jb = 0; 
    this.kb = 0; 
    this.jf = 0; 
    this.kf = 0;
  
    this.c = new Chart();
    this.bulletsHit = [];

    this.startX = X;
    this.startY = Y;
    this.bulletSpeed = BS + (p.level * (((BS2 - BS) / 30)));
    this.bulletDistance = D + (p.level * (((D2 - D) / 30)));
    this.movementSpeed = MS + (p.level * (((MS2 - MS) / 30)));
    this.range = R + (p.level * (((R2 - R) / 30)));
    this.sight = S + (p.level * (((S2 - S) / 30)));
    this.maxHealth = MH + (p.level * (((MH2 - MH) / 30)));
    this.healthDecrement = this.maxHealth;
    this.health = this.maxHealth;
    this.bulletReload = BR + (p.level * (((BR2 - BR) / 30)));
    this.barrels = B;
  
    // this.bulletSpeed += (p.level * 0.05);
    // this.bulletDamage += (p.level * 0.1);
    // this.movementSpeed += (p.level * 0.01);
    // this.range -= (p.level * 5);
    // this.sight += (p.level * 20);
    // this.maxHealth += (p.level * 100);
    // this.healthDecrement += (p.level * 100);
    // this.health += (p.level * 100);
    // this.bulletReload -= (p.level * 0.005);
  }
  
  // Opponent(X, Y, BS, BD, D, MS, R, S, MH, BR) {
  //   this.startX = X;
  //   this.startY = Y;
    
  //   this.bulletSpeed = BS + (p.level * 0.05);
  //   this.bulletDamage = abs(BD + (p.level * 0.1));
  //   this.bulletDistance = D;
  //   this.movementSpeed = MS + (p.level * 0.01);
  //   this.range = R - (p.level * 5);
  //   this.sight = S + (p.level * 20);
  //   this.maxHealth = MH + (p.level * 100);
  //   this.healthDecrement = MH + (p.level * 100);
  //   this.health = MH + (p.level * 100);
  //   this.bulletReload = BR - (p.level * 0.005);
    
  // }
  
  // Custom method for updating the variables
  
  getHori(H){this.hori = H;}
  getVert(V){this.vert = V;}
  
  getShowChart(S){showChart = S; }
  getBullet(B){ this.bulletsHit.push(B); }
  getHealthSubtractor(V){ this.healthSubtractor = V;}
  
  shoved(DMG){
    this.shove = true;
    this.damageTaken = DMG;
    this.showHealthBar = true;
  }
  
  // Custom method for returning Variables
  
  returnXpos(){return  this.startX - (width / 2);}
  returnYpos(){return  this.startY - (height / 2);}
  returnX(){return  this.startX;}
  returnY(){return  this.startY;}
  returnHori(){return  this.j;}
  returnVert(){return  this.k;}
  returnReload(){ return  this.bulletReload; }
  
  returnDist(){ return  this.dist; }
  returnSight(){ return  this.sight; }
  
  returnInRange(){return  this.inRange;}
  returnBulletHistory() {return  this.bulletsHit;}
  
  returnBulletSpeed(){ return  this.bulletSpeed; }
  returnBulletDistance(){ return  this.bulletDistance; }
  returnBulletDamage(){ return  this.bulletDamage; }
  returnBodyDamage(){ return  this.bulletDamage; }
  returnBulletSubtractor(){ return  this.bulletSubtractor; }
  returnHealth(){ return  this.healthDecrement; }
  
  returnColor(){ return  this.outline;}
  returnBulletColor() { return  this.bulletColor; }
  
  
  
  
   display() {

    if (floor(this.fireRate) < this.returnReload() * 60) {
      this.fireRate++;
    } else {
      this.fireRate = 0;
      if (this.returnDist() < this.returnSight()) {
  
        if (this.barrels == 1) {
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -(this.returnHori()), -(this.returnVert()),
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
        } else if (this.barrels == 2) {
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -(this.returnHori()), -(this.returnVert()),
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
  
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jb, -this.kb,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
        } else if (this.barrels == 3) {
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -(this.returnHori()), -(this.returnVert()),
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
  
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jr, -this.kr,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
  
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jl, -this.kl,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
        } else if (this.barrels == 4) {
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jr, -this.kr,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
  
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jl, -this.kl,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
  
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jb, -this.kb,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
  
          bullets.push(new Bullet(60, this.returnXpos(), this.returnYpos(), -this.jf, -this.kf,
            this.returnBulletSpeed(), this.returnBulletDamage(), this.returnBulletColor(), this.bulletDistance, false));
        }
      }
    }
    
    
    
    if (this.showHealthBar === true) {
      fill(0);
      // HEALTH BAR OUTLINE
      rect(this.startX + 2 - 1 - (this.size / 2), this.startY + 60 - 1, this.size + 2, 7);
      ellipse(this.startX + 2 - 1 - (this.size / 2), this.startY + 60 - 1 + 3.5, 5, 5);
      ellipse(this.startX + 2 - 1 + this.size + 2 - (this.size / 2), this.startY + 60 - 1 + 3.5, 7, 7);
    
      if (this.healthDecrement > this.health) { // DECREMENT THE HEALTHBAR
        fill(0, 255, 0);
        rect(this.startX + 2 - (this.size / 2), this.startY + 60, this.size * (this.healthDecrement / this.maxHealth), 5);
        ellipse(this.startX + 2 - (this.size / 2), this.startY + 60 + 2.5, 5, 5);
        ellipse(this.startX + 2 + this.size * (this.healthDecrement / this.maxHealth) - (this.size / 2), this.startY + 60 + 2.5, 5, 5);
    
        this.healthDecrement -= this.healthSubtractor * m; // SOOO CLEAN!!
    
      } else { // DO NOT MOVE HEALTH BAR
        fill(0, 255, 0);
        rect(this.startX + 2 - (this.size / 2), this.startY + 60, this.size * (this.health / this.maxHealth), 5);
        ellipse(this.startX + 2 - (this.size / 2), this.startY + 60 + 2.5, 5, 5);
        ellipse(this.startX - (this.size / 2) + 2 + (this.size * (this.health / this.maxHealth)), this.startY + 60 + 2.5, 5, 5);
      }
    }
    
    if (this.startX < p.returnXpos()) {
      this.a = p.returnXpos() - this.startX;
    } else if (this.startX > p.returnXpos()) {
      this.a = this.startX - p.returnXpos();
    }
    if (this.startY < p.returnYpos()) {
      this.b = p.returnYpos() - this.startY;
    } else if (this.startY > p.returnYpos()) {
      this.b = this.startY - p.returnYpos();
    }
    // TURN THE RISE AND THE RUN INTO AN ANGLE IN RADIANS
    
    this.e = (this.a * PI) / 180;
    this.d = (this.b * PI) / 180;
    
    this.r = atan(this.d / this.e);
    
    // ARCTAN IS USED TO FIND THE UNIVERSAL ANGLE IN RADIANS
    // RIGHT IS COS ANGLE IN RADIANS
    // UP IS SIN ANGLE IN RADIANS
    
    if (this.barrels == 1) { }
    else if (this.barrels == 2) {
      this.rb = this.r + (radians(180));
    }
    else if (this.barrels == 3) {
      this.rr = this.r + (radians(25));
      this.rl = this.r - (radians(25));
    }
    else if (this.barrels == 4) {
      this.rr += radians(1);
      this.rl = this.rr + radians(90);
      this.rb = this.rr + radians(180);
      this.rf = this.rr + radians(270);
    }
    
    
    // IF 4, THEN DO NOT TRACK PLAYER, ONLY GO AROUND IN A CIRCLE AT FAST PACE.

    if (this.startX > p.returnXpos() && this.startY > p.returnYpos()){  // RIGHT BOTTOM
      this.j = cos(this.r);  
      this.k = sin(this.r); 
      this.jr = cos(this.rr); 
      this.kr = sin(this.rr); 
      this.jl = cos(this.rl); 
      this.kl = sin(this.rl); 
      this.jb = cos(this.rb);
      this.kb = sin(this.rb);
      this.jf = cos(this.rf);
      this.kf = sin(this.rf);
    }
    
    if (this.startX > p.returnXpos() && this.startY < p.returnYpos()){  // RIGHT TOP
      this.j = cos(this.r);  
      this.k = sin(this.r + (PI)); 
      this.jr = cos(this.rr); 
      this.kr = sin(this.rr + (PI)); 
      this.jl = cos(this.rl); 
      this.kl = sin(this.rl + (PI)); 
      this.jb = cos(this.rb);
      this.kb = sin(this.rb + (PI));
      this.jf = cos(this.rf);
      this.kf = sin(this.rf + (PI));
    }
    
    if (this.startX < p.returnXpos() && this.startY > p.returnYpos()){  // LEFT BOTTOM
      this.j = cos(this.r + (PI));  
      this.k = sin(this.r);  
      this.jr = cos(this.rr + (PI)); 
      this.kr = sin(this.rr); 
      this.jl = cos(this.rl + (PI)); 
      this. kl = sin(this.rl); 
      this.jb = cos(this.rb + (PI));
      this.kb = sin(this.rb);
      this.jf = cos(this.rf + (PI));
      this.kf = sin(this.rf);
    }
    
    if (this.startX < p.returnXpos() && this.startY < p.returnYpos()){  // LEFT TOP
      this.j = cos(this.r + (PI));  
      this.k = sin(this.r + (PI));  
      this.jr = cos(this.rr + (PI)); 
      this.kr = sin(this.rr + (PI)); 
      this.jl = cos(this.rl + (PI)); 
      this.kl = sin(this.rl + (PI));  
      this.jb = cos(this.rb + (PI));
      this.kb = sin(this.rb + (PI));
      this.jf = cos(this.rf + (PI));
      this.kf = sin(this.rf + (PI));
    }
    
    
    // OPPONENT MOVEMENT AI
    
    this.dist = sqrt(sq(p.returnXpos() - this.startX) + sq(p.returnYpos() - this.startY));
    
    if (opponents.length > 1) {

      for (let i = 0; i < opponents.length; i++) {
    
        if (opponents[i] == this) { } // don't do anything if it is this
        else {
          if (sqrt(sq(opponents[i].startX - this.startX) + sq(opponents[i].startY - this.startY)) <= 500) { // if the difference betweent the two are close
    
            if (this.dist < sqrt(sq(p.returnXpos() - opponents[i].startX) + sq(p.returnYpos() - opponents[i].startY))) {
              if (this.dist >= this.range) {
                this.startX -= this.j * this.movementSpeed * m; // only the closest to the protagonist is allowed to move
                this.startY -= this.k * this.movementSpeed * m;
                this.inRange = false; // this way they are not stuck
              } else {
                this.inRange = true;
              }
            } else { // it is made in the way that only this opponent will be able to move, I cannot make other opponent move. 
    
            }
            // WORKING ON THIS ATM
          } else {
            if (this.dist >= this.range) {
              this.startX -= this.j * this.movementSpeed * m;
              this.startY -= this.k * this.movementSpeed * m; // otherwise if they are apart, continue to follow the protagonist. 
              this.inRange = false;
            } else {
              this.inRange = true;
            }
          }
        }
      }
    } else {
      if (this.dist >= this.range) {
        this.startX -= this.j * this.movementSpeed * m;
        this.startY -= this.k * this.movementSpeed * m; // otherwise if they are apart, continue to follow the protagonist. 
        this.inRange = false;
      } else {
        this.inRange = true;
      }
    }
    
    fill(20);
    ellipse(this.startX, this.startY + 5, 80, 80);
    
    if (this.barrels == 1) {
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k) + 5, 20, 20);
    } else if (this.barrels == 2) {
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k) + 5, 20, 20);
      ellipse(this.startX - (60 * this.jb), this.startY - (60 * this.kb) + 5, 20, 20);
    } else if (this.barrels == 3) {
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k) + 5, 20, 20);
      ellipse(this.startX - (60 * this.jr), this.startY - (60 * this.kr) + 5, 20, 20);
      ellipse(this.startX - (60 * this.jl), this.startY - (60 * this.kl) + 5, 20, 20);
    } else if (this.barrels == 4) {
      ellipse(this.startX - (60 * this.jr), this.startY - (60 * this.kr) + 5, 20, 20);
      ellipse(this.startX - (60 * this.jl), this.startY - (60 * this.kl) + 5, 20, 20);
      ellipse(this.startX - (60 * this.jb), this.startY - (60 * this.kb) + 5, 20, 20);
      ellipse(this.startX - (60 * this.jf), this.startY - (60 * this.kf) + 5, 20, 20);
    }
    
    fill(215, 0, 0);
    ellipse(this.startX, this.startY, 80, 80);
    
    if (this.barrels == 1){
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 20, 20);
    }  
    else if (this.barrels == 2){ 
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 20, 20);
      ellipse(this.startX - (60 * this.jb), this.startY - (60 * this.kb), 20, 20);
    }
    else if (this.arrels == 3){ 
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 20, 20);
      ellipse(this.startX - (60 * this.jr), this.startY - (60 * this.kr), 20, 20);
      ellipse(this.startX - (60 * this.jl), this.startY - (60 * this.kl), 20, 20);
    }
    else if (this.barrels == 4){
      ellipse(this.startX - (60 * this.jr), this.startY - (60 * this.kr), 20, 20);
      ellipse(this.startX - (60 * this.jl), this.startY - (60 * this.kl), 20, 20);
      ellipse(this.startX - (60 * this.jb), this.startY - (60 * this.kb), 20, 20);
      ellipse(this.startX - (60 * this.jf), this.startY - (60 * this.kf), 20, 20);
    }
    
    fill(255, 0, 0);
    ellipse(this.startX, this.startY, 70, 70);
    
    if (this.barrels == 1){
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 15, 15);
    }
    else if (this.barrels == 2){ 
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 15, 15);
      ellipse(this.startX - (60 * this.jb), this.startY - (60 * this.kb), 15, 15);
    }
    else if (this.barrels == 3){ 
      ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 15, 15);
      ellipse(this.startX - (60 * this.jr), this.startY - (60 * this.kr), 15, 15);
      ellipse(this.startX - (60 * this.jl), this.startY - (60 * this.kl), 15, 15);
    
    }
    else if (this.barrels == 4){
      ellipse(this.startX - (60 * this.jr), this.startY - (60 * this.kr), 15, 15);
      ellipse(this.startX - (60 * this.jl), this.startY - (60 * this.kl), 15, 15);
      ellipse(this.startX - (60 * this.jb), this.startY - (60 * this.kb), 15, 15);
      ellipse(this.startX - (60 * this.jf), this.startY - (60 * this.kf), 15, 15);
    }
    
    if (this.shove == false){    // DRAW REGULAR SQUARE OBJECT
      fill(20);
      ellipse(this.startX, this.startY + 5, 80, 80);
      //ellipse(startX - (60 * j), startY - (60 * k) + 5, 20, 20);
    
      fill(215, 0, 0);
      ellipse(this.startX, this.startY, 80, 80);
      //ellipse(startX - (60 * j), startY - (60 * k), 20, 20);
      fill(255, 0, 0);
      ellipse(this.startX, this.startY, 70, 70);
      //ellipse(startX - (60 * j), startY - (60 * k), 15, 15);
    } 
    
    else {
      if (this.count == 0){
        if (this.shove == true){this.health -= this.damageTaken;}
      }
      if (this.count <= 10 / m){    // FLASH RED
        fill(215, 0, 0);
        ellipse(this.startX, this.startY, 80, 80);
        ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 20, 20);
        fill(255, 0, 0);
        ellipse(this.startX, this.startY, 70, 70);
        ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 15, 15);
      }
      if (this.count > 10 / m && this.count <= 20 / m){  // FLASH WHITE
        fill(235); 
        ellipse(this.startX, this.startY, 80, 80);
        ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 20, 20);
        fill(255);
        ellipse(this.startX, this.startY, 70, 70);
        ellipse(this.startX - (60 * this.j), this.startY - (60 * this.k), 15, 15);
      }
      if (this.count < 20 / m){this.count ++;} else {this.shove = false; this.count = 0;}  // END THE HIT STAGE
    }
  }
}
