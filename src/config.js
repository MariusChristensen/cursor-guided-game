export const GAME_CONFIG = {
  GRID_SIZE: 20,
  TILE_COUNT: 20,
  GAME_SPEED: 13,
  FRAME_TIME: 1000 / 60,
  GOLDEN_APPLE_CHANCE: 0.15,
  GOLDEN_APPLE_DURATION: 5000,
  COLORS: {
    BACKGROUND: "#222831",
    SNAKE_BASE: "#3eb892",
    SNAKE_LIGHT: "#45c09c",
    SNAKE_DARK: "#39a885",
    TONGUE: "#ff1744",
  },
  FRUITS: [
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
  ],
  MAX_NAME_LENGTH: 20,
  MIN_NAME_LENGTH: 1,
  ERRORS: {
    LOAD_SCORES: "Failed to load high scores",
    SAVE_SCORES: "Failed to save high scores",
  },
};
