const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth / 2;

// ---------------------------- MAP --------------------------------

const mapWidth = 20; // map rows
const mapHeight = 20; // map cols
let mapCubeSize = (canvas.height / 2) / mapWidth; // map cube width
let gapSize = canvas.width / 500;

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

function drawMap2D() {
  ctx.fillStyle = '#000000';
  //ctx.fillRect(0, 0, mapCubeSize * mapWidth, mapCubeSize * mapWidth) ;
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {

      // Determine colour if Wall and the X/Y Position
      ctx.fillStyle = mapLayout[y * mapWidth + x] === 1 ? '#ffffff' : '#1a1a1a';
      const offsetX = x * mapCubeSize;
      const offsetY = y * mapCubeSize;
      ctx.fillRect(offsetX+(gapSize/2), offsetY+(gapSize/2), mapCubeSize-gapSize, mapCubeSize-gapSize);
    }
  }
}

canvas.addEventListener('click', function(event) {
  // Calculate the grid position based on mouse coordinates
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const gridX = Math.floor(mouseX / mapCubeSize);
  const gridY = Math.floor(mouseY / mapCubeSize);

  // Get the player's grid position
  const playerGridX = Math.floor(playerX / mapCubeSize);
  const playerGridY = Math.floor(playerY / mapCubeSize);

  // Check if the click is not on the player's cell
  if (gridX !== playerGridX || gridY !== playerGridY) {

      // Toggle the value of the clicked wall
      if (gridX >= 0 && gridX < mapWidth && gridY >= 0 && gridY < mapHeight) {
          const index = gridY * mapWidth + gridX;
          mapLayout[index] = (mapLayout[index] === 1) ? 0 : 1;
      }
  }
});
// ---------------------------- --------- --------------------------------

// ---------------------------- PLAYER --------------------------------

let playerX = (canvas.height / 2) * (16 / mapWidth), playerY = (canvas.height / 2) * (4 / mapWidth);
let playerDX, playerDY, playerAngle = 225;

function drawPlayer2D() {
  // Draw the direction pointer
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.lineTo(playerX + playerDX * 15, playerY + playerDY * 15);
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(playerX, playerY, mapCubeSize/8, 0, Math.PI * 2);
  ctx.fill();
}

function degreesToRadians(angle) {
  return angle * Math.PI / 180.0;
}
// helper methods for conversion and angle consistency
function fixAngle(angle) {
  return angle > 359 ? angle -= 360 : angle < 0 ? angle += 360 : angle;
}

const keysPressed = {};
function keyDownHandler(event) {
  keysPressed[event.key] = true;
}
function keyUpHandler(event) {
  keysPressed[event.key] = false;
}

function turnPlayer(playerAngle){
  playerAngle = fixAngle(playerAngle);
  playerDX = Math.cos(degreesToRadians(playerAngle));
  playerDY = -Math.sin(degreesToRadians(playerAngle));
}

function movement() {
  // Use keysPressed to handle multiple key presses
  if (keysPressed['a'] || keysPressed['ArrowLeft']) {
      playerAngle += 0.75;
      turnPlayer(playerAngle);
  }
  if (keysPressed['d'] || keysPressed['ArrowRight']) {
      playerAngle -= 0.75;
      turnPlayer(playerAngle);
  }
  // MoveFactor to determine speed for forwards/backwards
  const moveFactor = canvas.width / 500;
  if (keysPressed['w'] || keysPressed['ArrowUp']) {
      playerX += playerDX * moveFactor;
      playerY += playerDY * moveFactor;
  }
  if (keysPressed['s'] || keysPressed['ArrowDown']) {
      playerX -= playerDX * moveFactor;
      playerY -= playerDY * moveFactor;
  }
}

// ---------------------------- --------- --------------------------------

// ---------------------------- RAYCASTER --------------------------------
let rays = [];
function castRays() {
  rays = [];
  for (let count = 0, rayAngle = playerAngle + 30; rayAngle >= playerAngle - 30; rayAngle -= 0.25, count ++) {
    // Cast a ray and find the intersection with the walls
    let rayX = playerX, rayY = playerY;

    // Calculate the step increments for X and Y via rayAngle
    let rayAngleRadians = degreesToRadians(rayAngle);
    let raySin = -Math.sin(rayAngleRadians);
    let rayCos = Math.cos(rayAngleRadians);

    let distanceToWall = 0, preX = 0, preY = 0;
    let hitWall = false, hitVertical = false;

    while (!hitWall && distanceToWall < 1000) {
      distanceToWall += 1;
      let testX = Math.floor(rayX / mapCubeSize), testY = Math.floor(rayY / mapCubeSize);

      if (testX < 0 || testX >= mapWidth || testY < 0 || testY >= mapHeight) {
        hitWall = true;
        distanceToWall = 1000;

      } else if (mapLayout[testY * mapWidth + testX] == 1) {  
        // if vector entry is wall
        hitWall = true;

        // vertical wall check, previous coming from left or right of hit wall
        if((testX == preX + 1 && testY == preY) || (testX == preX - 1 && testY == preY)) {
          hitVertical = true;
        }
        // vertical wall check, wall infront or behind, diagonal edge cases
        if((mapLayout[(testY+1) * mapWidth + testX] == 1|| mapLayout[(testY - 1) * mapWidth + testX] == 1) &&
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

    let gridWidth = mapWidth * mapCubeSize;
    let rayWidth = ((gridWidth * 4) / 240);

    // Remove fisheye effect by adjusting the distance based on the ray's angle
    let correctedDistance = distanceToWall * Math.cos(degreesToRadians(fixAngle(playerAngle - rayAngle)));
    ctx.fillStyle = hitVertical ? 'rgba(150, 150, 150, 1)' : 'rgba(200, 200, 200, 1)';

    let stripHeight = ((gridWidth * 2) * ((gridWidth * 2) / 18)) / correctedDistance;

    // Draw the walls with corrected height based on the distance
    ctx.fillRect(0 + (count * rayWidth) - rayWidth, (gridWidth) - (stripHeight / 2), 
    rayWidth + 1, stripHeight);

    // Drawing the blue sky
    ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    ctx.fillRect(0 + (count * rayWidth) - rayWidth, 0, rayWidth + 1, (gridWidth) - stripHeight / 2);

    // Drawing the Ground
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0 + (count * rayWidth) - rayWidth, (gridWidth) + (stripHeight / 2), 
    rayWidth + 1, (gridWidth) - stripHeight / 2);

    let ray = [];
    ray.push(playerX);
    ray.push(playerY);
    ray.push(rayX);
    ray.push(rayY);
  }
}

function drawRays(){
  for (let i = 0; i < rays.length; i++){
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.moveTo(rays[i][0], rays[i][1]);
    ctx.lineTo(rays[i][2], rays[i][3]);
    ctx.stroke();
  }
}

// ---------------------------- --------- --------------------------------

function resizeCanvas() {
  let curPlayerX = (playerX / (canvas.height / 2)) * mapWidth, curPlayerY = (playerY / (canvas.height / 2)) * mapWidth;
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth / 2;

  // Update mapCubeSize and gapSize based on new canvas dimensions
  mapCubeSize = (canvas.height / 2) / mapWidth;
  gapSize = canvas.width / 400;
  playerX = (canvas.height / 2) * (curPlayerX / mapWidth), playerY = (canvas.height / 2) * (curPlayerY / mapWidth);
}

window.addEventListener('resize', resizeCanvas);


function draw() {
  // Fill the canvas with black color
  ctx.fillStyle = '#000000'; // black color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the map, player, and cast rays
  movement();
  drawPlayer2D();
  castRays();
  drawMap2D();
  text("Hello, world!", 50, 50);
  drawRays();
}

playerDX = Math.cos(degreesToRadians(playerAngle));
playerDY = -Math.sin(degreesToRadians(playerAngle));

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

setInterval(draw, 1000 / 60); // 60 frames per second
