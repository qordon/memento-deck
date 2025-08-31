<template>
  <div class="section">
    <h2 class="section-title">Session Setup</h2>

    <div class="setup-form">
      <div class="form-group">
        <label class="form-label">Deck Size</label>
        <select v-model.number="localDeckSize" class="form-select">
          <option :value="36">36 Cards (6 to Ace)</option>
          <option :value="52">52 Cards (2 to Ace)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Cards to Memorize</label>
        <select v-model.number="localCardsToMemorize" class="form-select">
          <option v-for="n in availableCardOptions" :key="n" :value="n">{{ n }} Cards</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Memorization Time (seconds)</label>
        <input type="number" min="10" max="600" v-model.number="localMemorizationTime" class="form-input">
      </div>

      <div class="form-group">
        <label class="form-label">Recall Time (seconds)</label>
        <input type="number" min="10" max="600" v-model.number="localRecallTime" class="form-input">
      </div>
    </div>

    <div class="start-button-container">
      <button @click="startMemorization" class="btn btn-primary">Start Session</button>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import { useLocalStorage } from '../composables/useLocalStorage';

const { saveToStorage, loadFromStorage } = useLocalStorage();

const DEFAULT_SETTINGS = {
  deckSize: 36,
  cardsToMemorize: 12,
  memorizationTime: 120,
  recallTime: 240
};

const localDeckSize = ref(DEFAULT_SETTINGS.deckSize);
const localCardsToMemorize = ref(DEFAULT_SETTINGS.cardsToMemorize);
const localMemorizationTime = ref(DEFAULT_SETTINGS.memorizationTime);
const localRecallTime = ref(DEFAULT_SETTINGS.recallTime);

const emit = defineEmits([
  'startMemorization'
]);

const availableCardOptions = computed(() =>
  Array.from({ length: localDeckSize.value }, (_, i) => i + 1)
);

const startMemorization = () => {
  const settings = {
    deckSize: localDeckSize.value,
    cardsToMemorize: localCardsToMemorize.value,
    memorizationTime: localMemorizationTime.value,
    recallTime: localRecallTime.value
  };
  emit('startMemorization', settings);
};

watch([localDeckSize, localCardsToMemorize, localMemorizationTime, localRecallTime], () => {
  saveToStorage('cardDeckSession', {
    deckSize: localDeckSize.value,
    cardsToMemorize: localCardsToMemorize.value,
    memorizationTime: localMemorizationTime.value,
    recallTime: localRecallTime.value
  });
});

watch(localDeckSize, newSize => {
  if (localCardsToMemorize.value > newSize) {
    localCardsToMemorize.value = newSize;
  }
});

onMounted(() => {
  const savedSettings = loadFromStorage('cardDeckSession');
  Object.assign(DEFAULT_SETTINGS, savedSettings || {});
  localDeckSize.value = DEFAULT_SETTINGS.deckSize;
  localCardsToMemorize.value = DEFAULT_SETTINGS.cardsToMemorize;
  localMemorizationTime.value = DEFAULT_SETTINGS.memorizationTime;
  localRecallTime.value = DEFAULT_SETTINGS.recallTime;
});
</script>

<style scoped>
.section {
  background-color: rgba(42, 42, 42, 0.95);
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.section-title {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.setup-form {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  align-items: end;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: white;
}

.form-select, .form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-select:focus, .form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.start-button-container {
  margin-top: 20px;
  text-align: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}
</style>
