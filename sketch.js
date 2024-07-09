let bg;
let petals = [];

function preload() {
  // 載入背景圖
  bg = loadImage('Bg-2.jpg');
}

function setup() {
  createCanvas(600, 867);
  bg.resize(width, height);
  for (let i = 0; i < 100; i++) {
    petals.push(new Petal());
  }
}

function draw() {
  background(bg);
  for (let petal of petals) {
    petal.update();
    petal.display();
  }
}

class Petal {
  constructor() {
    // 花瓣從右上方出現
    this.x = random(width, width + 200);
    this.y = random(-200, 0);
    this.size = random(10, 20);
    this.speedX = random(-1, -3); // 向左的速度
    this.speedY = random(1, 3);   // 向下的速度
    this.angle = random(TWO_PI);
    this.angularSpeed = random(-0.05, 0.05);
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.angularSpeed;
    // 如果花瓣超出左邊或下邊界，重置位置
    if (this.x < 0 || this.y > height) {
      this.x = random(width, width + 200);
      this.y = random(-200, 0);
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(252, 227, 3, 150); // 淡色
    noStroke();
    ellipse(0, 0, this.size, this.size * 0.7);
    pop();
  }
}
