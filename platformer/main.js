let player;
let platforms = [];
let img;

function preload() {
  // Load the image
  img = loadImage("images/background_layer_1.png");
}

function setup() {
  createCanvas(windowWidth, windowWidth / (16 / 9));
  player = new Player();
  platforms.push(new Platform(0, height - (height / 5), width, height / 5));
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
  text(player.distance, width/5, height/5);
  image(img, 0, 0);
}

function handleInput() {
  player.velocityX = 0;
  if (keyIsDown(87) || keyIsDown(32)) { // W key or spacebar for jump
    player.jump();
  }
  if (keyIsDown(65)) { // A key for moving left
    player.velocityX = -player.speed;
  }
  if (keyIsDown(68)) { // D key for moving right
    player.velocityX = player.speed;
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
    this.gravity = 0.5;
    this.jumpForce = -15;
    this.isOnGround = false;
    this.speed = 10;
    this.distance = 0;
  }

  update() {
    this.y += this.velocityY;
    this.x += this.velocityX;
    this.distance += this.velocityX;
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
