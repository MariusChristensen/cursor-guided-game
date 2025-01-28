"use strict";

import { GAME_CONFIG } from "./config.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config.js";

/**
 * Main Game Class
 * Controls snake movement, rendering, scoring, and Firebase integration
 */
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

  //=============================================================================
  // INITIALIZATION AND SETUP
  //=============================================================================

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
    this.directionChangeThreshold = 50;
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

  //=============================================================================
  // INPUT HANDLING
  //=============================================================================

  handleKeyPress(event) {
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
    }

    if (this.gameOver) {
      if (event.key === " ") {
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
        event.preventDefault();
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
      return;
    }

    const head = this.snake[0];
    let nextX = head.x;
    let nextY = head.y;

    switch (event.key) {
      case "ArrowUp":
        if (this.dy === 0) {
          nextY = head.y - 1;
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

  //=============================================================================
  // GAME MECHANICS
  //=============================================================================

  getRandomPosition() {
    let newPosition;
    let validPosition = false;

    while (!validPosition) {
      newPosition = {
        x: Math.floor(Math.random() * GAME_CONFIG.TILE_COUNT),
        y: Math.floor(Math.random() * GAME_CONFIG.TILE_COUNT),
      };

      validPosition = true;
      for (let segment of this.snake) {
        if (segment.x === newPosition.x && segment.y === newPosition.y) {
          validPosition = false;
          break;
        }
      }
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
      type: GAME_CONFIG.FRUITS[0],
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

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += this.food.type.points;
      this.currentScoreElement.textContent = this.score;
      this.food = this.getRandomFoodPosition();
      this.trySpawnGoldenApple();
      ate = true;
    }

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

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.gameOver = true;
        this.showGameOver();
        return;
      }
    }
  }

  //=============================================================================
  // RENDERING
  //=============================================================================

  render() {
    if (this.snake.length > 0) {
      this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();

      const start = {
        x: this.snake[0].x * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
        y: this.snake[0].y * GAME_CONFIG.GRID_SIZE + GAME_CONFIG.GRID_SIZE / 2,
      };

      this.ctx.moveTo(start.x, start.y);

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

      this.ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      this.ctx.shadowBlur = 6;
      this.ctx.shadowOffsetX = 2;
      this.ctx.shadowOffsetY = 2;

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

      this.ctx.shadowColor = "transparent";
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;

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

      const eyeOffset = radius * 0.5;
      let leftEyeX = headX - eyeOffset;
      let rightEyeX = headX + eyeOffset;
      let eyeY = headY;
      let tongueStartX = headX;
      let tongueStartY = headY;
      let tongueEndX = headX;
      let tongueEndY = headY;

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

      this.ctx.fillStyle = "#000";
      this.ctx.beginPath();
      this.ctx.arc(leftEyeX, eyeY, 2.5, 0, Math.PI * 2);
      this.ctx.arc(rightEyeX, eyeY, 2.5, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.beginPath();
      this.ctx.arc(leftEyeX - 0.5, eyeY - 0.5, 1, 0, Math.PI * 2);
      this.ctx.arc(rightEyeX - 0.5, eyeY - 0.5, 1, 0, Math.PI * 2);
      this.ctx.fill();

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

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHighScore", this.highScore);
      this.highScoreElement.textContent = this.highScore;
    }

    const existingCelebration = document.querySelector(".celebration-message");
    if (existingCelebration) {
      existingCelebration.remove();
    }

    await this.checkAndShowNameInput();

    this.modal.style.display = "block";

    if (this.boundSubmitScore) {
      this.submitScoreButton.removeEventListener(
        "click",
        this.boundSubmitScore
      );
    }

    this.boundSubmitScore = async () => {
      const playerName = this.playerNameInput.value.trim();
      if (playerName) {
        await this.saveGlobalScore(playerName, this.score);
      }
    };

    this.submitScoreButton.addEventListener("click", this.boundSubmitScore);
  }

  async checkAndShowNameInput() {
    try {
      // Check last submission time
      const lastSubmission = localStorage.getItem("lastScoreSubmission");
      const now = Date.now();
      const timeLimit = 60000; // 1 minute in milliseconds

      if (lastSubmission && now - parseInt(lastSubmission) < timeLimit) {
        this.nameInputContainer.style.display = "none";
        const messageHtml = `
              <p class="restart-hint">
                  Please wait before submitting another score.<br>
                  Press <span class="key">Space</span> to restart
              </p>
          `;
        this.modal
          .querySelector(".modal-content")
          .insertAdjacentHTML("beforeend", messageHtml);
        return;
      }

      const globalTopScores = await this.getGlobalTopScores();
      const isGlobalTop =
        globalTopScores.length < 5 ||
        this.score > globalTopScores[globalTopScores.length - 1].score;

      this.nameInputContainer.style.display = isGlobalTop ? "block" : "none";

      if (!isGlobalTop) {
        const restartMessage = document.querySelector(".restart-hint");
        if (!restartMessage) {
          const messageHtml = `
                  <p class="restart-hint">
                      Press <span class="key">Space</span> to restart
                  </p>
              `;
          this.modal
            .querySelector(".modal-content")
            .insertAdjacentHTML("beforeend", messageHtml);
        }
      }
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
        limit(5)
      );

      const querySnapshot = await getDocs(highScoresQuery);
      const scores = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return scores;
    } catch (error) {
      console.error("Error fetching global scores:", error);
      return [];
    }
  }

  async saveGlobalScore(playerName, score) {
    try {
      // Validate and sanitize input, but keep original capitalization
      const originalName = this.sanitizePlayerName(playerName);
      const lowercaseName = originalName.toLowerCase();

      if (!originalName || !Number.isInteger(score) || score < 0) {
        throw new Error("Invalid score or name");
      }

      // Check if this name already exists (case insensitive)
      const nameQuery = query(
        collection(db, "highscores"),
        where("nameLower", "==", lowercaseName)
      );
      const nameSnapshot = await getDocs(nameQuery);

      // If name exists, only update if new score is higher
      if (!nameSnapshot.empty) {
        const existingScore = nameSnapshot.docs[0].data().score;
        if (score <= existingScore) {
          const nameInputContainer =
            document.getElementById("nameInputContainer");
          nameInputContainer.style.display = "none";

          const messageHtml = `
            <div class="celebration-message">
              <p>You already have a higher score of ${existingScore} in the Hall of Fame!</p>
            </div>
          `;

          const existingCelebration = document.querySelector(
            ".celebration-message"
          );
          if (existingCelebration) {
            existingCelebration.remove();
          }

          nameInputContainer.insertAdjacentHTML("afterend", messageHtml);
          return;
        }
        // Delete the old score entry
        await deleteDoc(nameSnapshot.docs[0].ref);
      }

      // Get all scores to check total count
      const allScoresQuery = query(
        collection(db, "highscores"),
        orderBy("score", "desc")
      );
      const allScoresSnapshot = await getDocs(allScoresQuery);
      const scores = allScoresSnapshot.docs;

      // If we have 15 scores and new score is higher than the lowest
      if (scores.length >= 15) {
        const lowestScore = scores[scores.length - 1].data().score;
        if (score > lowestScore) {
          // Delete the lowest score
          await deleteDoc(scores[scores.length - 1].ref);
        } else if (score <= lowestScore) {
          console.log("Score not high enough for top 15");
          return;
        }
      }

      // Save the new score
      const scoreData = {
        name: originalName,
        nameLower: lowercaseName,
        score: score,
        timestamp: new Date(),
      };

      console.log("Attempting to save score:", scoreData);
      await addDoc(collection(db, "highscores"), scoreData);
      await this.updateGlobalTopScores();

      // Show celebration message
      const celebrationHtml = `
        <div class="celebration-message">
          <h3>🏆 Incredible Score! 🏆</h3>
          <p>You've made it into the Hall of Fame!</p>
        </div>
      `;
      const nameInputContainer = document.getElementById("nameInputContainer");
      nameInputContainer.style.display = "none";

      const existingCelebration = document.querySelector(
        ".celebration-message"
      );
      if (existingCelebration) {
        existingCelebration.remove();
      }

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
    await this.updateGlobalTopScores();
    requestAnimationFrame(this.boundGameLoop);
  }

  initializePointsGuide() {
    const apples = document.querySelectorAll(".apple-icon");
    apples.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      const isGolden = canvas.classList.contains("golden");
      const fruit = {
        type: GAME_CONFIG.FRUITS[isGolden ? 1 : 0],
      };

      ctx.fillStyle = fruit.type.color;
      ctx.beginPath();
      ctx.arc(10, 10, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = fruit.type.leafColor;
      ctx.beginPath();
      ctx.ellipse(10, 4, 2, 4, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  async updateGlobalTopScores() {
    try {
      const highScoresQuery = query(
        collection(db, "highscores"),
        orderBy("score", "desc"),
        limit(5)
      );

      const querySnapshot = await getDocs(highScoresQuery);
      const scores = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const topScoresList = document.getElementById("topScores");

      const positions = Array.from({ length: 5 }, (_, i) => {
        const score = scores[i] || null;
        return `
              <li>
                  <div class="score-row">
                      <div class="score-left">
                          <span class="position">${i + 1}.</span>
                          <span class="player-name">${
                            score ? score.name : "---"
                          }</span>
                      </div>
                      <span class="score-value">${
                        score ? score.score : "---"
                      }</span>
                  </div>
              </li>
          `;
      });

      const newHtml = positions.join("");

      topScoresList.innerHTML = newHtml;
    } catch (error) {
      console.error("Error in updateGlobalTopScores:", error);
    }
  }

  sanitizePlayerName(name) {
    if (!name) return "";
    // Remove any HTML tags and trim whitespace
    return name
      .replace(/[<>]/g, "") // Remove angle brackets to prevent HTML injection
      .replace(/[^\w\s-]/g, "") // Only allow letters, numbers, spaces, and hyphens
      .trim();
  }
}

//=============================================================================
// GAME INITIALIZATION AND ERROR HANDLING
//=============================================================================

window.onerror = function (message, source, lineno, colno, error) {
  console.error("Game error:", { message, source, lineno, colno, error });
  const game = window.gameInstance;
  if (game) {
    game.cleanup();
    game.showGameOver();
  }
  return true;
};

try {
  window.gameInstance = new Game();
  window.gameInstance.startNewGame();
} catch (error) {
  console.error("Failed to initialize game:", error);
}

export default Game;
