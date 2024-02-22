class Chart {
  
    constructor(W, H) {
      this.rightX = 0;
      this.topY = height * (1.0 / 5.0);
      
      // this.showChart;
      this.points = 0;
      
      this.chartWidth = W;
      this.chartHeight = H - 50;
      this.statHeight = H / 9.0;
      this.statWidth = W - 60;
      
      this.maxHealthPoints = 1;
      this.healthRegenPoints = 1;
      this.bulletSpeedPoints = 1;
      this.bulletDamagePoints = 1;
      this.bulletDistancePoints = 1;
      this.movementSpeedPoints = 1;
      this.bodyDamagePoints = 1;
      
      this.tabLeft = 0;
      this.tabRight = this.tabLeft + 10;
      this.tabTop = this.topY;
      this.tabBottom = this.topY + (height * (1.0 / 4.0) - 20);
      
      this.font1;
      this.font2;
    }
    
    showChart(P){ showChart = true; this.points = P;}
    hideChart(){ showChart = !true;}
    
    
    incrementMaxHealth(){ this.maxHealthPoints ++; }
    incrementHealthRegen(){ this.healthRegenPoints ++; }
    incrementBulletSpeed(){ this.bulletSpeedPoints ++; }
    incrementBulletDamage(){ this.bulletDamagePoints ++; }
    incrementBulletDistance(){ this.bulletDistancePoints ++; }
    incrementBodyDamage(){ this.bodyDamagePoints ++; }
    incrementMovementSpeed(){ this.movementSpeedPoints ++; }
    
    returnShowChart() { return showChart; }
    returnTabLeft() { return this.tabLeft; }
     returnTabRight() { return this.returnTabLeft() + 20;}
     returnTabTop() { return  this.tabTop; }
     returnTabBottom() { return this.returnTabTop() + 220; }
     returnStatLeft(){ return  this.rightX -  this.chartWidth + 20; }
     returnStatRight(){ return  this.rightX -  this.chartWidth + 20 +  this.statWidth; }
     returnStatTop(){ return  this.topY + 0; }  // MUST INSERT THE HEIGHT VALUES REPLACE 0
     returnStatBottom(){ return  this.topY +  this.statHeight + 0; }
    
     returnMaxHealthPoints() { return  this.maxHealthPoints; }
     returnHealthRegenPoints() { return  this.healthRegenPoints; }
     returnBulletSpeedPoints() { return  this.bulletSpeedPoints; }
     returnBulletDamagePoints() { return  this.bulletDamagePoints; }
     returnBulletDistancePoints() { return  this.bulletDistancePoints; }
     returnMovementSpeedPoints() { return  this.movementSpeedPoints; }
     returnBodyDamagePoints() { return  this.bodyDamagePoints; }
    
     customFont(text, X, Y, outline, fill){
      for(let x = -outline; x < outline; x++){
        for (let y = -3; y < 3; y++){
          text(text, X + x,  Y + y);
        }
      }
      fill(255);
      for(let x = -fill; x < fill; x++){
        for (let y = -1; y < 1; y++){
          text(text, X + x,  Y+ y);
        }
      }
    }
    
     borderOutline(y){
      rect(this.rightX - this.chartWidth + 20, this.topY + y, this.statWidth, this.statHeight);
      arc(this.rightX - this.chartWidth + 20, this.topY + y + this.statHeight / 2, this.statHeight, this.statHeight, HALF_PI, PI+HALF_PI);
      arc(this.rightX - this.chartWidth + 20 + this.statWidth, this.topY + y + this.statHeight / 2, this.statHeight, this.statHeight, -HALF_PI, HALF_PI);
    }
    
     fillStats(y, x){
      rect(this.rightX - this.chartWidth + 20, this.topY + y + 4, ((this.statWidth) * (x / 15.0)), this.statHeight - 8);
      ellipse(this.rightX - this.chartWidth + 20, this.topY + y + 4 + ((this.statHeight - 8) / 2), this.statHeight - 8, this.statHeight - 8);
      ellipse(this.rightX - this.chartWidth + 20 + ((this.statWidth) * (x / 15.0)), this.topY + y + 4 + ((this.statHeight - 8) / 2), this.statHeight - 8, this.statHeight - 8);
    }
    
     display() {
      fill(200, 200, 200, 200);
      rect(this.tabLeft, this.tabTop, 20, this.chartHeight);
      arc(this.tabLeft + 10, this.tabTop, 20, 20, PI, PI*2);
      arc(this.tabLeft + 10, this.tabTop + this.chartHeight, 20, 20, 0, PI);
      fill(0, 0, 0, 180);
      
      if (showChart == true) {
        if (this.rightX < (20 + this.chartWidth)){
          this.rightX += 2 * m;
          this.tabLeft += 2 * m;
        }
      } 
      if (showChart == false) {
        if (this.rightX > 0){
          this.rightX -= 2 * m;
          this.tabLeft -= 2 * m;
        }
      }
      
      // BORDER OUTLINE
      
      this.borderOutline(10);
      this.borderOutline(44);
      this.borderOutline(78);
      this.borderOutline(112);
      this.borderOutline(146);
      this.borderOutline(180);
      this.borderOutline(214);
      
      // FILL THE STATS
      
      fill(132,237,35);
      this.fillStats(10, this.maxHealthPoints);
      
      fill(63,223,199);
      this.fillStats(44, this.healthRegenPoints);
      
      fill(113,102,244);
      this.fillStats(78, this.bulletSpeedPoints);
      
      fill(255,39,89);
      this.fillStats(112, this.bulletDamagePoints);
      
      fill(255,184,78);
      this.fillStats(146, this.bulletDistancePoints);
      
      fill(255,67,181);
      this.fillStats(180, this.bodyDamagePoints);
      
      fill(203,240,15);
      this.fillStats(214, this.movementSpeedPoints);
      
      // ADD TEXTS
      
      textAlign(CENTER);
      //textFont(font1);
      textSize(16);
      fill(255);
      
      text("Maximum Health", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 10 + this.statHeight / 2 + 4);
      text("Health Regen", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 44 + this.statHeight / 2 + 4);
      text("Bullet Speed", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 78 + this.statHeight / 2 + 4);
      text("Bullet Damage", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 112 + this.statHeight / 2 + 4);
      text("Bullet Distance", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 146 + this.statHeight / 2 + 4);
      text("Body Damage", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 180 + this.statHeight / 2 + 4);
      text("Movement Speed", this.rightX - this.chartWidth + 20 + this.statWidth / 2,  this.topY + 214 + this.statHeight / 2 + 4);
      
      textSize(30);
      fill(0);
      
      for(let x = -3.3; x < 3.3; x++){
        for (let y = -3.3; y < 3.3; y++){
          text("Points :  " + p.returnPoints(), this.rightX - this.chartWidth + 20 + this.statWidth / 2 + x, this.topY + 10 + this.statHeight / 2 + 5 - 34 + y);
        }
      }
      
      fill(255);
      for(let x = -1.5; x < 1.5; x++){
        for (let y = -1.5; y < 1.5; y++){
          text("Points :  " + p.returnPoints(), this.rightX - this.chartWidth + 20 + this.statWidth / 2 + x, this.topY + 10 + this.statHeight / 2 + 5 - 34 + y);
        }
      }
    }
  }
