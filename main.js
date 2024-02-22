
let menu;
let over;
let paused;

var winWidth = window.innerWidth * 0.9;

var width = winWidth;
var height = winWidth / (16.0 / 9.0);

var time = 0;
var totalXP;
var up = false;
var down = false;
var left = false;
var right = false;
var opponentCount = 0;

// Adjust the frameRate Accordingly to match computer

var frameR = 60;
var m = 1.0 / (frameR / 240.0);

var radian, radianX, radianY, hori, vert;
var cursorX, cursorY, displacementX, displacementY;

var bullets = [];
var dysfunctionalBullets = [];

var particles = [];
var dysfunctionalParticles = [];

var squares = [];
var pentagons = [];
var hexagons = [];
var opponents = [];

var destroyedSquares = [];
var destroyedPentagons = [];
var destroyedHexagons = [];
var destroyedOpponents = [];

var squareRate, pentagonRate, hexagonRate;
var modulo;

var state = "menu";
var showChart = false;


// Global Objects

var p;
var c;

function preload() {
  // bg = loadImage("2.png");
  menu = loadImage("images/menu2x.png");
  over = loadImage("images/over.png");
  paused = loadImage("images/paused.png");
}


function admin() {

  squares = [];
  pentagons = [];
  hexagons = [];
  
  opponents = [];
  bullets = [];
  particles = [];
  opponentCount = 0;

  
  c = new Chart(300, height * (1.0 / 4.0) - 50);
  p = new Protagonist(width / 2, height / 2, c);

  
  for (let i = 0; i < 3; i++) squares.push(new Square(int(random(0, width)), int(random(0, height)), squares.length));
  for (let i = 0; i < 2; i++) pentagons.push(new Pentagon(int(random(0, width)), int(random(0, height)), pentagons.length));
  for (let i = 0; i < 1; i++) hexagons.push(new Hexagon(int(random(0, width)), int(random(0, height)), hexagons.length));
}



function setup() {
  if (m > 1) m -= 1; // special 240 fps condition

  var winWidth = window.innerWidth;
  createCanvas(winWidth, winWidth / (16.0 / 9.0));
  frameRate(frameR);
  noStroke();
  ellipseMode(CENTER);

  //bg = loadImage("2.png");
//   menu = loadImage("menu.png");
//   over = loadImage("over.png");
//   paused = loadImage("paused.png");

  admin();
}

function draw() {

  if (state == "menu") {

    background(menu);

  } else if (state == "paused-j" || state == "paused-e") {

    background(paused);

  } else if (state == "dead-j" || state == "dead-e") { 

    background(over); 

    fill(0); 
//     text(totalXP, width / 2, height / 2 + 20);    //totalxp global
  } else if (state == "gameplay-j" || state == "gameplay-e") {

    background(255);
    
    //background(255); image(bg, -(p.returnXpos() - (width / 2)), -(p.returnYpos() - (height / 2)));    // uncomment if you want slow fps
    //text(p.ePoints, 100, 100);
    fill(0);
    //text(m, 100, 100);
    time += (1.0 / frameR);

    if (p.returnHealth() <= 0) {
      if (state == "gameplay-j") state = "dead-j";
      else if(state == "gameplay-e") state = "dead-e";
    }

       // HEALTH REGENERATION OVERTIME
    if (Math.floor(modulo) < p.returnHealthRegen()) {
      modulo ++;
    } else {
      modulo = p.incrementHealth();
    }

    // OPPONENT SPAWN && FIRE RATE
    // BulletSpeed  1,  BulletDamage  10.0, Bullet Distance  50,  movementSpeed  1, 
    // Range (range to get close to player) 300, Sight 500, MaxHealth  1000, Bullet Reload  0.4

    if (p.returnLevel() >= 15 && opponentCount == 1) {
      opponents.push(new Opponent(width - 100, height - 100, 3, 7, 20, 40, 50, 100, 0.5, 0.5, 300, 600, 3000, 3000, 1000, 3000, 2, 2, 1)); opponentCount++;
    }
    if (p.returnLevel() == 5 && opponentCount == 0) {
      opponents.push(new Opponent(100, 100, 1, 2, 20, 20, 40, 60, 1, 1.5, 300, 300, 500, 500, 1000, 3000, 0.5, 0.1, 1)); opponentCount++;
    }
    if (p.returnLevel() >= 5 && opponentCount == 0) {
      opponents.push(new Opponent(100, 100, 1, 2, 20, 5, 40, 60, 1, 1.5, 300, 300, 500, 500, 1000, 3000, 0.5, 0.1, 3)); opponentCount++;
    }

    playerMovement();
    shapeGenerator();
    pBulletHits();



    for (let b of bullets){
      if (sqrt(sq(p.returnXpos() - b.returnXpos()) + sq(p.returnYpos() - b.returnYpos())) <= 55 && b.protagonist == false){ 
        if (p.returnBulletHistory().includes(b)){} else {
          p.getBullet(b);
          p.shoved(b.bulletDamage);
          particles.push(new Particle(p.returnXpos(), p.returnYpos(), p.returnColor(), 5));
        }
      }
    }
    
    // TEMPORARY BULLETS AND TEMPORARY EXPLOSION ANIMATION
    
    for (let g of particles) if (g.returnParticleDistance() >= 50)dysfunctionalParticles.push(g);
    
    destroyedObjects();
    
    // DISPLAY ALL THE OBJECTS CURRENTLY STILL THERE
    
    if (p.ePoints <= 0){
    
    push();
    translate(-(p.returnXpos() - (width / 2)), -(p.returnYpos() - (height / 2)));  // THIS IS THE TRANSLATION TO MAKE UNIVERSE MOVE
    
    for (let b of bullets)b.display();
    for (let s of squares)s.display();
    for (let f of pentagons)f.display();
    for (let h of hexagons)h.display();
    for (let o of opponents)o.display();
    
    p.display();
    for (let g of particles)g.display();
    
    pop();
    }
    
    p.hud();
    c.display();
    
    fill(230);
    rect(20, 20, 10, 30);
    rect(35, 20, 10, 30);
    
  }
}



function shapeGenerator() {
  // RANDOM OBJECT GENERATOR
  
  if (int(random(0, 1200 * 0.3)) == 69){
    if (squares.length <= 10){
      squares.push(new Square(int(random(0, width)), int(random(0, height)), squares.length));
    }
  }
  if (int(random(0, 1200 * 0.3)) == 69){
    if (pentagons.length <= 10){
      pentagons.push(new Pentagon(int(random(0, width)), int(random(0, height)), pentagons.length));
    }
  }
  if (int(random(0, 1200 * 0.3)) == 69){
    if (hexagons.length <= 10){
      hexagons.push(new Hexagon(int(random(0, width)), int(random(0, height)), hexagons.length));
    }
  }
}






// PLAYER MOVEMENT FUNCTION - ACCELERATION
function playerMovement() {
  if (up == true) p.Goup();
  if (down == true) p.Godown();
  if (left == true) p.Goleft();
  if (right == true) p.Goright();
  if (up == false) p.GoupFalse();
  if (down == false) p.GodownFalse();
  if (left == false) p.GoleftFalse();
  if (right == false) p.GorightFalse(); 
}





function pBulletHits() {
  // WHEN PLAYER BULLETS HIT THE OBJECTS
  
  for (let s of squares) s.getHealthSubtractor(p.returnBulletSubtractor());
  for (let f of pentagons) f.getHealthSubtractor(p.returnBulletSubtractor());
  for (let h of hexagons) h.getHealthSubtractor(p.returnBulletSubtractor());
  for (let o of opponents) o.getHealthSubtractor(p.returnBulletSubtractor());
}






function destroyedObjects() {
  // REMOVE THE DESTROYED OBJECTS FROM THEIR ARRAYLIST
  for (let s of destroyedSquares) {
    particles.push(new Particle(s.returnXpos() + 15, s.returnYpos() + 15, s.returnColor(), 10));
    squares.splice(squares.indexOf(s), 1);
    if (s.protagonist) p.incrementXP(s.returnXP());
  }
  for (let f of destroyedPentagons) {
    particles.push(new Particle(f.returnXpos(), f.returnYpos(), f.returnColor(), 10));
    pentagons.splice(pentagons.indexOf(f), 1);
    if (f.protagonist) p.incrementXP(f.returnXP());
  }
  for (let h of destroyedHexagons) {
    particles.push(new Particle(h.returnXpos(), h.returnYpos(), h.returnColor(), 10));
    hexagons.splice(hexagons.indexOf(h), 1);
    if (h.protagonist) p.incrementXP(h.returnXP());
  }
  for (let o of destroyedOpponents) {
    particles.push(new Particle(o.returnX() + 15, o.returnY() + 15, o.returnColor(), 40));
    opponents.splice(opponents.indexOf(o), 1);
    p.incrementXP(3000);

    if (int(random(1, 3)) == 1) {    // 50/50 either sprayer or sniper class
      if (p.returnLevel() >= 10) {
        opponents.push(new Opponent(int(random(0, width)), int(random(0, height)),
          3, 5, 20, 40, 50, 100, 0, 0, 300, 100, 3000, 3000, 1000, 3000, 2, 2, int(random(1, 5))));  // different types
      } else {
        opponents.push(new Opponent(int(random(0, width)), int(random(0, height)),
          3, 5, 20, 40, 50, 100, 0, 0, 300, 100, 3000, 3000, 1000, 3000, 2, 2, 1));
      }
    } else {
      if (p.returnLevel() >= 10) {
        opponents.push(new Opponent(100, 100,
          1, 2, 20, 8, 40, 60, 1, 1.5, 300, 300, 500, 500, 1000, 3000, 0.5, 0.1, int(random(1, 5))));
      } else {
        opponents.push(new Opponent(100, 100,
          1, 2, 20, 8, 40, 60, 1, 1.5, 300, 300, 500, 500, 1000, 3000, 0.5, 0.1, 1));  // standard class if lower level
      }
    }
  }

  for (let g of dysfunctionalParticles) particles.splice(particles.indexOf(g), 1);
  for (let b of dysfunctionalBullets) { 
    bullets.splice(bullets.indexOf(b), 1);}

  dysfunctionalBullets = [];
  dysfunctionalParticles = [];
  destroyedSquares = [];
  destroyedPentagons = [];
  destroyedHexagons = [];
  destroyedOpponents = [];
}





function upgradeStats(n) {
  return (cursorX > c.returnStatLeft() && cursorX < c.returnStatRight() && cursorY > c.returnStatTop() + n &&
    cursorY < c.returnStatBottom() + n && p.returnPoints() >= 1);
}






function mouseReleased() {
  cursorX = mouseX;
  cursorY = mouseY;

  // FSM STATE TRANSITIONS FROM MOUSE RELEASED INPUTS
  if (state === "menu") {
    if (cursorX >= (width * 0.16) && cursorX <= (width * 0.48984375) && cursorY >= (height * 0.40) && cursorY <= (height * 0.839583333)) {
      state = "gameplay-j";
    }

    if (cursorX >= (width * 0.52) && cursorX <= (width * 0.84453125) && cursorY >= (height * 0.402083333) && cursorY <= (height * 0.839583333)) {
      state = "gameplay-e";
      p.level = 30;
      p.ePoints = 30;
      showChart = true;
    }
  } else if (state === "paused-e") {
    if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444)) state = "gameplay-e";
    else if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125)) {
      state = "menu";
      admin();
    }
  } else if (state === "paused-j") {
    if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444)) state = "gameplay-j";
    else if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125)) {
      state = "menu";
      admin();
    }
  } else if (state === "dead-j") {
    admin();

    if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444)) state = "gameplay-j";
    else if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125)) state = "menu";
  } else if (state === "dead-e") {
    admin();

    if (cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875) && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444)) {
      p.level = 30;
      p.ePoints = 30;
      state = "gameplay-e";
      showChart = true;
    } else if (cursorX >= 370 && cursorX <= 895 && cursorY >= 537 && cursorY <= 599) state = "menu";
  }
  else if (state === "gameplay-e" || state === "gameplay-j"){
    if (mouseButton === LEFT) {
  
      if (state === "gameplay-e"){
        if (cursorX >= 0 && cursorX <= 50 && cursorY >= 0 && cursorY <= 50) state = "paused-e";
      }
      if (state === "gameplay-j"){
        if (cursorX >= 0 && cursorX <= 50 && cursorY >= 0 && cursorY <= 50) state = "paused-j";
      }
  
      // SHOW AND HIDE THE UPGRADE CHART

      if (cursorX > c.returnTabLeft() && cursorX < c.returnTabRight() && 
      cursorY > c.returnTabTop() && cursorY < c.returnTabBottom() && c.returnShowChart() == true) c.hideChart();

      else if (cursorX > c.returnTabLeft() && cursorX < c.returnTabRight() && 
      cursorY > c.returnTabTop() && cursorY < c.returnTabBottom() && c.returnShowChart() == false) {c.showChart(p.returnPoints());}
  
  
      // UPGRADE THE STATS (COULD DO WHEN RELEASED)
  
      if (upgradeStats(10) && c.returnMaxHealthPoints() < 15){
        c.incrementMaxHealth();
        p.incrementMaxHealth();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
      if (upgradeStats(44) && c.returnHealthRegenPoints() < 15){
        c.incrementHealthRegen();
        p.incrementHealthRegen();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
      if (upgradeStats(78) && c.returnBulletSpeedPoints() < 15){
        c.incrementBulletSpeed();
        p.incrementBulletSpeed();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
      if (upgradeStats(112) && c.returnBulletDamagePoints() < 15){
        c.incrementBulletDamage();
        p.incrementBulletDamage();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
      if (upgradeStats(146) && c.returnBulletDistancePoints() < 15){
        c.incrementBulletDistance();
        p.incrementBulletDistance();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
      if (upgradeStats(180) && c.returnBodyDamagePoints() < 15){
        c.incrementBodyDamage();
        p.incrementBodyDamage();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
      if (upgradeStats(214) && c.returnMovementSpeedPoints() < 15){
        c.incrementMovementSpeed();
        p.incrementMovementSpeed();
        if (state === "gameplay-e" && p.ePoints > 0) p.ePoints -= 1;
      }
    }
  }
}












function barrelAim() {
  cursorX = mouseX;
  cursorY = mouseY;
  
  // FIND THE X AND Y DISPLACEMENT
  
  if (cursorX < (width / 2)) {
    displacementX = (width / 2) - cursorX;
  } else if (cursorX > (width / 2)) {
    displacementX = cursorX - (width / 2);
  }
  if (cursorY < (height / 2)) {
    displacementY = (height / 2) - cursorY;
  } else if (cursorY > (height / 2)) {
    displacementY = cursorY - (height / 2);
  }
  
  // TURN THE RISE AND THE RUN INTO AN ANGLE IN RADIANS
  
  radianX = (displacementX * PI) / 180;
  radianY = (displacementY * PI) / 180;
  radian = atan(radianY / radianX);
  
  // ARCTAN IS USED TO FIND THE UNIVERSAL ANGLE IN RADIANS
  // RIGHT IS COS ANGLE IN RADIANS
  // UP IS SIN ANGLE IN RADIANS
  
  if (cursorX > (width / 2) && cursorY > (height / 2)) { 
    hori = cos(radian);  
    vert = sin(radian);
  } // RIGHT BOTTOM
  if (cursorX > (width / 2) && cursorY < (height / 2)) { 
    hori = cos(radian);  
    vert = sin(radian + (PI));
  } // RIGHT TOP
  if (cursorX < (width / 2) && cursorY > (height / 2)) { 
    hori = cos(radian + (PI));  
    vert = sin(radian);
  } // LEFT BOTTOM
  if (cursorX < (width / 2) && cursorY < (height / 2)) { 
    hori = cos(radian + (PI));  
    vert = sin(radian + (PI));
  } // LEFT TOP
  
  p.hori = hori; // p.getHori(hori);
  p.vert = vert; // p.getVert(vert);
}

















function mousePressed() {
  // SHOOT A NEW BULLET IN DIRECTION OF BARREL
  bullets.push(new Bullet(60, p.returnX(), p.returnY(), p.returnHori(), 
  p.returnVert(), p.returnBulletSpeed(), p.returnBulletDamage(), p.returnBulletColor(), p.returnBulletDistance(), true));
  p.getHoriOpp(cos(acos(p.returnHori()) + PI));
  p.getVertOpp(sin(asin(p.returnVert()) + PI));
}

function mouseMoved() {
  // WHEN MOUSE IS MOVED, MOVE THE BARREL
  barrelAim();
}

function mouseDragged() {
  // WHEN MOUSE IS DRAGGED, MOVE THE BARREL
  barrelAim();
}

function keyPressed() {
  // SPATIAL MOVEMENT WASD  
  if (keyCode === 87) {up = true;}
  if (keyCode === 65) left = true;
  if (keyCode === 83) down = true;
  if (keyCode === 68) right = true;
}

function keyReleased() {
  // SPATIAL MOVEMENT WASD  
  if (keyCode === 87) up = false;
  if (keyCode === 65) left = false;
  if (keyCode === 83) down = false;
  if (keyCode === 68) right = false;
}












































































































      
 






































  
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

    
 












































    

    
    



























    
    
    
class Pentagon {
  
  constructor(X, Y, N) {
    this.maxHealth = 300;
    this.health = 300;
    this.healthDecrement = 300;
    this.healthSubtractor = 1;
    
    this.ID = N;
    
    this.count = 0;
    this.bulletDamage = 0;
    this.damage = 30.0;
    this.xp = 500;
    // this.driftX = 0;
    // this.driftY = 0;
    this.drift = 0;
    this.acceleration = 0;
    
    this.startX = X;
    this.startY = Y;
    
    this.radian = radians(int(random(0, 360)));
    
    this.degrees = 0;
    // this.xpos = 0;
    // this.ypos = 0;
    this.squareWidth = 30;
    this.outline = color(66, 116, 179);
    this.hit = false;
    this.shove = false;
    this.showHealthBar = false;
    this.protagonist = false;
    
    this.driftX = cos(this.radian);
    this.driftY = sin(this.radian);
    this.xpos = this.startX + (this.driftX * this.drift);
    this.ypos = this.startY + (this.driftY * this.drift);
  }
  
  
  // Custom method for updating the variables
   getHori(H) { hori = H; }
   getVert(V) { vert = V; }
   getHealthSubtractor(V) { this.healthSubtractor = V; }
  
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
   incrementBulletDamage() { this.healthSubtractor += 0.5; }
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
  
  // Custom method for drawing Polygon (At Center)
    polygon(x, y, radius, npoints) {
    const angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      const sx = x + cos(a) * radius;
      const sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    return;
  }
  
  
   display() {
    this.xpos = this.startX + (this.driftX * this.drift);
    this.ypos = this.startY + (this.driftY * this.drift);
  
    for (let o of opponents) {
      if (sqrt(sq(o.returnX() - this.returnXpos()) + sq(o.returnY() - this.returnYpos())) <= 60) {
        this.getHealthSubtractor(100);
        this.shoved(o.returnBodyDamage(), false);
        this.getHealthSubtractor(100);
        o.shoved(this.returnDamage());
        //particles.push(new Particle(p.returnXpos() + 15, p.returnYpos() + 15, p.returnColor(), 1));
      }
      if (this.returnHealth() <= 0) destroyedPentagons.push(this);
    }
  
    if (sqrt(sq(p.returnXpos() - this.returnXpos()) + sq(p.returnYpos() - this.returnYpos())) <= 60) {
      this.getHealthSubtractor(100);
      this.shoved(p.returnBodyDamage(), true);
      p.shoved(this.returnDamage());
      //particles.push(new Particle(p.returnXpos() + 15, p.returnYpos() + 15, p.returnColor(), 1));
    }
    if (this.returnHealth() <= 0) destroyedPentagons.push(this);
  
    push();
    translate(this.xpos, this.ypos + 6);
    rotate(degrees(this.degrees));
    fill(60); // SHADOW
    this.polygon(0, 0, this.squareWidth, 5);
    pop();
  
    if (this.showHealthBar == true) {
      // HEALTH BAR OUTLINE
      fill(60); 
      rect(this.xpos + 2 - 1 - (this.squareWidth / 2), this.ypos + 40 - 1, this.squareWidth + 2, 7); // need the y -1 for the top outline,  7 height, 5, increment
      ellipse(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40 - 1 + 3.5, 7, 7);
      ellipse(this.xpos + 2 + this.squareWidth - (this.squareWidth / 2), this.ypos + 40 - 1 + 3.5, 7, 7);
  
      if (this.healthDecrement > this.health) {
        // DECREMENT THE HEALTHBAR
        fill(0, 255, 0);
        rect(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40, this.squareWidth * (this.healthDecrement / this.maxHealth), 5);
        ellipse(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
        ellipse(this.xpos + 2 + this.squareWidth * (this.healthDecrement / this.maxHealth) - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
  
        this.healthDecrement -= this.healthSubtractor * m; // SOOO CLEAN!!
  
      } else {
        // DO NOT MOVE HEALTH BAR
        fill(0, 255, 0);
        rect(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40, this.squareWidth * (this.health / this.maxHealth), 5);
        ellipse(this.xpos + 2 - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
        ellipse(this.xpos + 2 + this.squareWidth * (this.health / this.maxHealth) - (this.squareWidth / 2), this.ypos + 40 + 2.5, 5, 5);
      }
    }
    
    push();
    translate(this.xpos, this.ypos);
    rotate(degrees(this.degrees));
    
    
    if (this.hit == false && this.shove == false){    // DRAW REGULAR SQUARE OBJECT
      fill(66, 116, 179);
      this.polygon(0, 0, this.squareWidth, 5);
      fill(86, 136, 199);
      this.polygon(0, 0, this.squareWidth * 0.8, 5);
    } 
    
    else {
      if (this.count == 0){
        if (this.hit == true){
          this.health -= this.bulletDamage; 
          this.acceleration += 0.02;
        }
        if (this.shove == true){
          this.health -= (this.bulletDamage * 1000); 
          this.acceleration += 0.08; 
          this.healthSubtractor = 50;
        }
      }
      if (this.count <= 10 / m){    // FLASH RED
        fill(235, 0, 0);   
        this.polygon(0, 0, this.squareWidth, 5);
        fill(255, 0, 0);
        this.polygon(0, 0, this.squareWidth * 0.8, 5);
      }
      if (this.count > 10 / m && this.count <= 20 / m){  // FLASH WHITE
        fill(235); 
        this.polygon(0, 0, this.squareWidth, 5);
        fill(255);
        this.polygon(0, 0, this.squareWidth * 0.8, 5);
      }
      if (this.count < 20 / m) this.count ++; 
      else {this.hit = false; this.count = 0;}  // END THE HIT STAGE
    }
    
    this.degrees += 0.00005  * m;
    this.drift += (0.05 + this.acceleration)  * m;
    
    pop();
  }
}

    









































    
    
























































    
class Square {
  
  constructor(X, Y, N) {
    this.maxHealth = 100;
    this.health = 100;
    this.healthDecrement = 100;
    this.healthSubtractor = 1;

    this.ID = N;
    this.count = 0;

    this.bulletDamage = 0;
    this.damage = 10.0;
    this.xp = 120;

    this.driftX = 0;
    this.driftY = 0;
    this.drift = 0;
    this.acceleration = 0;

    this.startX = X;
    this.startY = Y;

    this.radian = radians(int(random(0, 360)));
    this.degrees = 0;

    this.xpos = this.startX + (this.driftX * this.drift);
    this.ypos = this.startY + (this.driftY * this.drift);

    this.squareWidth = 30;
    this.outline = color(225, 225, 0);

    this.hit = false;
    this.shove = false;
    this.showHealthBar = false;
    this.protagonist = false;
  }
  
  // Custom method for updating the variables

  getHori(H){this.hori = H;}
  getVert(V){this.vert = V;}
  getHealthSubtractor(V){ this.healthSubtractor = V;}

  
  damaged(DMG, H, V, P){
    this.hit = true;
    this.bulletDamage = DMG;
    this.showHealthBar = true;
    this.protagonist = P;
    
    this.driftX = H;
    this.driftY = V;
    this.startX = this.xpos - (this.driftX * this.drift);
    this.startY = this.ypos - (this.driftY * this.drift);
  }
  
  shoved(DMG, P){
    this.shove = true;
    this.bulletDamage = DMG;
    this.showHealthBar = true;
    this.protagonist = P;
  }
  
  // Custom methods when Attributes increased
  incrementMaxHealth(){ }
  incrementHealthRegen(){ }
  incrementBulletSpeed(){ }
  incrementBulletDamage(){ this.healthSubtractor += 0.5; }
  incrementBulletDistance(){ }
  incrementMovementSpeed(){ }
  incrementBodyDamage(){ }
  
  // Custom method for returning Variables
  
  returnXpos(){ return  this.xpos;}
  returnYpos(){ return  this.ypos;}
  returnWidth(){ return  this.squareWidth;}
  returnHealth(){ return  this.healthDecrement;}
  returnDamage(){ return  this.damage;}
  returnXP(){ return  this.xp;}
  returnID(){return  this.ID;}
  returnColor(){ return  this.outline;}
  returnHit(){ return  this.hit; }
  
  
  // Custom method for drawing the object
  
   display() {
    
    this.xpos = this.startX + (this.driftX * this.drift);
    this.ypos = this.startY + (this.driftY * this.drift);
    
    for (let o of opponents){
        if (sqrt(sq(o.returnX() - this.returnXpos()) + sq(o.returnY() - this.returnYpos())) <= 60){ 
            this.getHealthSubtractor(100);
            this.shoved(o.returnBodyDamage(), false); 
            this.getHealthSubtractor(100);
            o.shoved(this.returnDamage());
            //particles.push(new Particle(p.returnXpos() + 15, p.returnYpos() + 15, p.returnColor(), 1));
        }
        if (this.returnHealth() <= 0) destroyedSquares.push(this);
    }
    
    if (sqrt(sq(p.returnXpos() - this.returnXpos()) + sq(p.returnYpos() - this.returnYpos())) <= 60){ 
        this.getHealthSubtractor(100);
        this.shoved(p.returnBodyDamage(), true); 
        this.getHealthSubtractor(100);
        p.shoved(this.returnDamage());
        //particles.push(new Particle(p.returnXpos() + 15, p.returnYpos() + 15, p.returnColor(), 1));
    }
    if (this.returnHealth() <= 0) destroyedSquares.push(this);
    
    push();
    translate(this.xpos + 15, this.ypos + 21);
    rotate(degrees(this.degrees));
    fill(60);    // SHADOW
    rect(-15, -15, this.squareWidth, this.squareWidth);
    pop();
    
    if (this.showHealthBar == true){
      
        // HEALTH BAR OUTLINE
        fill(60); 
        rect(this.xpos + 2 - 1, this.ypos + 40 - 1, this.squareWidth + 2, 7);        // need the y -1 for the top outline,  7 height, 5, increment
        ellipse(this.xpos + 2, this.ypos + 40 - 1 + 3.5, 7, 7);
        ellipse(this.xpos + 2 + this.squareWidth, this.ypos + 40 - 1 + 3.5, 7, 7);
      
        if (this.healthDecrement > this.health){  // DECREMENT THE HEALTHBAR
            fill(0, 255, 0);
            rect(this.xpos + 2, this.ypos + 40, this.squareWidth * (this.healthDecrement / this.maxHealth), 5);
            ellipse(this.xpos + 2, this.ypos + 40 + 2.5, 5, 5);
            ellipse(this.xpos + 2 + this.squareWidth * (this.healthDecrement / this.maxHealth), this.ypos + 40 + 2.5, 5, 5);
      
            this.healthDecrement -= this.healthSubtractor * m;    // SOOO CLEAN!!
        
        } else{  // DO NOT MOVE HEALTH BAR
            fill(0, 255, 0);
            rect(this.xpos + 2, this.ypos + 40, this.squareWidth * (this.health / this.maxHealth), 5);
            ellipse(this.xpos + 2, this.ypos + 40 + 2.5, 5, 5);
            ellipse(this.xpos + 2 + this.squareWidth * (this.health / this.maxHealth), this.ypos + 40 + 2.5, 5, 5);
        }
    }
    
    push();
    translate(this.xpos + 15, this.ypos + 15);
    rotate(degrees(this.degrees));
    
    if (this.hit == false && this.shove == false) {    // DRAW REGULAR SQUARE OBJECT
      fill(235, 220, 0);
      rect(-15, -15, this.squareWidth, this.squareWidth);
      fill(255, 240, 0);
      rect(-15 + (this.squareWidth * 0.15), -15 + (this.squareWidth * 0.15), this.squareWidth * 0.7, this.squareWidth * 0.7);
    } else {
      if (this.count == 0) {
        if (this.hit == true) {
          this.health -= this.bulletDamage;
          this.acceleration += 0.03;
        }
        if (this.shove == true) {
          this.health -= (this.bulletDamage * 100000);
          this.acceleration += 0.08;
          this.healthSubtractor = 5000;
        }
      }
      if (this.count <= 10 / m) {    // FLASH RED
        fill(235, 0, 0);
        rect(-15, -15, this.squareWidth, this.squareWidth);
        fill(255, 0, 0);
        rect(-15 + (this.squareWidth * 0.15), -15 + (this.squareWidth * 0.15), this.squareWidth * 0.7, this.squareWidth * 0.7);
      }
      if (this.count > 10 / m && this.count <= 20 / m) {  // FLASH WHITE
        fill(235);
        rect(-15, -15, this.squareWidth, this.squareWidth);
        fill(255);
        rect(-15 + (this.squareWidth * 0.15), -15 + (this.squareWidth * 0.15), this.squareWidth * 0.7, this.squareWidth * 0.7);
      }
      if (this.count < 20 / m) this.count++;
      else {this.hit = false; this.shove = false; this.count = 0;}  // END THE HIT STAGE
    }
    
    this.degrees += 0.0001  * m;
    this.drift += (0 + this.acceleration)  * m;
    
    pop();
  }
}
    
    
    












