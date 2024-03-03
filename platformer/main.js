let player;
let platforms = [];

function setup() {
  createCanvas(windowWidth, windowWidth / (16 / 9));
  player = new Player();
  platforms.push(new Platform(0, height - 100, width, 100));
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth / (16 / 9));
}

function draw() {
  background(220);
  handleInput();
  player.update();
  player.show();
  platforms.forEach(platform => {
    platform.show();
    player.collide(platform);
  });
}

function handleInput() {
  player.stopX();
  if (keyIsDown(87) || keyIsDown(32)) { // W key or spacebar for jump
    player.jump();
  }
  if (keyIsDown(65)) { // A key for moving left
    player.moveLeft();
  }
  if (keyIsDown(68)) { // D key for moving right
    player.moveRight();
  }
}


class Player {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.w = 50;
    this.h = 50;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.6;
    this.jumpForce = -15;
    this.isOnGround = false;
    this.speed = 10;
  }

  update() {
    this.y += this.velocityY;
    this.x += this.velocityX;
    this.velocityY += this.gravity;
    this.isOnGround = this.y + this.h >= height;
    if (this.isOnGround) {
      this.y = height - this.h;
      this.velocityY = 0;
    }
    this.x = constrain(this.x, 100, width - this.w - 100);
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  jump() {
    if (this.isOnGround) {
      this.velocityY = this.jumpForce;
    }
  }

  moveRight() {
    this.velocityX = this.speed;
  }

  moveLeft() {
    this.velocityX = -this.speed;
  }

  stopX() {
    this.velocityX = 0;
  }

  collide(platform) {
    if (
      this.x + this.w > platform.x &&
      this.x < platform.x + platform.w &&
      this.y + this.h > platform.y &&
      this.y < platform.y + platform.h
    ) {
      this.velocityY = 0;
      this.y = platform.y - this.h;
      this.isOnGround = true;
    }
  }
}

class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    fill(50);
    rect(this.x, this.y, this.w, this.h);
  }
}
