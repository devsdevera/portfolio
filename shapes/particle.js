class Particle {

  constructor(X, Y, C, N) {
    this.startX = X;
    this.startY = Y;
    this.c = C;
    this.num = N;

    this.sizes = [];
    this.hori = [];
    this.vert = [];

    for (let i = 0; i < this.num; i++) {
      this.sizes.push(int(random(0, 10)));
      this.hori.push(cos(radians(int(random(0, 360)))));
      this.vert.push(cos(radians(int(random(0, 360)))));
    }
    
    this.ParticleDistance = 0;
  }

  returnParticleDistance() {
    return this.ParticleDistance;
  }

  display() {
    for (let i = 0; i < this.sizes.length; i++) {
      fill(20, 20, 20, 255 - (this.ParticleDistance * 5));
      ellipse(this.startX + (this.hori[i] * this.ParticleDistance), this.startY + (this.vert[i] * this.ParticleDistance) + 3, this.sizes[i], this.sizes[i]);
      fill(this.c);
      ellipse(this.startX + (this.hori[i] * this.ParticleDistance), this.startY + (this.vert[i] * this.ParticleDistance), this.sizes[i], this.sizes[i]);
    }
    this.ParticleDistance += 1 * m;
  }
}