const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const currentScoreElement = document.getElementById("currentScore");
const highScoreElement = document.getElementById("highScore");
const modal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const finalHighScoreElement = document.getElementById("finalHighScore");
const playAgainButton = document.getElementById("playAgainButton");

const gridSize = 20;
const tileCount = 20;

let snake = [{ x: 10, y: 10 }];
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let lastRenderTime = 0;
const GAME_SPEED = 10; // Frames per second
let gameOver = false;

// Update the high score display initially
highScoreElement.textContent = highScore;

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  switch (e.key) {
    case "ArrowUp":
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
  }
}

const snakeHeadImg = new Image();
snakeHeadImg.src = "snake-head.png"; // We'll create this image

function drawSnake() {
  // Draw body segments
  for (let i = snake.length - 1; i > 0; i--) {
    ctx.fillStyle = "#2a9d8f";
    ctx.beginPath();
    ctx.roundRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize - 2,
      gridSize - 2,
      8
    );
    ctx.fill();

    // Add connection between segments
    if (i < snake.length - 1) {
      const current = snake[i];
      const next = snake[i + 1];
      ctx.beginPath();
      ctx.fillStyle = "#2a9d8f";
      const midX = ((current.x + next.x) * gridSize) / 2;
      const midY = ((current.y + next.y) * gridSize) / 2;
      ctx.roundRect(midX, midY, gridSize - 2, gridSize - 2, 8);
      ctx.fill();
    }
  }

  // Draw head
  const head = snake[0];
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.translate(
    head.x * gridSize + gridSize / 2,
    head.y * gridSize + gridSize / 2
  );
  ctx.rotate(angle);

  // Draw head circle
  ctx.fillStyle = "#238677";
  ctx.beginPath();
  ctx.arc(0, 0, gridSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Draw eyes
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(-4, -4, 3, 0, Math.PI * 2);
  ctx.arc(-4, 4, 3, 0, Math.PI * 2);
  ctx.fill();

  // Draw pupils
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(-5, -4, 1.5, 0, Math.PI * 2);
  ctx.arc(-5, 4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function gameLoop(currentTime) {
  if (gameOver) return;

  window.requestAnimationFrame(gameLoop);

  // Calculate delta time and decide if we should update
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / GAME_SPEED) return;

  lastRenderTime = currentTime;

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
    score += 10;
    currentScoreElement.textContent = score;

    // Update high score if current score is higher
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
      highScoreElement.textContent = highScore;
    }
  } else {
    snake.pop();
  }

  // Clear canvas
  ctx.fillStyle = "#222831";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake using our new function
  drawSnake();

  // Draw food with a more apple-like appearance
  const foodX = food.x * gridSize;
  const foodY = food.y * gridSize;

  ctx.fillStyle = "#e63946";
  ctx.beginPath();
  ctx.arc(
    foodX + gridSize / 2,
    foodY + gridSize / 2,
    gridSize / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Add a leaf to the food
  ctx.fillStyle = "#2a9d8f";
  ctx.beginPath();
  ctx.ellipse(foodX + gridSize / 2, foodY, 4, 8, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Game over conditions
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver = true;
    showGameOver();
    return;
  }

  // Check if snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      showGameOver();
      return;
    }
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  currentScoreElement.textContent = score;
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
  gameOver = false;
  lastRenderTime = 0;
  requestAnimationFrame(gameLoop);
}

function showGameOver() {
  finalScoreElement.textContent = score;
  finalHighScoreElement.textContent = highScore;
  modal.style.display = "block";
}

playAgainButton.addEventListener("click", () => {
  modal.style.display = "none";
  resetGame();
});

requestAnimationFrame(gameLoop);
