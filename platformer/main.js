let player;
let platforms = [];
let b1, b2, b3;
let cameraX = 0;

function setup() {
  createCanvas(windowWidth, windowWidth / (16 / 9));
  player = new Player();
  platforms.push(new Platform(0, height - (height / 5), width, height / 5));
  b1 = new Background(loadImage("images/background_layer_1.png"), 3);
  b2 = new Background(loadImage("images/background_layer_2.png"), 2);
  b3 = new Background(loadImage("images/background_layer_3.png"), 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth / (16 / 9));
}

function draw() {
  background(200);
  handleInput();
  b1.display();
  b2.display();
  b3.display();
  player.update();
  player.show();
  platforms.forEach(platform => {
    platform.show();
    player.collide(platform);
  });
  text(player.distance, width/5, height/5);
  text(cameraX, width/4, height/4);
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
    this.x = 10;
    this.y = height - 50;
    this.w = height / 15;
    this.h = height / 15;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = height / 600;
    this.jumpForce = -height / 30;
    this.isOnGround = false;
    this.speed = height / 100;
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
    this.x = constrain(this.x, 100, width / 2);
    cameraX += this.x == 100 || this.x == (width / 2) ? this.velocityX : 0;
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

// background class for each of the backgrounds

class Background {
  constructor(B, Z) {
    this.background = B;
    this.depth = Z;
    this.bWidth = B.width;
  }

  // Custom method for updating the variables
  world2ScreenX(x, z) {
    return (x - cameraX) / (z * 2); // word will go to the left
  }

  // Custom methods for drawing the object
  display() {
    // wrapping images for both forward and back player movement.
    image(this.background, this.world2ScreenX(windowWidth, this.depth) - windowWidth * 2, 0, windowWidth * 2, height);
    image(this.background, this.world2ScreenX(windowWidth, this.depth), 0, windowWidth * 2, height);
    image(this.background, this.world2ScreenX(windowWidth, this.depth) + windowWidth * 2, 0, windowWidth * 2, height);
  }
}
