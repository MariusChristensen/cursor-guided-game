# SnakeySnake 🐍

A modern take on the classic Snake game, featuring a global Hall of Fame and sleek styling.

## Play Now

Play on either platform:

- [GitHub Pages](https://mariuschristensen.github.io/cursor-guided-game/)
- [Firebase App](https://snakeysnake-34426.web.app/)

## Features

- Classic snake gameplay with modern visuals
- Global Hall of Fame leaderboard
- Personal best score tracking
- Regular and golden apples for varied scoring
  - Regular apples: 10 points
  - Golden apples: 50 points (appear randomly)
- Real-time score updates
- Responsive design for various screen sizes
- Smooth animations and visual feedback

## Controls

- Use arrow keys to guide the snake
- Collect apples to grow and score points
- Avoid collisions with walls and yourself
- Press Space to restart after game over
- Enter your name to submit high scores

## Technical Details

- Built with vanilla JavaScript for optimal performance
- Firebase services:
  - Realtime Database for global leaderboard
  - Firebase Hosting for production deployment
- Vite for build optimization and modern development experience
- Environment variables for secure configuration
- Rate limiting for score submissions
- Mobile-friendly design

## Development

To run locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_DATABASE_URL=your_database_url
   ```
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Deployment

The game is deployed on two platforms:

### GitHub Pages

- Automated deployment through GitHub Actions
- Accessible at: https://mariuschristensen.github.io/cursor-guided-game/

### Firebase Hosting

- Deploy using Firebase CLI:
  ```bash
  npm run build
  firebase deploy
  ```
- Accessible at: https://snakeysnake-34426.web.app/

## Security Features

- Protected Firebase credentials using environment variables
- Input validation for all user inputs
- Rate limiting for score submissions to prevent abuse
- Automatic cleanup of old scores
- Secure data transmission

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
