# 🎴 Card Deck Remembering

A Vue.js 3 application designed to help you master the skill of memorizing playing cards through timed practice sessions.
Go to [memento-deck.vercel.app](https://memento-deck.vercel.app) or use this github repository.

## ✨ Features

- **Two Deck Sizes**: Choose between 36 cards (6 to Ace) and 52 cards (2 to Ace)
- **Custom Memorization Count**: You can select how many cards you want to memorize

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
- Click "Finish" when you've memorized the cards

### 3. Review Phase
- All cards are initially hidden in empty slots
- Сlick on cards from the deck to place them in slots
- A timer tracks how long you have for recall
- Click "Finish" when you've done
- At the end, your total correct answers are displayed


## 🔧 Customization

### Adding More Cards
To add more cards to the 52-card deck, edit `src/composables/useCardDeck.js` and add new card entries.

### Timer Behavior
Adjust timer functionality in `src/composables/useTimer.js`.


## 🐛 Troubleshooting

### Cards Not Loading
- Ensure the `cards/` folder contains the card images
- Check that image filenames match the card data in `useCardDeck.js`


## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## 📄 License

This project is open source and available under the MIT License.

---

**Happy memorizing! 🧠✨**
