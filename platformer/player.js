class Player {

  // player position variables

  constructor(X, Y) {
    this.xpos = X;
    this.ypos = Y;
    this.Ypos = Y;
    this.yvelocity = 4;
    this.gravity = 0.2;

    // health bar information

    this.maxHealth = 100;
    this.health = 100;

    this.speed = 3;
    this.charDiam;
    this.animFrame = 0;

    this.state = 0;
    this.right = true;

    this.jump = false;
    this.jumpFrame = 0;

    this.attack = false;
    this.attackFrame = 0;

    this.death = false;
    this.disappear = false;
    this.deathFrame = 5;

    this.parallaxR = false;
    this.parallaxL = false;

    this.playerSheet;
    this.idles = new Array(6);
    this.runR = new Array(8);
    this.jumpR = new Array(10);
    this.attackR = new Array(8);
    this.deathR = new Array(12);

    this.states = [];

    this.playerSheet = loadImage("SideScroller/character/char_blue_right.png");

    this.charDiam = this.playerSheet.width / 12;

    for (let i = 0; i < this.idles.length; i++)
      this.idles[i] = this.playerSheet.get(i * this.charDiam, 0, this.charDiam, this.charDiam);

    for (let i = 0; i < this.attackR.length; i++)
      this.attackR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam, this.charDiam, this.charDiam);

    for (let i = 0; i < this.runR.length; i++)
      this.runR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam * 2, this.charDiam, this.charDiam);

    for (let i = 0; i < this.jumpR.length; i++)
      this.jumpR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam * 3, this.charDiam, this.charDiam);

    for (let i = 0; i < this.deathR.length; i++)
      this.deathR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam * 4, this.charDiam, this.charDiam);

    this.states.push(this.idles);
    this.states.push(this.runR);
    this.states.push(this.jumpR);
    this.states.push(this.attackR);
    this.states.push(this.deathR);
  }

  death() {
    this.death = true;
  }

  // Custom methods for updating the variables

  left() {
    if (!this.death) {
      if (!this.attack) {
        this.xpos -= this.speed;
        this.right = false;
      }
      this.state = 1;
      this.animFrame = (frameCount / 5) % 8;
    }
  }

  right() {
    if (!this.death) {
      if (!this.attack) {
        this.xpos += this.speed;
        this.right = true;
      }
      this.state = 1;
      this.animFrame = (frameCount / 5) % 8;
    }
  }

  resetHealth() {
    this.health = this.maxHealth;
  }

  jump() {
    if (!this.attack) {
      this.jump = true;
    }
  }

  attack() {
    if (!this.jump) {
      this.attack = true;
    }
  }

  jumpFalse() {}
  attackFalse() {}
  rightFalse() {}
  leftFalse() {}

  // Custom methods for returning Variables

  returnXpos() {
    return this.xpos;
  }

  returnParallaxR() {
    return this.parallaxR;
  }

  returnParallaxL() {
    return this.parallaxL;
  }

  returnAttack() {
    return this.attack;
  }

  returnHealth() {
    return this.health;
  }

  returnMaxHealth() {
    return this.maxHealth;
  }

  returnCharDiam() {
    return this.charDiam;
  }

  returnDisappear() {
    return this.disappear;
  }

  // Custom method for drawing the object

  actions(n) {
    if (this.jump) {
      image(this.jumpR[Math.floor(this.jumpFrame / 5) % 10], n * this.xpos, this.ypos -= this.yvelocity);
      this.jumpFrame++;
      this.yvelocity -= this.gravity;

      if (Math.floor(this.jumpFrame / 5) % 10 === 0) {
        this.jump = false;
        this.jumpFrame = 5;
        this.yvelocity = 4;
        this.ypos = this.Ypos;
      }
    } else if (this.attack) {
      image(this.attackR[Math.floor(this.attackFrame / 5) % 8], n * this.xpos, this.ypos);
      this.attackFrame++;

      if (Math.floor(this.attackFrame / 5) % 8 === 0) {
        this.attack = false;
        this.attackFrame = 5;
      }
    } else {
      image(this.states[this.state][this.animFrame], n * this.xpos, this.ypos);
    }
  }

  display() {
    if (!this.death) {
      if (this.health < this.maxHealth) this.health += 0.08;

      if (!keyIsPressed) {
        this.state = 0;
        this.animFrame = (frameCount / 5) % 6;
      }

      if (this.xpos > width * 0.8) {
        cameraX += this.speed;
        this.xpos -= this.speed;
        this.parallaxR = true;
        distance++;
      } else if (this.xpos < width * 0.15) {
        cameraX -= this.speed;
        this.xpos += this.speed;
        this.parallaxL = true;
        distance--;
      } else {
        this.parallaxR = false;
        this.parallaxL = false;
      }

      for (let n of enemies) {
        if (n.returnXpos() > this.xpos) {
          if ((n.returnXpos() - this.xpos) <= this.charDiam) {
            if (!this.jump && n.returnAttack()) {
              this.health -= 1;
            }
          }
        } else if (p.returnXpos() > n.returnXpos()) {
          if ((n.returnXpos() - p.returnXpos()) <= p.returnCharDiam()) {
            if ((this.xpos - n.returnXpos()) <= this.charDiam) {
              if (!this.jump && n.returnAttack()) {
                this.health -= 1;
              }
            }
          }
        }
      }

      if (this.right) {
        this.actions(1);
      } else {
        push();
        translate(this.charDiam, 0);
        scale(-1, 1);
        this.actions(-1);
        pop();
      }
    } else {
      if (this.right) {
        image(this.deathR[Math.floor(this.deathFrame / 5) % 12], this.xpos, this.ypos);
        this.deathFrame++;
        if (Math.floor(this.deathFrame / 5) % 12 === 0) {
          this.deathFrame = 5;
          this.disappear = true;
        }
        this.xpos -= 1;
      } else {
        push();
        translate(this.charDiam, 0);
        scale(-1, 1);
        image(this.deathR[Math.floor(this.deathFrame / 5) % 12], -this.xpos, this.ypos);
        this.deathFrame++;
        if (Math.floor(this.deathFrame / 5) % 12 === 0) {
          this.deathFrame = 5;
          this.disappear = true;
        }
        pop();
        this.xpos += 1;
      }
    }
  }
}
