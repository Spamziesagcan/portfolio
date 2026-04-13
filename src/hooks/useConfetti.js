import { useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

const confettiColors = ['#1DB954', '#FFFFFF', '#B3B3B3']

function useConfetti() {
  const timerRef = useRef(null)

  const fireConfetti = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }

    const duration = 1200
    const end = Date.now() + duration

    confetti({
      particleCount: 40,
      spread: 55,
      startVelocity: 42,
      origin: { x: 0.5, y: 0.7 },
      colors: confettiColors,
      zIndex: 9999,
    })

    timerRef.current = window.setInterval(() => {
      const timeLeft = end - Date.now()
      if (timeLeft <= 0) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
        return
      }

      confetti({
        particleCount: Math.max(12, Math.floor((timeLeft / duration) * 40)),
        spread: 75,
        startVelocity: 32,
        ticks: 60,
        origin: { x: 0.5, y: 0.75 },
        colors: confettiColors,
        zIndex: 9999,
      })
    }, 180)
  }, [])

  return fireConfetti
}

export default useConfetti
