function TileObject(x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.color = color;
  this.growing = true;
  this.type = "square";
  this.initialr = 2;

  this.grow = function () {
    if (this.growing) {
      this.r += growthSpeed;
    }
  };

  this.show = function () {
    rectMode(CORNER);
    noStroke();
    fill(this.color);
    // https://stackoverflow.com/questions/60179313/how-to-fill-p5-js-shape-with-an-image
    if (this.type == "circle") {
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    } else {
      square(this.x, this.y, this.r);
    }
  };

  this.edges = function () {
    if (this.type == "circle") {
      return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
    } else {
      return (this.x + this.r >= width || this.x <= 0 || this.y + this.r >= height || this.y <= 0)
    }
  };

  this.overlap = function (x, y, overlapdist) {
    if (!overlapdist) {
      overlapdist = this.initialr;
    }
    if (this.type == "circle") {
      let d = dist(x, y, this.x, this.y);
      return (d - overlapdist < this.r);
    } else {
      return !((x + overlapdist > this.x + this.r) || (x - overlapdist < this.x) || (y + overlapdist > this.y + this.r) || (y - overlapdist < this.y))
    }
  };

  this.overlaps = function (tile) {
    if (this.type == "circle") {
      let d = dist(this.x, this.y, tile.x, tile.y);
      let distance = this.r + tile.r;

      return (d - growthSpeed < distance);
    } else {
      let growthLimit = -growthSpeed
      return this.overlap(tile.x, tile.y, growthLimit) ||
        this.overlap(tile.x + tile.r, tile.y, growthLimit) ||
        this.overlap(tile.x, tile.y + tile.r, growthLimit) ||
        this.overlap(tile.x + tile.r, tile.y + tile.r, growthLimit);
    }
  }
}