"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const currentScoreElement = document.getElementById("currentScore");
const highScoreElement = document.getElementById("highScore");
const modal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const finalHighScoreElement = document.getElementById("finalHighScore");
const playAgainButton = document.getElementById("playAgainButton");

if (
  !canvas ||
  !currentScoreElement ||
  !highScoreElement ||
  !modal ||
  !finalScoreElement ||
  !finalHighScoreElement ||
  !playAgainButton
) {
  console.error("Required DOM elements not found");
}

const GRID_SIZE = 20;
const TILE_COUNT = 20;
const GAME_SPEED = 10; // Frames per second

let snake = [{ x: 10, y: 10 }];
let food = getRandomFoodPosition();
let dx = 0;
let dy = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
let lastRenderTime = 0;
let gameOver = false;

// Update the high score display initially
highScoreElement.textContent = highScore;

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  // Prevent default behavior for game controls
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Space",
      "Enter",
    ].includes(e.key)
  ) {
    e.preventDefault();
  }

  // If game is over and Enter is pressed, start new game
  if (gameOver && e.key === "Enter") {
    startNewGame();
    return;
  }

  // Regular game controls
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
      snake[i].x * GRID_SIZE,
      snake[i].y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2,
      8
    );
    ctx.fill();

    // Add connection between segments
    if (i < snake.length - 1) {
      const current = snake[i];
      const next = snake[i + 1];
      ctx.beginPath();
      ctx.fillStyle = "#2a9d8f";
      const midX = ((current.x + next.x) * GRID_SIZE) / 2;
      const midY = ((current.y + next.y) * GRID_SIZE) / 2;
      ctx.roundRect(midX, midY, GRID_SIZE - 2, GRID_SIZE - 2, 8);
      ctx.fill();
    }
  }

  // Draw head
  const head = snake[0];
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.translate(
    head.x * GRID_SIZE + GRID_SIZE / 2,
    head.y * GRID_SIZE + GRID_SIZE / 2
  );
  ctx.rotate(angle);

  // Draw head circle
  ctx.fillStyle = "#238677";
  ctx.beginPath();
  ctx.arc(0, 0, GRID_SIZE / 2, 0, Math.PI * 2);
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
    food = getRandomFoodPosition();
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
  const foodX = food.x * GRID_SIZE;
  const foodY = food.y * GRID_SIZE;

  ctx.fillStyle = "#e63946";
  ctx.beginPath();
  ctx.arc(
    foodX + GRID_SIZE / 2,
    foodY + GRID_SIZE / 2,
    GRID_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Add a leaf to the food
  ctx.fillStyle = "#2a9d8f";
  ctx.beginPath();
  ctx.ellipse(foodX + GRID_SIZE / 2, foodY, 4, 8, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Game over conditions
  if (
    head.x < 0 ||
    head.x >= TILE_COUNT ||
    head.y < 0 ||
    head.y >= TILE_COUNT
  ) {
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
  food = getRandomFoodPosition();
  gameOver = false;
  lastRenderTime = 0;
  requestAnimationFrame(gameLoop);
}

function showGameOver() {
  finalScoreElement.textContent = score;
  finalHighScoreElement.textContent = highScore;
  modal.style.display = "block";
}

playAgainButton.addEventListener("click", startNewGame);

document.addEventListener("keydown", handleKeyPress);

function startNewGame() {
  modal.style.display = "none";
  resetGame();
}

function getRandomFoodPosition() {
  return {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT),
  };
}

function init() {
  highScoreElement.textContent = highScore;
  window.requestAnimationFrame(gameLoop);
}

// Start the game
init();
