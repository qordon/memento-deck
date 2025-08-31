import { ref } from 'vue'

export function useCardDeck() {
  // Card data for 36-card deck (6-A, all suits)
  const cardDeck36 = [
    { id: '6C', name: '6 of Clubs', filename: '6C.png', suit: 'clubs', value: 6 },
    { id: '6D', name: '6 of Diamonds', filename: '6D.png', suit: 'diamonds', value: 6 },
    { id: '6H', name: '6 of Hearts', filename: '6H.png', suit: 'hearts', value: 6 },
    { id: '6S', name: '6 of Spades', filename: '6S.png', suit: 'spades', value: 6 },
    { id: '7C', name: '7 of Clubs', filename: '7C.png', suit: 'clubs', value: 7 },
    { id: '7D', name: '7 of Diamonds', filename: '7D.png', suit: 'diamonds', value: 7 },
    { id: '7H', name: '7 of Hearts', filename: '7H.png', suit: 'hearts', value: 7 },
    { id: '7S', name: '7 of Spades', filename: '7S.png', suit: 'spades', value: 7 },
    { id: '8C', name: '8 of Clubs', filename: '8C.png', suit: 'clubs', value: 8 },
    { id: '8D', name: '8 of Diamonds', filename: '8D.png', suit: 'diamonds', value: 8 },
    { id: '8H', name: '8 of Hearts', filename: '8H.png', suit: 'hearts', value: 8 },
    { id: '8S', name: '8 of Spades', filename: '8S.png', suit: 'spades', value: 8 },
    { id: '9C', name: '9 of Clubs', filename: '9C.png', suit: 'clubs', value: 9 },
    { id: '9D', name: '9 of Diamonds', filename: '9D.png', suit: 'diamonds', value: 9 },
    { id: '9H', name: '9 of Hearts', filename: '9H.png', suit: 'hearts', value: 9 },
    { id: '9S', name: '9 of Spades', filename: '9S.png', suit: 'spades', value: 9 },
    { id: '10C', name: '10 of Clubs', filename: '10C.png', suit: 'clubs', value: 10 },
    { id: '10D', name: '10 of Diamonds', filename: '10D.png', suit: 'diamonds', value: 10 },
    { id: '10H', name: '10 of Hearts', filename: '10H.png', suit: 'hearts', value: 10 },
    { id: '10S', name: '10 of Spades', filename: '10S.png', suit: 'spades', value: 10 },
    { id: 'JC', name: 'Jack of Clubs', filename: 'JC.png', suit: 'clubs', value: 11 },
    { id: 'JD', name: 'Jack of Diamonds', filename: 'JD.png', suit: 'diamonds', value: 11 },
    { id: 'JH', name: 'Jack of Hearts', filename: 'JH.png', suit: 'hearts', value: 11 },
    { id: 'JS', name: 'Jack of Spades', filename: 'JS.png', suit: 'spades', value: 11 },
    { id: 'QC', name: 'Queen of Clubs', filename: 'QC.png', suit: 'clubs', value: 12 },
    { id: 'QD', name: 'Queen of Diamonds', filename: 'QD.png', suit: 'diamonds', value: 12 },
    { id: 'QH', name: 'Queen of Hearts', filename: 'QH.png', suit: 'hearts', value: 12 },
    { id: 'QS', name: 'Queen of Spades', filename: 'QS.png', suit: 'spades', value: 12 },
    { id: 'KC', name: 'King of Clubs', filename: 'KC.png', suit: 'clubs', value: 13 },
    { id: 'KD', name: 'King of Diamonds', filename: 'KD.png', suit: 'diamonds', value: 13 },
    { id: 'KH', name: 'King of Hearts', filename: 'KH.png', suit: 'hearts', value: 13 },
    { id: 'KS', name: 'King of Spades', filename: 'KS.png', suit: 'spades', value: 13 },
    { id: 'AC', name: 'Ace of Clubs', filename: 'AC.png', suit: 'clubs', value: 14 },
    { id: 'AD', name: 'Ace of Diamonds', filename: 'AD.png', suit: 'diamonds', value: 14 },
    { id: 'AH', name: 'Ace of Hearts', filename: 'AH.png', suit: 'hearts', value: 14 },
    { id: 'AS', name: 'Ace of Spades', filename: 'AS.png', suit: 'spades', value: 14 }
  ]

  // Card data for 52-card deck (2-A, all suits) - for future expansion
  const cardDeck52 = [
    { id: '2C', name: '2 of Clubs', filename: '2C.png', suit: 'clubs', value: 2 },
    { id: '2D', name: '2 of Diamonds', filename: '2D.png', suit: 'diamonds', value: 2 },
    { id: '2H', name: '2 of Hearts', filename: '2H.png', suit: 'hearts', value: 2 },
    { id: '2S', name: '2 of Spades', filename: '2S.png', suit: 'spades', value: 2 },
    { id: '3C', name: '3 of Clubs', filename: '3C.png', suit: 'clubs', value: 3 },
    { id: '3D', name: '3 of Diamonds', filename: '3D.png', suit: 'diamonds', value: 3 },
    { id: '3H', name: '3 of Hearts', filename: '3H.png', suit: 'hearts', value: 3 },
    { id: '3S', name: '3 of Spades', filename: '3S.png', suit: 'spades', value: 3 },
    { id: '4C', name: '4 of Clubs', filename: '4C.png', suit: 'clubs', value: 4 },
    { id: '4D', name: '4 of Diamonds', filename: '4D.png', suit: 'diamonds', value: 4 },
    { id: '4H', name: '4 of Hearts', filename: '4H.png', suit: 'hearts', value: 4 },
    { id: '4S', name: '4 of Spades', filename: '4S.png', suit: 'spades', value: 4 },
    { id: '5C', name: '5 of Clubs', filename: '5C.png', suit: 'clubs', value: 5 },
    { id: '5D', name: '5 of Diamonds', filename: '5D.png', suit: 'diamonds', value: 5 },
    { id: '5H', name: '5 of Hearts', filename: '5H.png', suit: 'hearts', value: 5 },
    { id: '5S', name: '5 of Spades', filename: '5S.png', suit: 'spades', value: 5 },
    ...cardDeck36,
  ]

  const getAvailableCards = (deckSize) => {
    return deckSize === 36 ? cardDeck36 : cardDeck52
  }

  const shuffleCards = (cards) => {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  return {
    getAvailableCards,
    shuffleCards,
    cardDeck36,
    cardDeck52
  }
}
