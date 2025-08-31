<template>
  <div class="section">
    <div class="recall-header">
      <div class="controls">
        <button v-if="!reviewCompleted" @click="endReview" class="btn btn-success">Finish</button>
        <span v-else class="btn btn-success disabled-btn">Completed</span>
        <button @click="resetSession" class="btn btn-danger">Reset</button>
        <span v-if="reviewCompleted" class="correct-count">
          Correct: {{ correctCount }}
        </span>
      </div>
      <div class="section-title">Recall ends in: {{ formatTime(recallTimer) }}</div>
    </div>

    <div class="review-container">
      <div class="card-slots">
        <div
          class="card-slot"
          v-for="(slot, index) in slots"
          :key="index"
          :class="{ 
            'filled': slot.card, 
            'selected': selectedSlotIndex === index && !slot.card,
            'correct-slot': slot.isCorrect === true,
            'wrong-slot': slot.isCorrect === false
          }"
          @click="selectSlot(index)"
        >
          <div class="slot-number" :style="{ color: slot.textColor }">
            {{ slot.displayValue }}
          </div>

          <div v-if="slot.card" class="placed-card">
            <img :src="`/cards/${slot.card.filename}`" :alt="slot.card.name">
          </div>

          <div 
            v-if="reviewCompleted"
            class="slot-overlay"
            :class="{'correct-slot': slot.isCorrect === true, 'wrong-slot': slot.isCorrect === false}"
          ></div>
        </div>
      </div>
    </div>

    <div class="deck-area">
      <div class="deck-cards">
        <div 
          v-for="card in availableDeckCards" 
          :key="card.id"
          class="deck-card"
          @click="placeCardOnSlot(card)"
          @mouseenter="card.hovered = true"
          @mouseleave="card.hovered = false"
          :class="{ 'hovered': card.hovered, 'removed': card.removed, 'disabled-hover': reviewCompleted }"
        >
          <img v-if="!card.removed" :src="`/cards/${card.filename}`" :alt="card.name" loading="eager">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTimer } from '../composables/useTimer'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useCardDeck } from '../composables/useCardDeck'

const emit = defineEmits(['reset-session'])

const { getAvailableCards } = useCardDeck()
const { startTimer, stopTimer, formatTime } = useTimer()
const { loadFromStorage } = useLocalStorage()

const reviewCompleted = ref(false)
const recallTimer = ref(0)
const availableCards = ref([])
const slots = ref([])
const selectedSlotIndex = ref(0)
const correctCount = ref(0)

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
}

const formatCardDisplay = (card) => {
  if (!card) return ''
  let value = ''
  if (card.value === 11) value = 'J'
  else if (card.value === 12) value = 'Q'
  else if (card.value === 13) value = 'K'
  else if (card.value === 14) value = 'A'
  else value = card.value

  const suitSymbol = suitSymbols[card.suit] || ''
  return `${value}${suitSymbol}`
}

let recallTimerInterval = null

const availableDeckCards = computed(() => availableCards.value)

const placeCardOnSlot = (card) => {
  if (reviewCompleted.value) return
  if (selectedSlotIndex.value !== null && slots.value[selectedSlotIndex.value]?.card === null) {
    slots.value[selectedSlotIndex.value].card = card
    card.removed = true
    const nextFree = slots.value.findIndex(slot => slot.card === null)
    selectedSlotIndex.value = nextFree !== -1 ? nextFree : null
  }
}

const selectSlot = (index) => {
  if (reviewCompleted.value) return
  if (!slots.value[index].card) {
    selectedSlotIndex.value = index
  } else {
    removeCardFromSlot(index)
  }
}

const removeCardFromSlot = (slotIndex) => {
  if (reviewCompleted.value) return
  const slot = slots.value[slotIndex]
  if (slot && slot.card) {
    slot.card.removed = false
    slot.card = null
    selectedSlotIndex.value = slotIndex
  }
}

const endReview = () => {
  stopTimer(recallTimerInterval)
  const memorizedDeck = loadFromStorage('memorizedDeck')

  slots.value.forEach((slot, index) => {
    const card = memorizedDeck[index]
    if (card) {
      slot.displayValue = formatCardDisplay(card)
      slot.textColor = (card.suit === 'hearts' || card.suit === 'diamonds') ? 'red' : 'white'
      slot.isCorrect = slot.card ? slot.card.id === card.id : false
      if (slot.isCorrect) correctCount.value += 1
    }
  })

  reviewCompleted.value = true
}

const resetSession = () => {
  emit('reset-session')
}

onMounted(() => {
  const memorizedDeck = loadFromStorage('memorizedDeck')
  const savedSettings = loadFromStorage('cardDeckSession')

  availableCards.value = getAvailableCards(savedSettings.deckSize)
  slots.value = Array.from({ length: memorizedDeck.length }, (_, index) => ({
    id: index,
    card: null,
    displayValue: index + 1,
    isCorrect: null
  }))
  selectedSlotIndex.value = 0

  recallTimer.value = savedSettings.recallTime
  recallTimerInterval = startTimer(recallTimer, () => {
    endReview()
  })
})

onUnmounted(() => {
  if (recallTimerInterval) {
    stopTimer(recallTimerInterval)
  }
})
</script>

<style scoped>
.section {
  background-color: rgba(42, 42, 42, 0.95);
  border-radius: 15px;
  padding-bottom: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.recall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 3px solid white;
  margin-bottom: 10px;
}

.section-title {
  text-align: center;
  color: rgb(220, 220, 235);
  font-size: 18px;
  margin: 0;
}

.review-container {
  display: flex;
  gap: 30px;
  margin: 20px 0;
  padding-left: 130px;
}

.card-slots {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  row-gap: 20px;
}

.card-slot {
  width: 120px;
  height: 175px;
  border: 1px solid #d1d5db;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: rgba(69, 69, 69, 1);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  margin-left: -100px;
}

.card-slot:hover {
  background: rgb(121, 128, 70);
}

.card-slot.filled {
  background: rgba(16, 185, 129, 0.1);
  border: none;
}

.card-slot.selected {
  background-color: rgb(187, 191, 71);
}

.slot-number {
  position: absolute;
  top: -20px;
  left: 5px;
  font-size: 1rem;
  font-weight: 700;
  z-index: 10;
  color: #9ca3af;
}

.slot-number.correct {
  color: #10b981;
}

.slot-number.wrong {
  color: #ef4444;
}

.placed-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.placed-card img,
.deck-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slot-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  pointer-events: none;
  opacity: 0.4;
}

.slot-overlay.correct-slot {
  background-color: green;
}

.slot-overlay.wrong-slot {
  background-color: red;
}

.deck-area {
  margin: 20px 0;
}

.deck-cards {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}

.deck-card {
  width: 85px;
  height: 128px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(70px);
  margin-left: -73px;
}

.deck-card:hover {
  transform: translateY(50px);
  z-index: 10;
}

.deck-card.removed,
.deck-card.disabled-hover {
  pointer-events: none;
  opacity: 0;
}

.deck-card.disabled-hover:hover {
  transform: none;
  z-index: 1;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-success,
.disabled-btn {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
  transform: translateY(-2px);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.correct-count {
  margin-left: 20px;
  font-weight: 700;
  color: rgb(220, 220, 235);
  align-self: center;
}

.disabled-btn {
  opacity: 0.6;
  cursor: default;
  pointer-events: none;
}
</style>
