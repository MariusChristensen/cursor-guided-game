"use strict";

import { GAME_CONFIG } from "./config.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase-config.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.currentScoreElement = document.getElementById("currentScore");
    this.highScoreElement = document.getElementById("highScore");
    this.modal = document.getElementById("gameOverModal");
    this.finalScoreElement = document.getElementById("finalScore");
    this.finalHighScoreElement = document.getElementById("finalHighScore");
    this.submitScoreButton = document.getElementById("submitScore");
    this.playerNameInput = document.getElementById("playerName");
    this.nameInputContainer = document.getElementById("nameInputContainer");

    this.validateElements();
    this.initializeGame();
    this.setupEventListeners();
    this.initializePointsGuide();
  }

  validateElements() {
    if (
      !this.canvas ||
      !this.ctx ||
      !this.currentScoreElement ||
      !this.highScoreElement ||
      !this.modal ||
      !this.finalScoreElement ||
      !this.finalHighScoreElement ||
      !this.submitScoreButton ||
      !this.playerNameInput ||
      !this.nameInputContainer
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
    this.boundGameLoop = this.gameLoop.bind(this);
    document.addEventListener("keydown", this.boundHandleKeyPress);
  }

  cleanup() {
    if (this.goldenAppleTimer) {
      clearTimeout(this.goldenAppleTimer);
      this.goldenAppleTimer = null;
    }
    document.removeEventListener("keydown", this.boundHandleKeyPress);
  }

  handleKeyPress(event) {
    if (this.gameOver) {
      if (event.key === " ") {
        // Spacebar
        // Only prevent default and restart if we're not typing a name
        if (document.activeElement !== this.playerNameInput) {
          event.preventDefault();
          this.startNewGame();
        }
        return;
      }

      if (
        event.key === "Enter" &&
        this.nameInputContainer.style.display === "block"
      ) {
        event.preventDefault(); // Prevent any restart
        const playerName = this.playerNameInput.value.trim();
        if (playerName) {
          this.boundSubmitScore();
        }
        return;
      }
      return;
    }

    const currentTime = Date.now();
    if (
      currentTime - this.lastDirectionChange <
      this.directionChangeThreshold
    ) {
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
          if (
            this.snake.length <= 1 ||
            nextY !== this.snake[1].y ||
            nextX !== this.snake[1].x
          ) {
            this.dx = 0;
            this.dy = -1;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
      case "ArrowDown":
        if (this.dy === 0) {
          nextY = head.y + 1;
          if (
            this.snake.length <= 1 ||
            nextY !== this.snake[1].y ||
            nextX !== this.snake[1].x
          ) {
            this.dx = 0;
            this.dy = 1;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
      case "ArrowLeft":
        if (this.dx === 0) {
          nextX = head.x - 1;
          if (
            this.snake.length <= 1 ||
            nextY !== this.snake[1].y ||
            nextX !== this.snake[1].x
          ) {
            this.dx = -1;
            this.dy = 0;
            this.lastDirectionChange = currentTime;
          }
        }
        break;
      case "ArrowRight":
        if (this.dx === 0) {
          nextX = head.x + 1;
          if (
            this.snake.length <= 1 ||
            nextY !== this.snake[1].y ||
            nextX !== this.snake[1].x
          ) {
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
      if (
        this.food &&
        newPosition.x === this.food.x &&
        newPosition.y === this.food.y
      ) {
        validPosition = false;
      }
      if (
        this.goldenApple &&
        newPosition.x === this.goldenApple.x &&
        newPosition.y === this.goldenApple.y
      ) {
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
    if (
      this.goldenApple &&
      head.x === this.goldenApple.x &&
      head.y === this.goldenApple.y
    ) {
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
    if (
      head.x < 0 ||
      head.x >= GAME_CONFIG.TILE_COUNT ||
      head.y < 0 ||
      head.y >= GAME_CONFIG.TILE_COUNT
    ) {
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
          x:
            this.snake[i].x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
          y:
            this.snake[i].y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
        };
        const next = {
          x:
            this.snake[i + 1].x * GAME_CONFIG.GRID_SIZE +
            GAME_CONFIG.GRID_SIZE / 2,
          y:
            this.snake[i + 1].y * GAME_CONFIG.GRID_SIZE +
            GAME_CONFIG.GRID_SIZE / 2,
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
      const gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
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
          this.ctx.quadraticCurveTo(
            tongueEndX + 2,
            tongueEndY,
            tongueEndX + 2,
            tongueEndY - 3
          );
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(
            tongueEndX + 2,
            tongueEndY,
            tongueEndX + 2,
            tongueEndY + 3
          );
        } else if (this.dx === -1) {
          this.ctx.quadraticCurveTo(
            tongueEndX - 2,
            tongueEndY,
            tongueEndX - 2,
            tongueEndY - 3
          );
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(
            tongueEndX - 2,
            tongueEndY,
            tongueEndX - 2,
            tongueEndY + 3
          );
        } else if (this.dy === -1) {
          this.ctx.quadraticCurveTo(
            tongueEndX,
            tongueEndY - 2,
            tongueEndX - 3,
            tongueEndY - 2
          );
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(
            tongueEndX,
            tongueEndY - 2,
            tongueEndX + 3,
            tongueEndY - 2
          );
        } else if (this.dy === 1) {
          this.ctx.quadraticCurveTo(
            tongueEndX,
            tongueEndY + 2,
            tongueEndX - 3,
            tongueEndY + 2
          );
          this.ctx.moveTo(tongueEndX, tongueEndY);
          this.ctx.quadraticCurveTo(
            tongueEndX,
            tongueEndY + 2,
            tongueEndX + 3,
            tongueEndY + 2
          );
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
    this.ctx.ellipse(
      fruitX + GAME_CONFIG.GRID_SIZE / 2,
      fruitY,
      4,
      8,
      Math.PI / 4,
      0,
      Math.PI * 2
    );
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

  async showGameOver() {
    this.cleanup();
    this.finalScoreElement.textContent = this.score;
    this.finalHighScoreElement.textContent = this.highScore;

    // Save personal high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHighScore", this.highScore);
      this.highScoreElement.textContent = this.highScore;
    }

    // Check for global top score and show name input
    this.checkAndShowNameInput();

    this.modal.style.display = "block";

    // Remove any existing event listeners
    if (this.boundSubmitScore) {
      this.submitScoreButton.removeEventListener(
        "click",
        this.boundSubmitScore
      );
    }

    // Create bound function for the event listener
    this.boundSubmitScore = async () => {
      const playerName = this.playerNameInput.value.trim();
      if (playerName) {
        try {
          await this.saveGlobalScore(playerName, this.score);
          this.nameInputContainer.style.display = "none";
          // Now it's safe to restart
          this.startNewGame();
        } catch (error) {
          console.error("Error saving score:", error);
          alert("Failed to save score. Please try again.");
        }
      }
    };

    // Add new event listener
    this.submitScoreButton.addEventListener("click", this.boundSubmitScore);
  }

  async checkAndShowNameInput() {
    try {
      const globalTopScores = await this.getGlobalTopScores();
      const isGlobalTop =
        globalTopScores.length < 3 ||
        this.score > globalTopScores[globalTopScores.length - 1].score;
      this.nameInputContainer.style.display = isGlobalTop ? "block" : "none";
    } catch (error) {
      console.error("Error checking top scores:", error);
      this.nameInputContainer.style.display = "none";
    }
  }

  async getGlobalTopScores() {
    try {
      const highScoresQuery = query(
        collection(db, "highscores"),
        orderBy("score", "desc"),
        limit(3)
      );

      const querySnapshot = await getDocs(highScoresQuery);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching global scores:", error);
      return [];
    }
  }

  async saveGlobalScore(playerName, score) {
    try {
      console.log("Attempting to save score:", { playerName, score });
      const docRef = await addDoc(collection(db, "highscores"), {
        name: playerName,
        score: score,
        timestamp: new Date(),
      });
      console.log("Score saved successfully with ID:", docRef.id);
      await this.updateGlobalTopScores();

      // Replace input container with celebration message
      const celebrationHtml = `
        <div class="celebration-message">
          <h3>🏆 Incredible Score! 🏆</h3>
          <p>You've made it into the Hall of Fame!</p>
          <p class="restart-hint">Press <span class="key">Space</span> to play again</p>
        </div>
      `;
      const modalContent = document.querySelector(".modal-content");
      const nameInputContainer = document.getElementById("nameInputContainer");
      nameInputContainer.style.display = "none";

      // Remove any existing celebration message
      const existingCelebration = modalContent.querySelector(
        ".celebration-message"
      );
      if (existingCelebration) {
        existingCelebration.remove();
      }

      // Add new celebration message
      nameInputContainer.insertAdjacentHTML("afterend", celebrationHtml);
    } catch (error) {
      console.error("Error saving global score:", error);
      alert("Failed to save score. Please try again.");
    }
  }

  async startNewGame() {
    this.modal.style.display = "none";
    this.nameInputContainer.style.display = "none";
    this.playerNameInput.value = "";
    this.initializeGame();
    this.setupEventListeners();
    await this.updateTopScores(); // Update scores when game starts
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
    try {
      const scores = localStorage.getItem("snakeHighScores");
      return scores ? JSON.parse(scores) : [];
    } catch (error) {
      console.error("Error loading scores:", error);
      return [];
    }
  }

  isTopScore(score) {
    return (
      this.highScores.length < 3 || // Changed from 5 to 3
      score > this.highScores[this.highScores.length - 1].score
    );
  }

  saveHighScore(score) {
    const playerNameInput = document.getElementById("playerName");
    const playerName = playerNameInput.value.trim();

    if (playerName.length > 20) {
      playerNameInput.value = playerName.substring(0, 20);
    }

    const newScore = {
      name: playerName || "Anonymous",
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
    // Update personal high score display
    this.highScoreElement.textContent = this.highScore;

    // Update global top scores
    this.updateGlobalTopScores();
  }

  async updateGlobalTopScores() {
    try {
      const scores = await this.getGlobalTopScores();
      const topScoresList = document.getElementById("topScores");
      topScoresList.innerHTML = scores
        .map(
          (score) => `
        <li>
          <span class="player-name">${score.name}</span>
          <span class="score-value">${score.score} points</span>
          <span class="date">${new Date(
            score.timestamp.toDate()
          ).toLocaleDateString()}</span>
        </li>
      `
        )
        .join("");
    } catch (error) {
      console.error("Error updating global scores:", error);
    }
  }

  clearHighScores() {
    // Only clear personal high score
    localStorage.removeItem("snakeHighScore");
    this.highScore = 0;
    this.highScoreElement.textContent = "0";
  }

  async updateTopScores() {
    try {
      const highScoresQuery = query(
        collection(db, "highscores"),
        orderBy("score", "desc"),
        limit(3)
      );

      const querySnapshot = await getDocs(highScoresQuery);
      const scores = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const topScoresList = document.getElementById("topScores");
      topScoresList.innerHTML = scores
        .map(
          (score) => `
        <li>${score.name}: ${score.score}</li>
      `
        )
        .join("");
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
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
