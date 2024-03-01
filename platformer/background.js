// background class for each of the backgrounds

class Background {
  constructor(B, Z) {
    this.background = B;
    this.depth = Z;
    this.bWidth = B.width;
  }
  
  // Custom method for updating the variables
  world2ScreenX(x, z) {
    return (x - cameraX) / z; // word will go to the left
  }     
  
  // Custom methods for drawing the object
  display() {
    // wrapping images for both forward and back player movement. 
    image(this.background, this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth) - (this.bWidth * 2), 0);
    image(this.background, this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth) - this.bWidth, 0);
    image(this.background, this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth), 0); // z is higher for higher distance. 
    image(this.background, this.bWidth + this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth), 0);
    image(this.background, (this.bWidth * 2) + this.world2ScreenX(this.bWidth * (cameraX / this.bWidth), this.depth), 0);
  }
}
