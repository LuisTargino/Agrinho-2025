let player;
let cityItems = [];
let farmLocation;
let score = 0;
let gameState = "playing";

function setup() {
  createCanvas(800, 400);
  player = createVector(50, height / 2);
  farmLocation = createVector(width - 100, height / 2);

  // Criar alguns itens na cidade
  for (let i = 0; i < 5; i++) {
    cityItems.push(createVector(random(100, 300), random(50, height - 50)));
  }
}

function draw() {
  background(135, 206, 235); // céu azul

  drawCityAndFarm();
  drawPlayer();

  if (gameState === "playing") {
    drawItems();
    checkItemPickup();
    checkDelivery();
  } else {
    showCelebration();
  }

  showScore();
}

function drawCityAndFarm() {
  fill(180);
  rect(0, 0, 150, height); // cidade
  fill(34, 139, 34);
  rect(width - 150, 0, 150, height); // campo

  fill(0);
  textSize(16);
  text("CIDADE", 30, 30);
  text("CAMPO", width - 130, 30);
}

function drawPlayer() {
  fill(255, 165, 0); // cor do veículo
  rect(player.x, player.y, 40, 20);
}

function keyPressed() {
  if (keyCode === UP_ARROW) player.y -= 10;
  if (keyCode === DOWN_ARROW) player.y += 10;
  if (keyCode === LEFT_ARROW) player.x -= 10;
  if (keyCode === RIGHT_ARROW) player.x += 10;
}

function drawItems() {
  fill(255, 255, 0); // amarelo para os itens
  for (let item of cityItems) {
    ellipse(item.x, item.y, 20, 20);
  }
}

function checkItemPickup() {
  for (let i = cityItems.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, cityItems[i].x, cityItems[i].y) < 20) {
      cityItems.splice(i, 1);
      score += 10;
    }
  }
}

function checkDelivery() {
  if (score >= 50 && dist(player.x, player.y, farmLocation.x, farmLocation.y) < 50) {
    gameState = "finished";
  }
}

function showScore() {
  fill(0);
  textSize(16);
  text("Pontuação: " + score, 10, height - 10);
}

function showCelebration() {
  background(255, 223, 0);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("🎉 Parabéns SENAR pelos 30 anos! 🎉", width / 2, height / 2);
  textSize(20);
  text("Você conectou a cidade ao campo com sucesso!", width / 2, height / 2 + 40);
}
