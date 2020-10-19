var circles;
var img;
var pixelsPerFrame = 15;
var growthSpeed = 0.5;

function preload() {
  img = loadImage("img.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  var density = displayDensity();
  //pixelDensity(1);
  img.loadPixels();
  circles = [];
}

function draw() {
  background(0);

  var total = pixelsPerFrame;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 3000) {
      noLoop();
      console.log("finished");
      let minr = Infinity;
      let maxr = 0;
      let tilesize = 7.5;
      let tiles = 0;
      for (var i = 0; i < circles.length; i++) {
        if (circles[i].r > maxr) { maxr = circles[i].r; }
        else if (circles[i].r < minr) { minr = circles[i].r; }
        if (tilesize<circles[i].r){tiles+=1;}
      }
      console.log(maxr);
      console.log(minr);
      console.log(tiles);
      console.log(circles.length);
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index + 1];
    var b = img.pixels[index + 2];
    var c = color(r, g, b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}