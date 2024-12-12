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

  if (snake.length > 0) {
    // Create path for the entire snake body
    ctx.beginPath();

    // Get the first point
    const start = {
      x: snake[0].x * GRID_SIZE + GRID_SIZE / 2,
      y: snake[0].y * GRID_SIZE + GRID_SIZE / 2,
    };

    // Start the path at the head
    ctx.moveTo(start.x, start.y);

    // Create smooth curve through all points
    for (let i = 0; i < snake.length - 1; i++) {
      const current = {
        x: snake[i].x * GRID_SIZE + GRID_SIZE / 2,
        y: snake[i].y * GRID_SIZE + GRID_SIZE / 2,
      };
      const next = {
        x: snake[i + 1].x * GRID_SIZE + GRID_SIZE / 2,
        y: snake[i + 1].y * GRID_SIZE + GRID_SIZE / 2,
      };

      // Calculate control points for smooth curve
      const xc = (current.x + next.x) / 2;
      const yc = (current.y + next.y) / 2;

      // Draw curve to midpoint using the previous midpoint
      ctx.quadraticCurveTo(current.x, current.y, xc, yc);
    }

    // Enhanced shadow for depth
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // More subtle gradient for the snake body
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#3eb892"); // Base color
    gradient.addColorStop(0.3, "#45c09c"); // Slightly lighter
    gradient.addColorStop(0.6, "#3eb892"); // Back to base
    gradient.addColorStop(0.9, "#39a885"); // Slightly darker

    ctx.strokeStyle = gradient;
    ctx.lineWidth = GRID_SIZE - 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw snake head with matching gradient
    const head = snake[0];
    const headX = head.x * GRID_SIZE + GRID_SIZE / 2;
    const headY = head.y * GRID_SIZE + GRID_SIZE / 2;
    const radius = (GRID_SIZE - 2) / 2;

    const headGradient = ctx.createRadialGradient(
      headX - radius / 2,
      headY - radius / 2,
      radius / 4,
      headX,
      headY,
      radius
    );
    headGradient.addColorStop(0, "#45c09c"); // Slightly lighter
    headGradient.addColorStop(0.7, "#3eb892"); // Base color
    headGradient.addColorStop(1, "#39a885"); // Slightly darker

    ctx.beginPath();
    ctx.fillStyle = headGradient;
    ctx.arc(headX, headY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Calculate eye positions based on direction
    const eyeOffset = radius * 0.5;
    let leftEyeX = headX - eyeOffset;
    let rightEyeX = headX + eyeOffset;
    let eyeY = headY;
    let tongueStartX = headX;
    let tongueStartY = headY;
    let tongueEndX = headX;
    let tongueEndY = headY;

    // Adjust positions based on direction
    if (dx === 1) {
      eyeY = headY - radius * 0.3;
      tongueStartX = headX + radius * 0.8;
      tongueEndX = headX + radius + 8;
    } else if (dx === -1) {
      eyeY = headY - radius * 0.3;
      tongueStartX = headX - radius * 0.8;
      tongueEndX = headX - radius - 8;
    } else if (dy === -1) {
      leftEyeX = headX - radius * 0.3;
      rightEyeX = headX + radius * 0.3;
      eyeY = headY - eyeOffset;
      tongueStartY = headY - radius * 0.8;
      tongueEndY = headY - radius - 8;
    } else if (dy === 1) {
      leftEyeX = headX - radius * 0.3;
      rightEyeX = headX + radius * 0.3;
      eyeY = headY + eyeOffset;
      tongueStartY = headY + radius * 0.8;
      tongueEndY = headY + radius + 8;
    }

    // Draw eyes
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, 2.5, 0, Math.PI * 2);
    ctx.arc(rightEyeX, eyeY, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Add eye highlights
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(leftEyeX - 0.5, eyeY - 0.5, 1, 0, Math.PI * 2);
    ctx.arc(rightEyeX - 0.5, eyeY - 0.5, 1, 0, Math.PI * 2);
    ctx.fill();

    // Draw tongue
    if (dx !== 0 || dy !== 0) {
      ctx.strokeStyle = "#ff1744";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(tongueStartX, tongueStartY);
      ctx.lineTo(tongueEndX, tongueEndY);

      const forkLength = 4;
      if (dx === 1) {
        ctx.quadraticCurveTo(
          tongueEndX + 2,
          tongueEndY,
          tongueEndX + 2,
          tongueEndY - 3
        );
        ctx.moveTo(tongueEndX, tongueEndY);
        ctx.quadraticCurveTo(
          tongueEndX + 2,
          tongueEndY,
          tongueEndX + 2,
          tongueEndY + 3
        );
      } else if (dx === -1) {
        ctx.quadraticCurveTo(
          tongueEndX - 2,
          tongueEndY,
          tongueEndX - 2,
          tongueEndY - 3
        );
        ctx.moveTo(tongueEndX, tongueEndY);
        ctx.quadraticCurveTo(
          tongueEndX - 2,
          tongueEndY,
          tongueEndX - 2,
          tongueEndY + 3
        );
      } else if (dy === -1) {
        ctx.quadraticCurveTo(
          tongueEndX,
          tongueEndY - 2,
          tongueEndX - 3,
          tongueEndY - 2
        );
        ctx.moveTo(tongueEndX, tongueEndY);
        ctx.quadraticCurveTo(
          tongueEndX,
          tongueEndY - 2,
          tongueEndX + 3,
          tongueEndY - 2
        );
      } else if (dy === 1) {
        ctx.quadraticCurveTo(
          tongueEndX,
          tongueEndY + 2,
          tongueEndX - 3,
          tongueEndY + 2
        );
        ctx.moveTo(tongueEndX, tongueEndY);
        ctx.quadraticCurveTo(
          tongueEndX,
          tongueEndY + 2,
          tongueEndX + 3,
          tongueEndY + 2
        );
      }
      ctx.stroke();
    }
  }

  // Draw food
  drawFruit(food);
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
