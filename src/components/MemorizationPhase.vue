<template>
  <div class="section">
    
    <div class="timer-area">
      <div class="timer-area-buttons">
        <button @click="endMemorization" class="btn btn-success">Finish</button>
        <button @click="resetSession" class="btn btn-danger">Reset</button>
      </div>
      
      <div class="section-title">Memorization ends in {{ formatTime(memorizationTimer) }}</div>
    </div>
    
    <div class="memorization-container">
      <div class="cards-area">
        <div class="current-card">
          <div class="card">
            <img :src="`/cards/${currentCard.filename}`" :alt="currentCard.name">
          </div>
        </div>
        
        <div class="memorized-cards">
          <div 
            v-for="(card, index) in memorizedCards" 
            :key="card.id" 
            class="memorized-card"
            :style="{ 
              zIndex: index + 1
            }"
          >
            <div class="card">
              <img :src="`/cards/${card.filename}`" :alt="card.name">
            </div>
          </div>
        </div>
        

      </div>
      
      
    </div>

    <div class="controls">
      <button 
        @click="previousCard" 
        :disabled="currentCardIndex === 0"
        class="btn btn-secondary"
      >
        Previous
      </button>
      
      <button 
        @click="nextCard" 
        :disabled="currentCardIndex === selectedCards.length - 1"
        class="btn btn-primary"
      >
        Next
      </button>
      
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCardDeck } from '../composables/useCardDeck'
import { useTimer } from '../composables/useTimer'
import { useLocalStorage } from '../composables/useLocalStorage'

const emit = defineEmits(['startReview', 'resetSession'])

// Composables
const { getAvailableCards, shuffleCards } = useCardDeck()
const { saveToStorage, loadFromStorage } = useLocalStorage()
const { startTimer, stopTimer, formatTime } = useTimer()

// Local state
const currentCardIndex = ref(0)
const selectedCards = ref([])
const memorizationTimer = ref(0);

// Timer reference
let memorizationTimerInterval = null

// Computed
const currentCard = computed(() => {
  return selectedCards.value[currentCardIndex.value] || {}
})

const memorizedCards = computed(() => {
  return selectedCards.value.slice(0, currentCardIndex.value)
})

// Methods
const nextCard = () => {
  if (currentCardIndex.value < selectedCards.value.length - 1) {
    currentCardIndex.value++
  }
}

const previousCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
  }
}

const endMemorization = () => {
  stopTimer(memorizationTimerInterval);
  
  // Create the memorized deck in the order they were viewed
  const memorizedDeck = selectedCards.value.map((card, index) => ({
    ...card,
    order: index + 1
  }))
  
  // Emit the memorized deck to parent
  emit('startReview', memorizedDeck);
}

const resetSession = () => {
  emit('reset-session');
  
}

onMounted(() => {
  // Generate deck based on props
  const savedSettings = loadFromStorage('cardDeckSession');
  const availableCards = getAvailableCards(savedSettings.deckSize);
  selectedCards.value = shuffleCards(availableCards).slice(0, savedSettings.cardsToMemorize);
  
  // Start timer
  memorizationTimer.value = savedSettings.memorizationTime;
  memorizationTimerInterval = startTimer(memorizationTimer, () => {
    endMemorization();
  })
})

onUnmounted(() => {
  if (memorizationTimerInterval) {
    stopTimer(memorizationTimerInterval)
  }
})
</script>

<style scoped>
.section {
  background-color: rgba(42, 42, 42, 0.95);
  border-radius: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 0 0 10px;
  margin-bottom: 0;
}

.section-title {
  margin: 0 0 20px;
  text-align: center;
  color: rgb(220, 220, 235);
  font-size: 18px;
}

.memorization-container {
  display: flex;
  gap: 30px;
  margin: 20px 0;
}

.cards-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 300px;
}

.current-card {
  width: 200px;
  min-height: 200px;
}

.memorized-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 140px;
  pointer-events: none;
}

.memorized-card {
  margin-left: -80px;
  pointer-events: none;
}

.memorized-card:first-child {
  margin-left: 0;
}

.card {
  width: 200px;
  aspect-ratio: 2.5/3.6;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.memorized-card .card {
  width: 100px;
  opacity: 1;
  transition: all 0.3s ease;
}

.timer-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  padding: 10px;
  border-bottom: 3px solid white;
  color: rgb(220, 220, 235);
}

.timer-area-buttons {
  display: flex;
  gap: 10px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin: 20px 0 10px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: box-shadow 0.3s ease, background 0.3s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: rgb(220, 220, 235);
}

.btn-primary:hover:not(:disabled) {
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
}
</style>

