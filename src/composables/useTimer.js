export function useTimer() {
  const startTimer = (timerRef, onComplete) => {
    const interval = setInterval(() => {
      if (timerRef.value > 0) {
        timerRef.value--
      } else {
        clearInterval(interval)
        if (onComplete) onComplete()
      }
    }, 1000)
    
    return interval
  }

  const stopTimer = (interval) => {
    if (interval) {
      clearInterval(interval)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const pauseTimer = (interval) => {
    // This could be implemented for future pause functionality
    return interval
  }

  const resumeTimer = (timerRef, onComplete) => {
    // This could be implemented for future resume functionality
    return startTimer(timerRef, onComplete)
  }

  return {
    startTimer,
    stopTimer,
    formatTime,
    pauseTimer,
    resumeTimer
  }
}
