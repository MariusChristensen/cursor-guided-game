# SnakeySnake 🐍

A modern take on the classic Snake game, featuring a global Hall of Fame and sleek styling.

## Play Now

[Play SnakeySnake](https://mariuschristensen.github.io/cursor-guided-game/)

## Features

- Classic snake gameplay with modern visuals
- Global Hall of Fame leaderboard
- Personal best score tracking
- Regular and golden apples for varied scoring
- Real-time score updates
- Responsive design

## Controls

- Use arrow keys to guide the snake
- Collect apples to grow and score points
  - Regular apples: 10 points
  - Golden apples: 50 points
- Avoid collisions with walls and yourself
- Press Space to restart after game over

## Technical Details

- Built with vanilla JavaScript
- Firebase backend for global leaderboard
- Vite for build optimization
- Environment variables for secure configuration
- Rate limiting for score submissions

## Development

To run locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with Firebase configuration
4. Run development server: `npm run dev`

## Security Features

- Protected Firebase credentials
- Input validation
- Rate limiting for score submissions
- Automatic cleanup of old scores
