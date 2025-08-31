# 🎴 Card Deck Remembering

A Vue.js 3 application designed to help you master the skill of memorizing playing cards through timed practice sessions.

## ✨ Features

- **Two Deck Sizes**: Choose between 36 cards (6 to Ace) and 52 cards (2 to Ace)
- **Smart Validation**: Can only select up to the chosen deck size
- **Sequential Memorization**: View one card at a time with navigation controls
- **Interactive Review**: Drag and drop cards to numbered slots for recall testing
- **Dual Timers**: 
  - Memorization phase timer (right-side display)
  - Review phase timer (right-side display)
- **Progress Persistence**: Your session state is automatically saved and restored
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Statistics Tracking**: Monitor your accuracy and performance in real-time

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎯 How to Use

### 1. Session Setup
- Choose your deck size (36 or 52 cards)
- Select how many cards you want to memorize
- Set memorization time (how long to study the cards)
- Set review time (how long to guess/recall the cards)

### 2. Memorization Phase
- Cards are displayed face-up
- Use the timer to pace your memorization
- Click "I'm Ready!" when you've memorized the cards

### 3. Review Phase
- Cards are hidden with question marks
- Click on cards to reveal them and test your memory
- Track your accuracy in real-time
- Use the timer to pace your review

### 4. Results
- View your final accuracy and performance
- Start a new session or reset the current one

## 🏗️ Project Structure

```
src/
├── components/           # Vue components
│   ├── SessionSetup.vue    # Session configuration
│   ├── MemorizationPhase.vue # Card memorization interface
│   ├── ReviewPhase.vue      # Card recall and placement
│   └── ResultsPhase.vue     # Session results display
├── composables/          # Reusable logic
│   ├── useCardDeck.js   # Card deck management
│   ├── useTimer.js      # Timer functionality
│   └── useLocalStorage.js # Local storage operations
├── App.vue              # Main application component
├── main.js              # Application entry point
└── style.css            # Global styles
```

## 🎨 Design Features

- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth transitions
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Visual Feedback**: Progress bars, timers, and status indicators

## 🔧 Customization

### Adding More Cards
To add more cards to the 52-card deck, edit `src/composables/useCardDeck.js` and add new card entries.

### Styling
Modify `src/style.css` to customize colors, fonts, and layout.

### Timer Behavior
Adjust timer functionality in `src/composables/useTimer.js`.

## 💾 Data Persistence

The application automatically saves your session state to localStorage, including:
- Current phase (memorization/review/results)
- Selected cards and their states
- Timer values
- Session settings

This means you can close the browser and return later to continue your session.

## 🚧 Future Enhancements

- [ ] Pause/resume functionality for timers
- [ ] Multiple difficulty levels
- [ ] Performance analytics and charts
- [ ] Card memorization techniques and tips
- [ ] Social features and leaderboards
- [ ] Custom card decks and themes

## 🐛 Troubleshooting

### Cards Not Loading
- Ensure the `cards/` folder contains the card images
- Check that image filenames match the card data in `useCardDeck.js`

### Timer Issues
- Refresh the page if timers become unresponsive
- Check browser console for any JavaScript errors

### Local Storage Issues
- Clear browser data if localStorage becomes corrupted
- Ensure cookies and local storage are enabled

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## 📄 License

This project is open source and available under the MIT License.

---

**Happy memorizing! 🧠✨**
