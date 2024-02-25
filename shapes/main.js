let menu, over, paused;
let winWidth = window.innerWidth * 0.9;
let width = winWidth;
let height = winWidth / (16.0 / 9.0);
let time = 0, totalXP, up = false, down = false, left = false, right = false, opponentCount = 0;
let frameR = 60, m = 1.0 / (frameR / 240.0);
let radian, radianX, radianY, hori, vert;
let cursorX, cursorY, displacementX, displacementY;
let bullets = [], dysfunctionalBullets = [];
let particles = [], dysfunctionalParticles = [];
let squares = [], pentagons = [], hexagons = [], opponents = [];
let destroyedSquares = [], destroyedPentagons = [], destroyedHexagons = [], destroyedOpponents = [];
let squareRate, pentagonRate, hexagonRate, modulo;
let state = "menu", showChart = false;
let p, c;

function preload() {
  menu = loadImage("images/menu2x.png");
  over = loadImage("images/over2x.png");
  paused = loadImage("images/paused2x.png");
}

function admin() {
  squares = [];
  pentagons = [];
  hexagons = [];
  opponents = [];
  bullets = [];
  particles = [];
  opponentCount = 0;

  c = new Chart(300, height * (1.0 / 4.0));
  p = new Protagonist(width / 2, height / 2, c);

  for (let i = 0; i < 3; i++) squares.push(new Square(int(random(0, width)), int(random(0, height)), squares.length));
  for (let i = 0; i < 2; i++) pentagons.push(new Pentagon(int(random(0, width)), int(random(0, height)), pentagons.length));
  for (let i = 0; i < 1; i++) hexagons.push(new Hexagon(int(random(0, width)), int(random(0, height)), hexagons.length));
}

function setup() {
  if (m > 1) m -= 1;
  createCanvas(winWidth, winWidth / (16.0 / 9.0));
  frameRate(frameR);
  noStroke();
  ellipseMode(CENTER);
  admin();
}

function windowResized() {
  winWidth = window.innerWidth;
  width = winWidth;
  height = winWidth / (16.0 / 9.0);
  resizeCanvas(winWidth, winWidth / (16.0 / 9.0));
  p.startX = winWidth / 2;
  p.startY = height / 2;
}

function draw() {
  if (state == "menu") background(menu);
  else if (state == "paused-j" || state == "paused-e") background(paused);
  else if (state == "dead-j" || state == "dead-e") {
    background(over);
    fill(0);
  } else if (state == "gameplay-j" || state == "gameplay-e") {
    background(255);
    time += (1.0 / frameR);
    if (p.returnHealth() <= 0) state = state.startsWith("gameplay") ? "dead-e" : "dead-j";
    if (Math.floor(modulo) < p.returnHealthRegen()) modulo ++;
    else modulo = p.incrementHealth();
    playerMovement();
    shapeGenerator();
    pBulletHits();
    for (let b of bullets) {
      if (sqrt(sq(p.returnXpos() - b.returnXpos()) + sq(p.returnYpos() - b.returnYpos())) <= 55 && b.protagonist == false) {
        if (!p.returnBulletHistory().includes(b)) {
          p.getBullet(b);
          p.shoved(b.bulletDamage);
          particles.push(new Particle(p.returnXpos(), p.returnYpos(), p.returnColor(), 5));
        }
      }
    }
    for (let g of particles) if (g.returnParticleDistance() >= 50) dysfunctionalParticles.push(g);
    destroyedObjects();
    if (p.ePoints <= 0) {
      push();
      translate(-(p.returnXpos() - (width / 2)), -(p.returnYpos() - (height / 2)));
      for (let b of bullets) b.display();
      for (let s of squares) s.display();
      for (let f of pentagons) f.display();
      for (let h of hexagons) h.display();
      for (let o of opponents) o.display();
      p.display();
      for (let g of particles) g.display();
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
  if (int(random(0, 1200 * 0.3)) == 69 && squares.length <= 10) squares.push(new Square(int(random(0, width)), int(random(0, height)), squares.length));
  if (int(random(0, 1200 * 0.3)) == 69 && pentagons.length <= 10) pentagons.push(new Pentagon(int(random(0, width)), int(random(0, height)), pentagons.length));
  if (int(random(0, 1200 * 0.3)) == 69 && hexagons.length <= 10) hexagons.push(new Hexagon(int(random(0, width)), int(random(0, height)), hexagons.length));
}

function playerMovement() {
  if (up) p.Goup();
  if (down) p.Godown();
  if (left) p.Goleft();
  if (right) p.Goright();
  if (!up) p.GoupFalse();
  if (!down) p.GodownFalse();
  if (!left) p.GoleftFalse();
  if (!right) p.GorightFalse();
}

function pBulletHits() {
  for (let s of squares) s.getHealthSubtractor(p.returnBulletSubtractor());
  for (let f of pentagons) f.getHealthSubtractor(p.returnBulletSubtractor());
  for (let h of hexagons) h.getHealthSubtractor(p.returnBulletSubtractor());
  for (let o of opponents) o.getHealthSubtractor(p.returnBulletSubtractor());
}

function destroyedObjects() {
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
    if (int(random(1, 3)) == 1) {
      if (p.returnLevel() >= 10) opponents.push(new Opponent(int(random(0, width)), int(random(0, height)), 3, 5, 20, 40, 50, 100, 0, 0, 300, 100, 3000, 3000, 1000, 3000, 2, 2, int(random(1, 5))));
      else opponents.push(new Opponent(int(random(0, width)), int(random(0, height)), 3, 5, 20, 40, 50, 100, 0, 0, 300, 100, 3000, 3000, 1000, 3000, 2, 2, 1));
    } else {
      if (p.returnLevel() >= 10) opponents.push(new Opponent(100, 100, 1, 2, 20, 8, 40, 60, 1, 1.5, 300, 300, 500, 500, 1000, 3000, 0.5, 0.1, int(random(1, 5))));
      else opponents.push(new Opponent(100, 100, 1, 2, 20, 8, 40, 60, 1, 1.5, 300, 300, 500, 500, 1000, 3000, 0.5, 0.1, 1));
    }
  }
  for (let g of dysfunctionalParticles) particles.splice(particles.indexOf(g), 1);
  for (let b of dysfunctionalBullets) bullets.splice(bullets.indexOf(b), 1);
  dysfunctionalBullets = [];
  dysfunctionalParticles = [];
  destroyedSquares = [];
  destroyedPentagons = [];
  destroyedHexagons = [];
  destroyedOpponents = [];
}

function upgradeStats(n) {
  return (cursorX > c.returnStatLeft() && cursorX < c.returnStatRight() && cursorY > c.returnStatTop() + n && cursorY < c.returnStatBottom() + n && p.returnPoints() >= 1);
}

function mouseReleased() {
  cursorX = mouseX;
  cursorY = mouseY;
  if (state === "menu") {
    if (cursorX >= (width * 0.16) && cursorX <= (width * 0.48984375) && cursorY >= (height * 0.40) && cursorY <= (height * 0.839583333)) state = "gameplay-j";
    if (cursorX >= (width * 0.52) && cursorX <= (width * 0.84453125) && cursorY >= (height * 0.402083333) && cursorY <= (height * 0.839583333)) {
      state = "gameplay-e";
      p.level = 30;
      p.ePoints = 30;
      showChart = true;
    }
  } else if ((state === "paused-e" || state === "paused-j") && cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875)) {
    if ((state === "paused-e" && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444)) || (state === "paused-j" && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444))) state = state === "paused-e" ? "gameplay-e" : "gameplay-j";
    else if ((state === "paused-e" && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125)) || (state === "paused-j" && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125))) {
      state = "menu";
      admin();
    }
  } else if ((state === "dead-j" || state === "dead-e") && cursorX >= (width * 0.30) && cursorX <= (width * 0.713671875)) {
    admin();
    if ((state === "dead-e" && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444)) || (state === "dead-j" && cursorY >= (height * 0.62) && cursorY <= (height * 0.706944444))) state = state === "dead-e" ? "gameplay-e" : "gameplay-j";
    else if ((state === "dead-e" && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125)) || (state === "dead-j" && cursorY >= (height * 0.74375) && cursorY <= (height * 0.83125))) state = "menu";
  } else if (state === "gameplay-e" || state === "gameplay-j") {
    if (mouseButton === LEFT) {
      if (cursorX > c.returnTabLeft() && cursorX < c.returnTabRight() && cursorY > c.returnTabTop() && cursorY < c.returnTabBottom() && c.returnShowChart()) c.hideChart();
      else if (cursorX > c.returnTabLeft() && cursorX < c.returnTabRight() && cursorY > c.returnTabTop() && cursorY < c.returnTabBottom() && !c.returnShowChart()) c.showChart(p.returnPoints());
      if (upgradeStats(10) && c.returnMaxHealthPoints() < 15) { c.incrementMaxHealth(); p.incrementMaxHealth(); if (p.ePoints > 0) p.ePoints -= 1; }
      if (upgradeStats(44) && c.returnHealthRegenPoints() < 15) { c.incrementHealthRegen(); p.incrementHealthRegen(); if (p.ePoints > 0) p.ePoints -= 1; }
      if (upgradeStats(78) && c.returnBulletSpeedPoints() < 15) { c.incrementBulletSpeed(); p.incrementBulletSpeed(); if (p.ePoints > 0) p.ePoints -= 1; }
      if (upgradeStats(112) && c.returnBulletDamagePoints() < 15) { c.incrementBulletDamage(); p.incrementBulletDamage(); if (p.ePoints > 0) p.ePoints -= 1; }
      if (upgradeStats(146) && c.returnBulletDistancePoints() < 15) { c.incrementBulletDistance(); p.incrementBulletDistance(); if (p.ePoints > 0) p.ePoints -= 1; }
      if (upgradeStats(180) && c.returnBodyDamagePoints() < 15) { c.incrementBodyDamage(); p.incrementBodyDamage(); if (p.ePoints > 0) p.ePoints -= 1; }
      if (upgradeStats(214) && c.returnMovementSpeedPoints() < 15) { c.incrementMovementSpeed(); p.incrementMovementSpeed(); if (p.ePoints > 0) p.ePoints -= 1; }
    }
  }
}

function barrelAim() {
  cursorX = mouseX;
  cursorY = mouseY;
  if (cursorX < width / 2) displacementX = width / 2 - cursorX;
  else if (cursorX > width / 2) displacementX = cursorX - width / 2;
  if (cursorY < height / 2) displacementY = height / 2 - cursorY;
  else if (cursorY > height / 2) displacementY = cursorY - height / 2;
  radianX = displacementX * PI / 180;
  radianY = displacementY * PI / 180;
  radian = atan(radianY / radianX);
  if (cursorX > width / 2 && cursorY > height / 2) { hori = cos(radian); vert = sin(radian); } // RIGHT BOTTOM
  if (cursorX > width / 2 && cursorY < height / 2) { hori = cos(radian); vert = sin(radian + PI); } // RIGHT TOP
  if (cursorX < width / 2 && cursorY > height / 2) { hori = cos(radian + PI); vert = sin(radian); } // LEFT BOTTOM
  if (cursorX < width / 2 && cursorY < height / 2) { hori = cos(radian + PI); vert = sin(radian + PI); } // LEFT TOP
  p.hori = hori; p.vert = vert;
}

function mousePressed() {
  bullets.push(new Bullet(60, p.returnX(), p.returnY(), p.returnHori(), p.returnVert(), p.returnBulletSpeed(), p.returnBulletDamage(), p.returnBulletColor(), p.returnBulletDistance(), true));
  p.getHoriOpp(cos(acos(p.returnHori()) + PI));
  p.getVertOpp(sin(asin(p.returnVert()) + PI));
}

function mouseMoved() { barrelAim(); }

function mouseDragged() { barrelAim(); }

function keyPressed() {
  if (keyCode === 87) up = true;
  if (keyCode === 65) left = true;
  if (keyCode === 83) down = true;
  if (keyCode === 68) right = true;
}

function keyReleased() {
  if (keyCode === 87) up = false;
  if (keyCode === 65) left = false;
  if (keyCode === 83) down = false;
  if (keyCode === 68) right = false;
}
