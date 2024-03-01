// Deveremma
// 300602434

// SETTING UP GLOBAL VARIABLES
let cameraX;
let time;
let distance;
let defeated;
let finish;

let left, right, jump, attack;
let enemies = [];
let dead = [];

let b1;
let b2;
let b3;

let p;

function setup() {
  createCanvas(1000, 180);

  // load in the background and the player objects

  b1 = new Background(loadImage("SideScroller/background/background_layer_1_sm.png"), 3);
  b2 = new Background(loadImage("SideScroller/background/background_layer_2_sm.png"), 2);
  b3 = new Background(loadImage("SideScroller/background/background_layer_3_sm.png"), 1);
  p = new Player(200, height - 10);

  // for repeatability, reset all global variables

  enemies = [];
  enemies.push(new Enemy(1100, height - 10));

  time = 0;
  defeated = 0;
  distance = 0;
  //finish = 0;
  p.resetHealth();

  textSize(16);
  textAlign(CENTER);
  noStroke();

}

function draw() {

  // Below are states for defeat or victory, otherwise keep gameplay going

  if ((time / 60 < 60) && (defeated >= 3) && (distance / 5 >= 100) && (p.returnHealth() > 0)) endgameTick("VICTORY!");
  else if (p.returnDisappear() == true) endgameTick("DEFEAT!");
  else if ((time / 60 > 60) && (defeated < 3)) endgameTick("DEFEAT!");
  else if ((time / 60 > 60) && (distance / 5 < 100)) endgameTick("DEFEAT!");
  else {

    if (p.returnHealth() <= 0) { p.death(); } // play death animation upon player death. 

    time++;
    finish = 0;

    if (jump == true) p.jump();
    if (attack == true) p.attack();
    if (left == true) p.left();
    if (right == true) p.right();
    if (jump == false) p.jumpFalse();
    if (attack == false) p.attackFalse();
    if (left == false) p.leftFalse();
    if (right == false) p.rightFalse();

    // for all enemies, play death animation if no health

    for (let i = enemies.length - 1; i >= 0; i--) {
      let n = enemies[i];
      if (n.returnHealth() <= 0) {
        n.death();
      }
      if (n.returnDisappear() == true) {
        dead.push(n);
      }
    }
    for (let i = dead.length - 1; i >= 0; i--) {
      let n = dead[i];
      enemies.splice(enemies.indexOf(n), 1);
      defeated++;
      enemies.push(new Enemy(int(random(0, 1000)), height - 10));
    }

    // draw objects and clear dead arraylist. 

    dead = [];
    drawParallax();
    p.display();
    drawHud();

    for (let i = 0; i < enemies.length; i++) enemies[i].display(p.returnXpos(), p.returnParallaxR(), p.returnParallaxL(), p.returnAttack());

  }
}

function drawParallax() {
  // display background for parallax effect
  b1.display();
  b2.display();
  b3.display();

}

function endgameTick(s) {
  // at the end of the game, tick for 3 seconds before automatic restart. 
  fill(255);
  text(s, width / 2, 80);
  finish++;
  if ((time + (finish / 60)) == time + 3) { setup(); }
}

function drawHud() {
  // draw the Heads up display, game, time, distance, and enemies defeated
  fill(10, 10, 10, 100);
  rect(0, 0, width, 50);
  fill(255);
  text("Time : " + floor(time / 60), 50, 30);
  text("Distance : " + floor(distance / 5) + "m", 180, 30);
  text("Game Objective: Travel 100m & Defeat 3 Jutsu Clones in 60 seconds", width / 2, 30);
  text("Defeated : " + defeated, width - 100, 30);

  fill(0);
  rect(20, 60, width / 8 + 4, 10);
  rect(20, 74, width / 12 + 4, 10);
  fill(0, 255, 0);
  rect(22, 62, (width / 8) * (p.returnHealth() / p.returnMaxHealth()), 6);
  fill(0, 125, 255);
  rect(22, 76, width / 12, 6);

}

function keyPressed() {
  // keyboard listener, true if key is pressed
  if (key == 'w' || key == ' ') jump = true;
  if (key == 'a') left = true;
  if (key == 's') attack = true;
  if (key == 'd') right = true;
}

function keyReleased() {
  // important that when released, key is no longer true
  if (key == 'w' || key == ' ') jump = false;
  if (key == 'a') left = false;
  if (key == 's') attack = false;
  if (key == 'd') right = false;
}

function mousePressed() {
  // mouse interactions
  attack = true;
}

function mouseReleased() {
  // turn attack off when mouse released. 
  attack = false;
}
