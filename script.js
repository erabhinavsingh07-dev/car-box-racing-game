const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

// Player car
let player = document.createElement("div");
player.classList.add("car");
gameArea.appendChild(player);

let keys = { ArrowLeft: false, ArrowRight: false };
let score = 0;
let speed = 5;
let gameRunning = true;

// Controls
document.addEventListener("keydown", e => {
  keys[e.key] = true;

  if (e.key === "r" || e.key === "R") location.reload();
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

// Create enemy cars
function createEnemy() {
  let enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = Math.floor(Math.random() * 250) + "px";
  gameArea.appendChild(enemy);
}

setInterval(createEnemy, 1500);

// Collision detection
function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

// Game loop
function gameLoop() {
  if (!gameRunning) return;

  let playerLeft = player.offsetLeft;

  if (keys.ArrowLeft && playerLeft > 0) {
    player.style.left = playerLeft - 5 + "px";
  }

  if (keys.ArrowRight && playerLeft < 250) {
    player.style.left = playerLeft + 5 + "px";
  }

  let enemies = document.querySelectorAll(".enemy");

  enemies.forEach(enemy => {
    let top = enemy.offsetTop;
    enemy.style.top = top + speed + "px";

    if (isCollide(player, enemy)) {
      gameRunning = false;
      document.getElementById("gameOver").style.display = "block";
    }

    if (top > 600) {
      enemy.remove();
      score++;
      scoreDisplay.innerText = "Score: " + score;
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();