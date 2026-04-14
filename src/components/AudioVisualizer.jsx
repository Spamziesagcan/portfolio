import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const BAR_COUNT = 28
const COLLAPSED_HEIGHT = 4
const HOVER_BURST_DURATION = 350

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min, max, precision = 2) {
  return Number((Math.random() * (max - min) + min).toFixed(precision))
}

function AudioVisualizer({ isPlaying, height = 40, color = '#1DB954' }) {
  const trackHeight = Math.max(COLLAPSED_HEIGHT, height)
  const [isBursting, setIsBursting] = useState(false)
  const burstTimerRef = useRef(null)

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, () => ({
        peakHeight: randomBetween(COLLAPSED_HEIGHT, trackHeight),
        duration: randomFloat(0.4, 1.2),
        opacity: randomFloat(0.72, 1),
        delay: randomFloat(0, 0.25),
      })),
    [trackHeight],
  )

  const triggerBurst = useCallback(() => {
    if (burstTimerRef.current) {
      window.clearTimeout(burstTimerRef.current)
    }

    setIsBursting(true)
    burstTimerRef.current = window.setTimeout(() => {
      setIsBursting(false)
      burstTimerRef.current = null
    }, HOVER_BURST_DURATION)
  }, [])

  useEffect(() => {
    return () => {
      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      className="inline-flex items-end gap-[2px]"
      style={{ height: trackHeight }}
      onMouseEnter={triggerBurst}
      onFocus={triggerBurst}
      aria-hidden="true"
    >
      {bars.map((bar, index) => {
        const animateHeight = isBursting
          ? [COLLAPSED_HEIGHT, trackHeight, COLLAPSED_HEIGHT]
          : isPlaying
            ? [COLLAPSED_HEIGHT, bar.peakHeight, COLLAPSED_HEIGHT]
            : COLLAPSED_HEIGHT

        const transition = isBursting
          ? {
              duration: 0.32,
              ease: 'easeOut',
            }
          : isPlaying
            ? {
                duration: bar.duration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: bar.delay,
              }
            : {
                duration: 0.2,
                ease: 'easeOut',
              }

        return (
          <motion.div
            key={index}
            initial={false}
            animate={{ height: animateHeight }}
            transition={transition}
            className="w-[3px] rounded-[1px]"
            style={{
              backgroundColor: color,
              opacity: bar.opacity,
              height: COLLAPSED_HEIGHT,
            }}
          />
        )
      })}
    </div>
  )
}

export default AudioVisualizer
