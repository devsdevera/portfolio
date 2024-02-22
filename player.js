wclass Protagonist {
  
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
      rect(width / 2 - 105, (height * 0.15) - (height / 28.8), 210, 30); // BAR OUTLINE
      arc(width / 2 - 105, (height * 0.15) - (height / 41.14), 30, 30, HALF_PI, PI + HALF_PI);
      arc(width / 2 + 105, (height * 0.15) - (height / 41.14), 30, 30, -HALF_PI, HALF_PI);
    
      textSize(30);
      textAlign(CENTER);
    
      // DRAW THE LEVEL TEXT
      for (let x = -4; x < 4; x++) {
        for (let y = -4; y < 4; y++) {
          text("LEVEL  " + this.level, (width / 2) + x, (height * 0.15) - (height / 24) + y);
        }
      }
      fill(255);
      for (let x = -2; x < 2; x++) {
        for (let y = -2; y < 2; y++) {
          text("LEVEL  " + this.level, (width / 2) + x, (height * 0.15) - (height / 24) + y);
        }
      }
    
      // DRAW HOW MUCH EXP PLAYER HAS RELATIVE TO LEVEL BAR LENGTH
      if (this.xpIncrement < this.xp) {
        ellipse(width / 2 - 105, (height * 0.15) - (height / 38.8), 20, 20);
        rect(
          width / 2 - 105,
          (height * 0.15) - (height / 32),
          200.0 * (this.xpIncrement / this.levelRequirements),
          20
        );
        ellipse(
          width / 2 - 105 + 200.0 * (this.xpIncrement / this.levelRequirements),
          (height * 0.15) - (height / 38.8),
          20,
          20
        );
    
        this.xpIncrement += this.xpAdder * m; // SOOO CLEAN!!
      } else {
        rect(width / 2 - 105, (height * 0.15) - (height / 32), 200.0 * (this.xp / this.levelRequirements), 20);
        ellipse(width / 2 - 105, (height * 0.15) - (height / 38.8), 20, 20);
        ellipse(
          width / 2 - 105 + 200.0 * (this.xp / this.levelRequirements),
          (height * 0.15) - (height / 38.8),
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
