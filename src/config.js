/**
 * Game Configuration Constants
 * Contains all configurable game parameters and settings
 */
export const GAME_CONFIG = {
  //=============================================================================
  // GAME MECHANICS SETTINGS
  //=============================================================================
  /** Size of each grid cell in pixels */
  GRID_SIZE: 20,

  /** Number of cells in both width and height */
  TILE_COUNT: 20,

  /** Base game speed (moves per second) */
  GAME_SPEED: 13,

  /** Frame time in milliseconds (60 FPS) */
  FRAME_TIME: 1000 / 60,

  //=============================================================================
  // GOLDEN APPLE SETTINGS
  //=============================================================================
  /** Probability of golden apple spawning (15%) */
  GOLDEN_APPLE_CHANCE: 0.15,

  /** How long golden apple stays on screen (5 seconds) */
  GOLDEN_APPLE_DURATION: 5000,

  //=============================================================================
  // VISUAL SETTINGS
  //=============================================================================
  COLORS: {
    /** Main background color */
    BACKGROUND: "#222831",

    /** Snake color scheme */
    SNAKE_BASE: "#3eb892",
    SNAKE_LIGHT: "#45c09c",
    SNAKE_DARK: "#39a885",

    /** Snake tongue color */
    TONGUE: "#ff1744",
  },

  //=============================================================================
  // FRUIT CONFIGURATIONS
  //=============================================================================
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

  //=============================================================================
  // PLAYER NAME CONSTRAINTS
  //=============================================================================
  /** Maximum allowed length for player names */
  MAX_NAME_LENGTH: 20,

  /** Minimum required length for player names */
  MIN_NAME_LENGTH: 1,

  //=============================================================================
  // ERROR MESSAGES
  //=============================================================================
  ERRORS: {
    LOAD_SCORES: "Failed to load high scores",
    SAVE_SCORES: "Failed to save high scores",
  },
};
