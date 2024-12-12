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
const GAME_SPEED = 13;
const FRAME_TIME = 1000 / 60;

const FRUITS = [
  {
    name: "Apple",
    color: "#e63946",
    points: 10,
    leafColor: "#2a9d8f",
  },
  {
    name: "Golden Apple",
    color: "#ffd700",
    points: 50,
    leafColor: "#ff9f1c",
  },
];

let lastRenderTime = 0;
let gameOver = false;
let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
let food;
let goldenApple = null;
let goldenAppleTimer = null;

highScoreElement.textContent = highScore;

function getRandomPosition() {
  let newPosition;
  let validPosition = false;

  while (!validPosition) {
    newPosition = {
      x: Math.floor(Math.random() * TILE_COUNT),
      y: Math.floor(Math.random() * TILE_COUNT),
    };

    validPosition = true;
    // Check collision with snake
    for (let segment of snake) {
      if (segment.x === newPosition.x && segment.y === newPosition.y) {
        validPosition = false;
        break;
      }
    }
    // Check collision with other food
    if (food && newPosition.x === food.x && newPosition.y === food.y) {
      validPosition = false;
    }
    if (
      goldenApple &&
      newPosition.x === goldenApple.x &&
      newPosition.y === goldenApple.y
    ) {
      validPosition = false;
    }
  }

  return newPosition;
}

function trySpawnGoldenApple() {
  if (!goldenApple && Math.random() < 0.15) {
    // 15% chance
    const position = getRandomPosition();
    goldenApple = {
      ...position,
      type: FRUITS[1],
    };

    // Remove golden apple after 5 seconds
    goldenAppleTimer = setTimeout(() => {
      goldenApple = null;
    }, 5000);
  }
}

function getRandomFoodPosition() {
  const position = getRandomPosition();
  return {
    ...position,
    type: FRUITS[0], // Always regular apple
  };
}

// Initialize food
food = getRandomFoodPosition();

playAgainButton.addEventListener("click", startNewGame);
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
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

  if (gameOver && e.key === "Enter") {
    startNewGame();
    return;
  }

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

function gameLoop(currentTime) {
  if (gameOver) return;

  window.requestAnimationFrame(gameLoop);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / GAME_SPEED) {
    render();
    return;
  }

  lastRenderTime = currentTime;

  update();
  render();
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  let ate = false;

  // Check regular apple collision
  if (head.x === food.x && head.y === food.y) {
    score += food.type.points;
    currentScoreElement.textContent = score;
    food = getRandomFoodPosition();
    trySpawnGoldenApple(); // Try to spawn golden apple when regular apple is eaten
    ate = true;
  }

  // Check golden apple collision
  if (goldenApple && head.x === goldenApple.x && head.y === goldenApple.y) {
    score += goldenApple.type.points;
    currentScoreElement.textContent = score;
    clearTimeout(goldenAppleTimer);
    goldenApple = null;
    ate = true;
  }

  if (!ate) {
    snake.pop();
  }

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("snakeHighScore", highScore);
    highScoreElement.textContent = highScore;
  }

  // Check wall collision
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

  // Check self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      showGameOver();
      return;
    }
  }
}

function render() {
  ctx.fillStyle = "#222831";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#4ecca3" : "#3eb892";
    ctx.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    );
  });

  // Draw regular food
  drawFruit(food);

  // Draw golden apple if it exists
  if (goldenApple) {
    drawFruit(goldenApple);
  }
}

function drawFruit(fruit) {
  const fruitX = fruit.x * GRID_SIZE;
  const fruitY = fruit.y * GRID_SIZE;

  ctx.fillStyle = fruit.type.color;
  ctx.beginPath();
  ctx.arc(
    fruitX + GRID_SIZE / 2,
    fruitY + GRID_SIZE / 2,
    GRID_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = fruit.type.leafColor;
  ctx.beginPath();
  ctx.ellipse(
    fruitX + GRID_SIZE / 2,
    fruitY,
    4,
    8,
    Math.PI / 4,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function showGameOver() {
  finalScoreElement.textContent = score;
  finalHighScoreElement.textContent = highScore;
  modal.style.display = "block";
}

function startNewGame() {
  modal.style.display = "none";
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  currentScoreElement.textContent = score;
  food = getRandomFoodPosition();
  if (goldenAppleTimer) {
    clearTimeout(goldenAppleTimer);
  }
  goldenApple = null;
  gameOver = false;
  lastRenderTime = 0;
  requestAnimationFrame(gameLoop);
}

// Start the game
requestAnimationFrame(gameLoop);
