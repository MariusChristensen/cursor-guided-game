# SnakeySnake 🐍

A modern take on the classic Snake game, featuring a global Hall of Fame and sleek styling.

## Play Now

[Play on GitHub Pages](https://mariuschristensen.github.io/cursor-guided-game/)

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
- Firebase Firestore for global leaderboard
- Vite for build optimization and modern development experience
- Environment variables for secure configuration
- Mobile-friendly design

## Development

To run locally:

1. Clone the repository

```bash
git clone https://github.com/MariusChristensen/cursor-guided-game.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## Deployment

The game is automatically deployed to GitHub Pages when changes are pushed to the main branch. The build output is in the `docs` folder.

## Security Features

- Protected Firebase credentials using environment variables
- Input validation for all user inputs
- Firestore security rules for data protection
- Secure data transmission

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
