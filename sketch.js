let bg;
let petals = [];
let bgWidth, bgHeight;
let fullscreenButton;

function preload() {
  // 載入背景圖
  bg = loadImage('Bg-2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateBackgroundSize();
  
  // 創建全屏按鈕
  fullscreenButton = createButton('全螢幕');
  fullscreenButton.position(10, 10);
  fullscreenButton.mousePressed(toggleFullscreen);
  
  for (let i = 0; i < 100; i++) {
    petals.push(new Petal());
  }
}

function draw() {
  background(252, 227, 3, 150); // 填充白色背景
  imageMode(CENTER); // 設定圖像模式為中心
  image(bg, width / 2, height / 2, bgWidth, bgHeight); // 將背景圖置於畫布中心
  
  for (let petal of petals) {
    petal.update();
    petal.display();
  }
}

function toggleFullscreen() {
  let fs = fullscreen();
  fullscreen(!fs);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當窗口大小改變時，重新調整畫布大小
  calculateBackgroundSize();
}

function calculateBackgroundSize() {
  let canvasRatio = width / height;
  let imageRatio = bg.width / bg.height;

  if (canvasRatio > imageRatio) {
    // 畫布比較寬，以高度為基準縮放
    bgHeight = height;
    bgWidth = bgHeight * imageRatio;
  } else {
    // 畫布比較高，以寬度為基準縮放
    bgWidth = width;
    bgHeight = bgWidth / imageRatio;
  }
}
