// Enemy class for advanced attack gameplay.

class Enemy {
  
  constructor(X, Y) {
    this.xpos = X;
    this.ypos = Y - this.charDiam;
    this.Ypos = Y - this.charDiam;
    this.yvelocity = 4;
    this.gravity = 0.2;
    this.maxHealth = 50;
    this.health = 50;
    this.showHealthBar = false;
    this.speed = 6;
    this.charDiam;
    this.animFrame;
    this.state = 0;
    this.right = true;
    this.jump = false;
    this.jumpFrame = 0;
    this.attack = false;
    this.attackFrame = 0;
    this.slip = false;
    this.slipFrame = 0;
    this.death = false;
    this.disappear = false;
    this.deathFrame = 5;
    this.states = [];
    this.playerSheet;
    
    this.idles = [];
    this.runR = [];
    this.jumpR = [];
    this.attackR = [];
    this.deathR = [];
    
    this.loadImages();
  }

  loadImages() {
    this.playerSheet = loadImage("SideScroller/character/char_blue_right.png", () => {
      this.charDiam = this.playerSheet.width / 12;
      
      for (let i = 0; i < 6; i++) this.idles[i] = this.playerSheet.get(i * this.charDiam, 0, this.charDiam, this.charDiam);
      for (let i = 0; i < 8; i++) this.attackR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam, this.charDiam, this.charDiam);
      for (let i = 0; i < 8; i++) this.runR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam * 2, this.charDiam, this.charDiam);
      for (let i = 0; i < 10; i++) this.jumpR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam * 3, this.charDiam, this.charDiam);
      for (let i = 0; i < 12; i++) this.deathR[i] = this.playerSheet.get(i * this.charDiam, this.charDiam * 4, this.charDiam, this.charDiam);
      
      this.states.push(this.idles);
      this.states.push(this.runR);
      this.states.push(this.jumpR);
      this.states.push(this.attackR);
      this.states.push(this.deathR);
    });
  }

  death() {
    this.death = true;
  }

  returnHealth() { return this.health; }
  returnXpos() { return this.xpos; }
  returnAttack() { return this.attack; }
  returnDisappear() { return this.disappear; }

  activateAction(a, b, pAttack) {
    let random = int(random(0, 5));
  
    if (a - b <= this.charDiam / 2){
      if (random === 1 && !this.attack && !this.slip) { this.jump = true; }
      else if (random === 2 && !this.jump && !this.slip) { this.attack = true; if (pAttack){ this.showHealthBar = true; this.health -= 2; pAttack = false;} }
      else if (random === 3 && !this.jump && !this.attack) { this.slip = true; if (pAttack){ this.showHealthBar = true; this.health -= 2; pAttack = false;} }
    }
  }

  actions(n) {
    if (this.jump) {
      image(this.jumpR[(this.jumpFrame / 5) % 10], n * this.xpos, this.ypos -= this.yvelocity);
      this.jumpFrame ++;
      this.yvelocity -= this.gravity;
      
      if ((this.jumpFrame / 5) % 10 === 0) {
        this.jump = false;
        this.jumpFrame = 5;
        this.yvelocity = 4;
        this.ypos = this.Ypos;
      }
    } else if (this.attack) {
      image(this.attackR[(this.attackFrame / 5) % 8], n * this.xpos, this.ypos);
      this.attackFrame ++;
      
      if ((this.attackFrame / 5) % 8 === 0) {
        this.attack = false;
        this.attackFrame = 5;
      }
    } else if (this.slip) {
      image(this.idles[(this.slipFrame / 5) % 6], n * this.xpos, this.ypos);
      this.slipFrame ++;
      
      if ((this.slipFrame / 5) % 6 === 0) {
        this.slip = false;
        this.slipFrame = 5;
      }
    } else {
      image(this.states[this.state][this.animFrame], n * this.xpos, this.ypos);
    }
  }

  display(pXpos, parallaxR, parallaxL, pAttack) {
    if (!this.death) {
      if (this.xpos > pXpos + 150) {
        if (!this.attack) { this.xpos -= 2; } this.state = 1; this.right = false;  this.animFrame = (frameCount / 5) % 8;
      } else if (this.xpos < pXpos - 150) {
        if (!this.attack) { this.xpos += 2; } this.state = 1; this.right = true;  this.animFrame = (frameCount / 5) % 8;
      } else { 
        if (this.xpos > pXpos) { this.right = false; this.activateAction(this.xpos, pXpos, pAttack); }
        else if (this.xpos < pXpos) { this.right = true; this.activateAction(pXpos, this.xpos, pAttack); }
        this.state = 0; this.animFrame = (frameCount / 5) % 6; 
      }

      if (parallaxR) { this.xpos -= this.speed; }
      else if (parallaxL) { this.xpos += this.speed; }

      if (this.showHealthBar) {
        fill(0);
        rect(this.xpos - 1 + (this.charDiam / 4), this.ypos - 1 + 5, (this.charDiam / 2) + 2, 6);
        fill(0, 255, 0);
        rect(this.xpos + (this.charDiam / 4), this.ypos + 5, (this.charDiam / 2) * (this.health / this.maxHealth), 4);
      }

      if (this.right) {  // RIGHT
        this.actions(1);
      } else {   // LEFT
        push();
        translate(this.charDiam, 0);
        scale(-1, 1);
        this.actions(-1);
        pop();
      }
    } else {
      this.attack = false;
      this.jump = false;
      
      if (this.right) {
        image(this.deathR[(this.deathFrame / 5) % 12], this.xpos, this.ypos);
        this.deathFrame ++;
        if ((this.deathFrame / 5) % 12 === 0) {
          this.deathFrame = 5;
          this.disappear = true;
        }
        this.xpos -= 1;
      } else {  
        push();
        translate(this.charDiam, 0);
        scale(-1, 1);
        image(this.deathR[(this.deathFrame / 5) % 12], -this.xpos, this.ypos);
        this.deathFrame ++;
        if ((this.deathFrame / 5) % 12 === 0) {
          this.deathFrame = 5;
          this.disappear = true;
        }
        pop();
        this.xpos += 1;
      }
    }
  }
}
