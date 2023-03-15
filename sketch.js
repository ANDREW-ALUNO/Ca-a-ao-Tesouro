var dragon1, dragon2, dragonImg;
var playerImg
var gameState = "start";
var vy1 = -2;
var vy2 = 2;
var score = 0;
var player;
var chestImg;
var bgImg;
var allChests = [];

var chests = [
  { x: 300, y: 380, isCollected: false },
  { x: 800, y: 90, isCollected: false },
  { x: 700, y: 380, isCollected: false },
  { x: 1380, y: 130, isCollected: false },
  { x: 1430, y: 400, isCollected: false },
  { x: 1800, y: 80, isCollected: false },
];
var upWall,
  downWall,
  leftWall,
  allWalls = [];
var walls = [
  { x: 10, y: 20, w: 1700, h: 40, color: "brown" }, //topbrick
  { x: 10, y: 450, w: 1700, h: 40, color: "brown" },
  { x: 10, y: 450, w: 40, h: 900, color: "brown" }, //left brick
  { x: 600, y: 50, w: 250, h: 40, color: "brown" }, //reverse stair
  { x: 600, y: 90, w: 150, h: 40, color: "brown" }, //reverse stair
  { x: 600, y: 130, w: 80, h: 40, color: "brown" }, //reverse stair
  { x: 700, y: 300, w: 250, h: 40, color: "brown" }, //reverse L
  { x: 800, y: 370, w: 50, h: 120, color: "brown" }, //reverse L
  { x: 300, y: 300, w: 250, h: 40, color: "brown" }, //Reverse L
  { x: 200, y: 370, w: 50, h: 120, color: "brown" }, //RerverseL

  { x: 1000, y: 20, w: 2000, h: 40, color: "brown" }, //upperbrick
  { x: 1000, y: 450, w: 2000, h: 40, color: "brown" }, // lowerbrick 1
  { x: 900, y: 450, w: 40, h: 700, color: "brown" }, // left brick
  { x: 1100, y: 165, w: 200, h: 250, color: "brown" }, //big block
  { x: 1250, y: 420, w: 50, h: 25, color: "brown" }, //stairs
  { x: 1300, y: 395, w: 50, h: 25, color: "brown" }, //stairs
  { x: 1350, y: 370, w: 50, h: 25, color: "brown" }, //stairs
  { x: 1500, y: 370, w: 50, h: 25, color: "brown" }, //reverse stairs
  { x: 1550, y: 395, w: 50, h: 25, color: "brown" }, //reverse stairs
  { x: 1600, y: 420, w: 50, h: 25, color: "brown" }, //reverse stairs
  { x: 1760, y: 150, w: 250, h: 40, color: "brown" },
  { x: 1900, y: 105, w: 40, h: 130, color: "brown" },
  { x: 1950, y: 350, w: 100, h: 250, color: "brown" },
];

function preload() {
  chestImg = loadImage("chest.png");
  playerImg = loadImage("A.png")
  dragonImg = loadImage("Dragon2.png");
  bgImg = loadImage("background4.png");
}

function setup() {
  createCanvas(950, 470);
  player = createSprite(100, 440, 20, 20);
  dragon1 = createSprite(500, height / 2, 50, 50);
  dragon2 = createSprite(700, height / 2, 50, 50);
  player.addImage(playerImg)
  dragon1.addImage(dragonImg);
  dragon2.addImage(dragonImg);
  player.scale = 0.03
  dragon1.scale = 0.08;
  dragon2.scale = 0.08;
  for (var i in walls) {
    var wall = createSprite(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
    wall.shapeColor = walls[i].color;
    allWalls.push(wall);
  }
  for (var j in chests) {
    var chest = createSprite(chests[j].x, chests[j].y);
    chest.addImage(chestImg);
    chest.scale = 0.09;
    allChests.push(chest);
  }
}

function moveDragon() {
  dragon1.velocityY = vy1;
  dragon2.velocityY = vy2;
  if (dragon1.y <= 80) {
    vy1 = 2;
  }
  if (dragon1.y >= 400) {
    vy1 = -2;
  }

  if (dragon2.y <= 80) {
    vy2 = 2;
  }
  if (dragon2.y >= 400) {
    vy2 = -2;
  }
}

function playerControls() {
  if (keyDown("up")) {
    player.y -= 3;
  }

  if (keyDown("down")) {
    player.y += 3;
  }

  if (keyDown("left") && gameState == "play") {
    player.x -= 3;
    if (allWalls[3].x > -1300) {
      for (var m in allWalls) {
        allWalls[m].x += 3;
      }
      for (var n in allChests) {
        allChests[n].x += 3;
      }
      dragon1.x += 3;
      dragon2.x += 3;
    }
  }

  if (keyDown("right") && gameState != "win") {
    player.x += 10;

    if (gameState == "start") {
      gameState = "play";
    }

    if (allWalls[0].x > -1300) {
      for (var i in allWalls) {
        allWalls[i].x -= 3;
      }
      for (var m in allChests) {
        allChests[m].x -= 3;
      }
      dragon1.x -= 3;
      dragon2.x -= 3;
    }
  }
}

function showMensages() {
  textSize(23);
  fill("red");
  image(chestImg, 80, 70, 20, 30);
  text(score, 105, 93);
  if (gameState == "start") {
    text("Pressione seta para direita para começar", width / 3.5, height / 2);
  }
  if (gameState == "win") {
    text("Parabens você ganhou!", width / 3.5, height / 2);
  }
  if (gameState == "end") {
    text("Voce perdeu!", width / 3.5, height / 2);
  }
}

function draw() {
  for (var i in allWalls) {
    player.collide(allWalls[i]);
  }

  for (var j in allChests) {
    if (player.collide(allChests[j])) {
      allChests[j].visible = false;
      allChests[j].destroy();
      score += 1;
    }
  }
  if (dragon1.collide(player) || dragon2.collide(player)) {
    gameState = "end";
    dragon1.velocityY = 0;
    dragon2.velocityY = 0;
  }
  if (player.x > 1000) {
    gameState = "win";
  }
  if (gameState != "end") {
    playerControls();
  }

  background(bgImg);
  moveDragon();
  drawSprites();
  showMensages();
}
