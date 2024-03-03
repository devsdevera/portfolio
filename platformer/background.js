// background class for each of the backgrounds

class Background {
  
  constructor(B, Z) {
    this.background = B;
    this.depth = Z;
    this.bWidth = B.width;
  }
  
  world2ScreenX(x, z) {
    return (x - cameraX) / z;
  }
  
  display() {
    image(this.background, this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth) - (this.bWidth * 2), 0);
    image(this.background, this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth) - this.bWidth, 0);
    image(this.background, this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth), 0);
    image(this.background, this.bWidth + this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth), 0);
    image(this.background, (this.bWidth * 2) + this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth), 0);
  }
}
