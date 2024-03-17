// ---------------------------- SETUP --------------------------------

function setup() {
  createCanvas(windowWidth, windowWidth / 2);
  frameRate(60);
  mapWidth = height / 2;
  gap = height / 500;
  cubeSize = mapWidth / rows;
  playerX = (16 / cols) * mapWidth;
  playerY = (4 / rows) * mapWidth;
  noStroke();
}

function windowResized() {
  setup()
}
// ---------------------------- MAP --------------------------------

let rows = 20;
let cols = 20;
let map = false;
let mapWidth, gap, cubeSize;

const mapLayout = [ // the map array. Edit to change level but keep the outer walls
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

function drawMap(){
  fill('#000000');
  rect(0, mapWidth - gap, mapWidth + gap, mapWidth + gap)
  for (let row = 0; row < rows; row++){
    for (let col = 0; col < cols; col++){
      fill(mapLayout[row * rows + col] === 1 ? '#ffffff' : '#1a1a1a');
      yOffset = row * cubeSize;
      xOffset = col * cubeSize;
      rect(xOffset + gap, yOffset + mapWidth, cubeSize - gap, cubeSize - gap);
    }
  }
}

function mousePressed() {
  // Calculate the index in the mapLayout array
  if (mouseX >= 0 && mouseX < mapWidth && mouseY >= mapWidth && mouseY < height) {
    map = true;
    let col = floor((mouseX - gap) / cubeSize);
    let row = floor((mouseY - mapWidth) / cubeSize);
    let index = row * cols + col;
    mapLayout[index] = mapLayout[index] == 0 ? 1 : 0;
  }else{
    map = false;
  }
}

// ---------------------------- PLAYER --------------------------------

let playerX, playerY, playerDX, playerDY, playerAngle = 225;
let wDown, sDown, aDown, dDown;

function drawPlayer() {
  // Draw the direction pointer
  fill(0);
  circle(playerX, playerY + mapWidth, cubeSize); 
  stroke(255, 0, 0); // Set stroke color to red
  line(playerX, playerY + mapWidth, playerX + (playerDX * 30), playerY + (playerDY * 30) + mapWidth);
  noStroke();
}

function degreesToRadians(angle) {
  return angle * Math.PI / 180.0;
}

function fixAngle(angle) {
  return angle > 359 ? angle -= 360 : angle < 0 ? angle += 360 : angle;
}

function turnPlayer(playerAngle){
  playerAngle = fixAngle(playerAngle);
  playerDX = Math.cos(degreesToRadians(playerAngle));
  playerDY = -Math.sin(degreesToRadians(playerAngle));
}

function move(){
  let moveFactor = width / 900;
  playerX += wDown ? playerDX * moveFactor: 0;
  playerY += wDown ? playerDY * moveFactor: 0;
  playerX -= sDown ? playerDX * moveFactor: 0;
  playerY -= sDown ? playerDY * moveFactor: 0;
  playerX += aDown ? Math.cos(degreesToRadians(fixAngle(playerAngle + 90))) * moveFactor / 2: 0;
  playerY += aDown ? -Math.sin(degreesToRadians(fixAngle(playerAngle + 90))) * moveFactor / 2: 0;
  playerX += dDown ? Math.cos(degreesToRadians(fixAngle(playerAngle - 90))) * moveFactor / 2: 0;
  playerY += dDown ? -Math.sin(degreesToRadians(fixAngle(playerAngle - 90))) * moveFactor / 2: 0;
}
function keyPressed() {
  if (key === 'W' || key === 'w' || keyCode === UP_ARROW) {
    wDown = true;
  } else if (key === 'S' || key === 's' || keyCode === DOWN_ARROW) {
    sDown = true;
  } else if (key === 'A' || key === 'a' || keyCode === LEFT_ARROW) {
    aDown = true;
  } else if (key === 'D' || key === 'd' || keyCode === UP_ARROW) {
    dDown = true;
  }
}
function keyReleased() {
  if (key === 'W' || key === 'w' || keyCode === UP_ARROW) {
    wDown = false;
  } else if (key === 'S' || key === 's' || keyCode === DOWN_ARROW) {
    sDown = false;
  } else if (key === 'A' || key === 'a' || keyCode === LEFT_ARROW) {
    aDown = false;
  } else if (key === 'D' || key === 'd' || keyCode === RIGHT_ARROW) {
    dDown = false;
  }
}

// ---------------------------- RAYCASTER --------------------------------
let rays;
function castRays(){
  rays = [];
  let resolution = 240;
  for (let count = 0, rayAngle = playerAngle + 30; rayAngle >= playerAngle - 30; 
    rayAngle -= (60 / resolution), count ++) {
    let rayX = playerX, rayY = playerY;

    // Calculate the step increments for X and Y via rayAngle
    let rayAngleRadians = degreesToRadians(rayAngle);
    let raySin = -Math.sin(rayAngleRadians);
    let rayCos = Math.cos(rayAngleRadians);

    let distanceToWall = 0, preX = 0, preY = 0;
    let hitWall = false, hitVertical = false;

    while (!hitWall && distanceToWall < 1000) {
      distanceToWall += 1;
      let testX = Math.floor(rayX / cubeSize), testY = Math.floor(rayY / cubeSize);

      if (testX < 0 || testX >= cols || testY < 0 || testY >= rows) {
        hitWall = true;
        distanceToWall = 1000;

      } else if (mapLayout[testY * cols + testX] == 1) {  
        // if vector entry is wall
        hitWall = true;

        // vertical wall check, previous coming from left or right of hit wall
        if((testX == preX + 1 && testY == preY) || (testX == preX - 1 && testY == preY)) {
          hitVertical = true;
        }
        // vertical wall check, wall infront or behind, diagonal edge cases
        if((mapLayout[(testY+1) * cols + testX] == 1|| mapLayout[(testY - 1) * cols + testX] == 1) &&
        ((testX == preX + 1 && testY == preY + 1) ||
        (testX == preX - 1 && testY == preY - 1) ||
        (testX == preX - 1 && testY == preY + 1) ||
        (testX == preX + 1 && testY == preY - 1))){
            hitVertical = true;
        }
      } else {
        // record current wall for next extension of our ray
        preX = testX;
        preY = testY;
        rayX += rayCos;
        rayY += raySin;
      }
    }
    let gridWidth = rows * cubeSize;
    let rayWidth = width / resolution;

    // Remove fisheye effect by adjusting the distance based on the ray's angle
    let correctedDistance = distanceToWall * Math.cos(degreesToRadians(fixAngle(playerAngle - rayAngle)));
    let stripHeight = ((gridWidth * 2) * ((gridWidth * 2) / 18)) / correctedDistance;

    fill(hitVertical ? 'rgba(150, 150, 150, 1)' : 'rgba(200, 200, 200, 1)');
    rect(0 + (count * rayWidth) - rayWidth, (gridWidth) - (stripHeight / 2), rayWidth + 1, stripHeight);
    fill('rgba(0, 150, 255, 1)');
    rect(0 + (count * rayWidth) - rayWidth, 0, rayWidth + 1, (gridWidth) - stripHeight / 2);

    let ray = [];
    ray.push(playerX);
    ray.push(playerY + mapWidth);
    ray.push(rayX);
    ray.push(rayY + mapWidth);
    rays.push(ray);
  }
}

function drawRays(){
  for (let i = 0; i < rays.length; i++){
    stroke(0, 255, 255, 50);
    line(rays[i][0], rays[i][1], rays[i][2], rays[i][3]);
    noStroke();
  }
}

function draw() {
  background(255);
  move();
  castRays();
  drawMap();
  drawPlayer();
  //drawRays();
  playerAngle -= mouseIsPressed && !map? ((mouseX - width / 2) / width) * 2 : 0;
  document.body.style.cursor = mouseIsPressed && !map? 'none' : 'auto';
  turnPlayer(playerAngle);
}
