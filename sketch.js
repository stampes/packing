let circles;
let img;
let pixelsPerFrame = 200;
let growthSpeed = 2;
let maxLoops = 3000;
let tiles = [];
let tilesDb;

function extractImg(src) {
  return src.map(element => {
    let ref = element.app_img.substring(10);
    let last = ref.indexOf('"');

    return ref.substring(0, last);
  });
}

function storeTile(tileimg, error) {
  if (!error) {
    tiles.push(tileimg);
  }
}


function loadTiles(src) {
  let imgs = extractImg(src);
  ims = [...new Set(imgs)];
  imgs.map(e => loadImage(e, storeTile));
}

function preload() {

  img = loadImage("img.jpg");
}


function setup() {
  createCanvas(img.width, img.height);
  rectMode(CENTER);
  square(20, 20, 100);
  let density = displayDensity();
  //pixelDensity(1);
  img.loadPixels();
  circles = [];
  // tilesDb = loadJSON("mapping.json", loadTiles);
}

function draw() {
  background(0);

  let total = pixelsPerFrame;
  let count = 0;
  let attempts = 0;

  while (count < total) {
    let newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > maxLoops) {
      noLoop();
      console.log("finished");
      let minr = Infinity;
      let maxr = 0;
      let tilesize = 7.5;
      let tiles = 0;
      for (let i = 0; i < circles.length; i++) {
        if (circles[i].r > maxr) {
          maxr = circles[i].r;
        } else if (circles[i].r < minr) {
          minr = circles[i].r;
        }
        if (tilesize < circles[i].r) {
          tiles += 1;
        }
      }
      console.log(maxr);
      console.log(minr);
      console.log(tiles);
      console.log(circles.length);
      break;
    }
  }

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (let j = 0; j < circles.length; j++) {
          let other = circles[j];
          if (circle !== other) {
            let d = dist(circle.x, circle.y, other.x, other.y);
            let distance = circle.r + other.r;

            if (d - 1 < distance) {
              circle.growing = false;
              //other.growing = false;
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
  let x = random(0, img.width);
  let y = random(0, img.height);

  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    if (circle.overlap(x, y)) {
      valid = false;
      break;
    }
  }
  if (valid) {
    let index = (int(x) + int(y) * img.width) * 4;
    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    let c = color(r, g, b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}