function TileObject(x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.color = color;
  this.growing = true;
  this.type = "circle";
  this.initialr = 2;

  this.grow = function () {
    if (this.growing) {
      this.r += growthSpeed;
    }
  };

  this.show = function () {
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

  this.overlap = function (x, y) {
    if (this.type == "circle") {
      let d = dist(x, y, this.x, this.y);
      return (d - this.initialr < this.r);
    } else {
      if (x + this.initialr > this.x + this.r || x - this.initialr < this.x) {
        return false;
      }
      if (y + this.initialr > this.y + this.r || y - this.initialr < this.y) {
        return false;
      }
      return true;
    }
  };

  this.overlaps = function (tile) {
    if (this.type == "circle") {
      let d = dist(this.x, this.y, tile.x, tile.y);
      let distance = this.r + tile.r;

      return (d - growthSpeed < distance);
    } else {
      return this.overlap(tile.x, tile.y) ||
        this.overlap(tile.x + tile.r, tile.y) ||
        this.overlap(tile.x, tile.y + tile.r) ||
        this.overlap(tile.x + tile.r, tile.y + tile.r);
    }
  }
}