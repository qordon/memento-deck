<template>
  <div class="container">
    <header class="header">
      <h1>🎴 Memento Deck</h1>
    </header>

    <main class="content">
      <router-view 

        @start-memorization="startMemorization"
        @reset-session="resetSession"
        @start-review="startReview"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from './composables/useLocalStorage';

// Router
const router = useRouter();
const { saveToStorage, loadFromStorage, removeFromStorage } = useLocalStorage();

// Base parameters
const deckSize = ref(36);
const cardsToMemorize = ref(12);
const memorizationTime = ref(60);
const recallTime = ref(120);

// Save current session settings
const saveSessionSettings = (data) => {
  const settings = data || {
    deckSize: deckSize.value,
    cardsToMemorize: cardsToMemorize.value,
    memorizationTime: memorizationTime.value,
    recallTime: recallTime.value,
  };
  saveToStorage('cardDeckSession', settings);
};

// Load saved session settings
const loadSessionSettings = () => {
  const saved = loadFromStorage('cardDeckSession');
  if (!saved) return;
  deckSize.value = saved.deckSize || 36;
  cardsToMemorize.value = saved.cardsToMemorize || 12;
  memorizationTime.value = saved.memorizationTime || 60;
  recallTime.value = saved.recallTime || 120;
};

// Navigation actions
const startMemorization = (data) => {
  saveSessionSettings(data);
  removeFromStorage('memorizedDeck');
  router.push('/memorization');
};

const resetSession = () => {
  removeFromStorage('memorizedDeck');
  router.push('/');
};

const startReview = (memorizedDeck) => {
  saveToStorage('memorizedDeck', memorizedDeck);
  router.push('/review');
};

onMounted(loadSessionSettings);

</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: rgb(18, 18, 30);
  padding: 0;
}

.header {
  text-align: left;
  margin-bottom: 20px;
  padding: 10px;
}

.header h1 {
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}


.content {
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(42, 42, 42, 0.95);
}
</style>
