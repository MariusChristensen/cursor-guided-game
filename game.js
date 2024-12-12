"use strict";

import { GAME_CONFIG } from "./config.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.currentScoreElement = document.getElementById("currentScore");
    this.highScoreElement = document.getElementById("highScore");
    this.modal = document.getElementById("gameOverModal");
    this.finalScoreElement = document.getElementById("finalScore");
    this.finalHighScoreElement = document.getElementById("finalHighScore");
    this.playAgainButton = document.getElementById("playAgainButton");

    this.validateElements();
    this.initializeGame();
    this.setupEventListeners();
    this.initializePointsGuide();
  }

  validateElements() {
    if (
      !this.canvas ||
      !this.currentScoreElement ||
      !this.highScoreElement ||
      !this.modal ||
      !this.finalScoreElement ||
      !this.finalHighScoreElement ||
      !this.playAgainButton
    ) {
      throw new Error("Required DOM elements not found");
    }
  }

  initializeGame() {
    this.lastRenderTime = 0;
    this.gameOver = false;
    this.snake = [{ x: 10, y: 10 }];
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("snakeHighScore")) || 0;
    this.highScoreElement.textContent = this.highScore;
    this.food = this.getRandomFoodPosition();
    this.goldenApple = null;
    this.goldenAppleTimer = null;
    this.lastDirectionChange = 0;
    this.directionChangeThreshold = 50; // ms between direction changes

    // Initialize high scores
    this.highScores = this.loadHighScores();
    this.updateHighScoresList();
  }

  setupEventListeners() {
    this.boundHandleKeyPress = this.handleKeyPress.bind(this);
    this.boundStartNewGame = this.startNewGame.bind(this);
    this.boundGameLoop = this.gameLoop.bind(this);

    document.addEventListener("keydown", this.boundHandleKeyPress);
    this.playAgainButton.addEventListener("click", this.boundStartNewGame);
    document.getElementById("clearScoresButton").addEventListener("click", () => {
      this.clearHighScores();
    });
  }

  cleanup() {
    if (this.goldenAppleTimer) {
      clearTimeout(this.goldenAppleTimer);
      this.goldenAppleTimer = null;
    }
    document.removeEventListener("keydown", this.boundHandleKeyPress);
    this.playAgainButton.removeEventListener("click", this.boundStartNewGame);
  }

  handleKeyPress(event) {
    if (this.gameOver) {
      if (event.key === "Enter") {
        // If there's a visible name input and it's a top score, save the score
        const nameInputContainer = document.getElementById("nameInputContainer");
        if (nameInputContainer.style.display === "block") {
          this.saveHighScore(this.score);
        }
        this.startNewGame();
      }
      return;
    }

    const currentTime = Date.now();
    if (currentTime - this.lastDirectionChange < this.directionChangeThreshold) {
      return; // Ignore rapid keypresses
    }

    const head = this.snake[0];
    let nextX = head.x;
    let nextY = head.y;

    switch (event.key) {
      case "ArrowUp":
        if (this.dy === 0) {
          // Only if not moving vertically
          nextY = head.y - 1;
          // Check if this would hit the neck
          if (this.snake.length <= 1 || nextY !== this.snake[1].y || nextX !== this.snake[1].x) {
            this.dx = 0;
            this.dy = -1;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
      case "ArrowDown":
        if (this.dy === 0) {
          nextY = head.y + 1;
          if (this.snake.length <= 1 || nextY !== this.snake[1].y || nextX !== this.snake[1].x) {
            this.dx = 0;
            this.dy = 1;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
      case "ArrowLeft":
        if (this.dx === 0) {
          nextX = head.x - 1;
          if (this.snake.length <= 1 || nextY !== this.snake[1].y || nextX !== this.snake[1].x) {
            this.dx = -1;
            this.dy = 0;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
      case "ArrowRight":
        if (this.dx === 0) {
          nextX = head.x + 1;
          if (this.snake.length <= 1 || nextY !== this.snake[1].y || nextX !== this.snake[1].x) {
            this.dx = 1;
            this.dy = 0;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
    }
  }

  getRandomPosition() {
    let newPosition;
    let validPosition = false;

    while (!validPosition) {
      newPosition = {
        x: Math.floor(Math.random() * GAME_CONFIG.TILE_COUNT),
        y: Math.floor(Math.random() * GAME_CONFIG.TILE_COUNT),
      };

      validPosition = true;
      // Check collision with snake
      for (let segment of this.snake) {
        if (segment.x === newPosition.x && segment.y === newPosition.y) {
          validPosition = false;
          break;
        }
      }
      // Check collision with other food
      if (this.food && newPosition.x === this.food.x && newPosition.y === this.food.y) {
        validPosition = false;
      }
      if (this.goldenApple && newPosition.x === this.goldenApple.x && newPosition.y === this.goldenApple.y) {
        validPosition = false;
      }
    }

    return newPosition;
  }

  getRandomFoodPosition() {
    const position = this.getRandomPosition();
    return {
      ...position,
      type: GAME_CONFIG.FRUITS[0], // Always regular apple
    };
  }

  trySpawnGoldenApple() {
    if (!this.goldenApple && Math.random() < GAME_CONFIG.GOLDEN_APPLE_CHANCE) {
      const position = this.getRandomPosition();
      this.goldenApple = {
        ...position,
        type: GAME_CONFIG.FRUITS[1],
      };

      this.goldenAppleTimer = setTimeout(() => {
        this.goldenApple = null;
      }, GAME_CONFIG.GOLDEN_APPLE_DURATION);
    }
  }

  update() {
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    this.snake.unshift(head);

    let ate = false;

    // Check regular apple collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += this.food.type.points;
      this.currentScoreElement.textContent = this.score;
      this.food = this.getRandomFoodPosition();
      this.trySpawnGoldenApple();
      ate = true;
    }

    // Check golden apple collision
    if (this.goldenApple && head.x === this.goldenApple.x && head.y === this.goldenApple.y) {
      this.score += this.goldenApple.type.points;
      this.currentScoreElement.textContent = this.score;
      clearTimeout(this.goldenAppleTimer);
      this.goldenApple = null;
      ate = true;
    }

    if (!ate) {
      this.snake.pop();
    }

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHighScore", this.highScore);
      this.highScoreElement.textContent = this.highScore;
    }

    // Check wall collision
    if (head.x < 0 || head.x >= GAME_CONFIG.TILE_COUNT || head.y < 0 || head.y >= GAME_CONFIG.TILE_COUNT) {
      this.gameOver = true;
      this.showGameOver();
      return;
    }

    // Check self collision
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.gameOver = true;
        this.showGameOver();
        return;
      }
    }
  }

  render() {
    if (this.snake.length > 0) {
      // Clear canvas
      this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Create path for the entire snake body
      this.ctx.beginPath();

      const start = {
        x: this.snake[0].x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
        y: this.snake[0].y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
      };

      this.ctx.moveTo(start.x, start.y);

      // Create smooth curve through all points
      for (let i = 0; i < this.snake.length - 1; i++) {
        const current = {
          x: this.snake[i].x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
          y: this.snake[i].y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
        };
        const next = {
          x: this.snake[i + 1].x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
          y: this.snake[i + 1].y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
        };

        const xc = (current.x + next.x) / 2;
        const yc = (current.y + next.y) / 2;

        this.ctx.quadraticCurveTo(current.x, current.y, xc, yc);
      }

      // Enhanced shadow for depth
      this.ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      this.ctx.shadowBlur = 6;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;

      // More subtle gradient for the snake body
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, GAME_CONFIG.COLORS.SNAKE_BASE);
      gradient.addColorStop(0.3, GAME_CONFIG.COLORS.SNAKE_LIGHT);
      gradient.addColorStop(0.6, GAME_CONFIG.COLORS.SNAKE_BASE);
      gradient.addColorStop(0.9, GAME_CONFIG.COLORS.SNAKE_DARK);

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = GAME_CONFIG.GRID_SIZE - 2;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.stroke();

      // Reset shadow
      this.ctx.shadowColor = "transparent";
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;

      // Draw snake head
      const head = this.snake[0];
      const headX = head.x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2;
      const headY = head.y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2;
      const radius = (GAME_CONFIG.GRID_SIZE - 2) / 2;

      const headGradient = this.ctx.createRadialGradient(
        headX - radius / 2,
        headY - radius / 2,
        radius / 4,
        headX,
        headY,
        radius
      );
      headGradient.addColorStop(0, GAME_CONFIG.COLORS.SNAKE_LIGHT);
      headGradient.addColorStop(0.7, GAME_CONFIG.COLORS.SNAKE_BASE);
      headGradient.addColorStop(1, GAME_CONFIG.COLORS.SNAKE_DARK);

      this.ctx.beginPath();
      this.ctx.fillStyle = headGradient;
      this.ctx.arc(headX, headY, radius, 0, Math.PI * 2);
      this.ctx.fill();

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
      if (this.dx === 1) {
        eyeY = headY - radius * 0.3;
        tongueStartX = headX + radius * 0.8;
        tongueEndX = headX + radius + 8;
      } else if (this.dx === -1) {
        eyeY = headY - radius * 0.3;
        tongueStartX = headX - radius * 0.8;
        tongueEndX = headX - radius - 8;
      } else if (this.dy === -1) {
        leftEyeX = headX - radius * 0.3;
        rightEyeX = headX + radius * 0.3;
        eyeY = headY - eyeOffset;
        tongueStartY = headY - radius * 0.8;
        tongueEndY = headY - radius - 8;
      } else if (this.dy === 1) {
        leftEyeX = headX - radius * 0.3;
        rightEyeX = headX + radius * 0.3;
        eyeY = headY + eyeOffset;
        tongueStartY = headY + radius * 0.8;
        tongueEndY = headY + radius + 8;
      }

      // Draw eyes
      this.ctx.fillStyle = "#000";
      this.ctx.beginPath();
      this.ctx.arc(leftEyeX, eyeY, 2.5, 0, Math.PI * 2);
      this.ctx.arc(rightEyeX, eyeY, 2.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Add eye highlights
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.beginPath();
      this.ctx.arc(leftEyeX - 0.5, eyeY - 0.5, 1, 0, Math.PI * 2);
      this.ctx.arc(rightEyeX - 0.5, eyeY - 0.5, 1, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw tongue
      if (this.dx !== 0 || this.dy !== 0) {
        this.ctx.strokeStyle = GAME_CONFIG.COLORS.TONGUE;
        this.ctx.lineWidth = 1.5;
        this.ctx.lineCap = "round";

        this.ctx.beginPath();
        this.ctx.moveTo(tongueStartX, tongueStartY);
        this.ctx.lineTo(tongueEndX, tongueEndY);

        if (this.dx === 1) {
          this.ctx.quadraticCurveTo(tongueEndX + 2, tongueEndY, tongueEndX + 2, tongueEndY - 3);
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(tongueEndX + 2, tongueEndY, tongueEndX + 2, tongueEndY + 3);
        } else if (this.dx === -1) {
          this.ctx.quadraticCurveTo(tongueEndX - 2, tongueEndY, tongueEndX - 2, tongueEndY - 3);
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(tongueEndX - 2, tongueEndY, tongueEndX - 2, tongueEndY + 3);
        } else if (this.dy === -1) {
          this.ctx.quadraticCurveTo(tongueEndX, tongueEndY - 2, tongueEndX - 3, tongueEndY - 2);
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(tongueEndX, tongueEndY - 2, tongueEndX + 3, tongueEndY - 2);
        } else if (this.dy === 1) {
          this.ctx.quadraticCurveTo(tongueEndX, tongueEndY + 2, tongueEndX - 3, tongueEndY + 2);
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(tongueEndX, tongueEndY + 2, tongueEndX + 3, tongueEndY + 2);
        }
        this.ctx.stroke();
      }
    }

    // Draw food
    this.drawFruit(this.food);
    if (this.goldenApple) {
      this.drawFruit(this.goldenApple);
    }
  }

  drawFruit(fruit) {
    const fruitX = fruit.x * GAME_CONFIG.GRID_SIZE;
    const fruitY = fruit.y * GAME_CONFIG.GRID_SIZE;

    this.ctx.fillStyle = fruit.type.color;
    this.ctx.beginPath();
    this.ctx.arc(
      fruitX + GAME_CONFIG.GRID_SIZE / 2,
      fruitY + GAME_CONFIG.GRID_SIZE / 2,
      GAME_CONFIG.GRID_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    this.ctx.fillStyle = fruit.type.leafColor;
    this.ctx.beginPath();
    this.ctx.ellipse(fruitX + GAME_CONFIG.GRID_SIZE / 2, fruitY, 4, 8, Math.PI / 4, 0, Math.PI * 2);
    this.ctx.fill();
  }

  gameLoop(currentTime) {
    try {
      if (this.gameOver) return;

      window.requestAnimationFrame(this.boundGameLoop);

      const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
      if (secondsSinceLastRender < 1 / GAME_CONFIG.GAME_SPEED) return;

      this.lastRenderTime = currentTime;

      this.update();
      this.render();
    } catch (error) {
      console.error("Game loop error:", error);
      this.gameOver = true;
      this.showGameOver();
    }
  }

  showGameOver() {
    this.cleanup();
    this.finalScoreElement.textContent = this.score;
    this.finalHighScoreElement.textContent = this.highScore;

    // Check if it's a top 5 score
    const nameInputContainer = document.getElementById("nameInputContainer");
    const playerNameInput = document.getElementById("playerName");

    if (this.isTopScore(this.score)) {
      nameInputContainer.style.display = "block";
      playerNameInput.value = "";
      playerNameInput.focus();

      // Update the play again button to save the score
      this.playAgainButton.addEventListener(
        "click",
        () => {
          this.saveHighScore(this.score);
        },
        { once: true }
      );
    } else {
      nameInputContainer.style.display = "none";
    }

    this.modal.style.display = "block";
  }

  startNewGame() {
    this.modal.style.display = "none";
    this.initializeGame();
    this.setupEventListeners();
    requestAnimationFrame(this.boundGameLoop);
  }

  initializePointsGuide() {
    const apples = document.querySelectorAll(".apple-icon");
    apples.forEach((canvas, index) => {
      const ctx = canvas.getContext("2d");
      const isGolden = canvas.classList.contains("golden");
      const fruit = {
        type: GAME_CONFIG.FRUITS[isGolden ? 1 : 0],
      };

      // Draw the apple
      ctx.fillStyle = fruit.type.color;
      ctx.beginPath();
      ctx.arc(10, 10, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw the leaf
      ctx.fillStyle = fruit.type.leafColor;
      ctx.beginPath();
      ctx.ellipse(10, 4, 2, 4, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  loadHighScores() {
    const scores = localStorage.getItem("snakeHighScores");
    return scores ? JSON.parse(scores) : [];
  }

  isTopScore(score) {
    return (
      this.highScores.length < 3 || // Changed from 5 to 3
      score > this.highScores[this.highScores.length - 1].score
    );
  }

  saveHighScore(score) {
    const playerName = document.getElementById("playerName").value.trim() || "Anonymous";
    const newScore = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString(),
    };

    this.highScores.push(newScore);

    // Sort scores in descending order
    this.highScores.sort((a, b) => b.score - a.score);

    // Keep only top 3 (changed from 5)
    this.highScores = this.highScores.slice(0, 3);

    // Save to localStorage
    localStorage.setItem("snakeHighScores", JSON.stringify(this.highScores));

    // Update the display
    this.updateHighScoresList();
  }

  updateHighScoresList() {
    const topScoresList = document.getElementById("topScores");
    topScoresList.innerHTML = "";

    this.highScores.forEach((score, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <span class="player-name">${score.name}</span>
            <span class="score-value">${score.score} points</span>
            <span class="date">${score.date}</span>
        `;
      topScoresList.appendChild(li);
    });
  }

  clearHighScores() {
    localStorage.removeItem("snakeHighScores");
    this.highScores = [];
    this.updateHighScoresList();
  }
}

// Error boundary
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Game error:", { message, source, lineno, colno, error });
  const game = window.gameInstance;
  if (game) {
    game.cleanup();
    game.showGameOver();
  }
  return true;
};

// Initialize game
try {
  window.gameInstance = new Game();
  window.gameInstance.startNewGame();
} catch (error) {
  console.error("Failed to initialize game:", error);
}
