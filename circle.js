function Circle(x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.color = color;
  this.growing = true;

  this.grow = function () {
    if (this.growing) {
      this.r += growthSpeed;
    }
  };

  this.show = function () {
    noStroke();
    fill(this.color);
    // https://stackoverflow.com/questions/60179313/how-to-fill-p5-js-shape-with-an-image
    //ellipse(this.x, this.y, this.r * 2, this.r * 2);
    square(this.x, this.y, this.r);
  };

  this.edges = function () {
    return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  };

  this.overlap = function (x, y) {
    let d = dist(x, y, this.x, this.y);
    return (d - 2 < this.r);
  };
}