import { useEffect, useMemo, useState } from 'react'

const BAR_COUNT = 200
const PLAYHEAD_DURATION_MS = 8000
const BAR_GAP = 1
const BAR_WIDTH = 0.7
const SVG_HEIGHT = 100

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function HeroWaveform({ isHovered = false, className = '' }) {
  const [playheadProgress, setPlayheadProgress] = useState(0)
  const [isIntroDone, setIsIntroDone] = useState(false)

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, index) => {
      const progress = index / (BAR_COUNT - 1)
      const sineWave = Math.sin(progress * Math.PI * 4.4 - Math.PI / 2)
      const detailWave = Math.sin(progress * Math.PI * 13.2 + 1.15)
      const randomLift = Math.random() * 0.22
      const envelope = 0.28 + Math.sin(progress * Math.PI) * 0.72

      const normalized = clamp(
        envelope * 0.52 + (sineWave * 0.5 + 0.5) * 0.3 + (detailWave * 0.5 + 0.5) * 0.18 + randomLift,
        0.08,
        1,
      )

      return {
        height: 12 + Math.round(normalized * 84),
        delay: index * 5,
      }
    })
  }, [])

  useEffect(() => {
    const startTime = performance.now()

    const updatePlayhead = () => {
      const elapsed = (performance.now() - startTime) % PLAYHEAD_DURATION_MS
      setPlayheadProgress(elapsed / PLAYHEAD_DURATION_MS)
    }

    updatePlayhead()
    const intervalId = window.setInterval(updatePlayhead, 32)
    const introTimerId = window.setTimeout(() => {
      setIsIntroDone(true)
    }, 1400)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(introTimerId)
    }
  }, [])

  const activeBarIndex = Math.floor(playheadProgress * BAR_COUNT)

  return (
    <div
      className={`pointer-events-none absolute inset-0 w-full overflow-hidden transition-opacity duration-300 ${
        isHovered ? 'opacity-40' : 'opacity-[0.15]'
      } ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes hero-waveform-rise {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }

        @keyframes hero-waveform-pulse {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.08);
          }
        }

        @keyframes hero-waveform-playhead {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100% - 2px));
          }
        }
      `}</style>

      <svg
        viewBox={`0 0 ${BAR_COUNT} ${SVG_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {bars.map((bar, index) => {
          const barHeight = bar.height
          const x = index + (1 - BAR_WIDTH) / 2
          const isPlayed = index <= activeBarIndex

          return (
            <rect
              key={index}
              x={x}
              y={SVG_HEIGHT - barHeight}
              width={BAR_WIDTH}
              height={barHeight}
              rx="0.35"
              fill={isPlayed ? '#FFFFFF' : '#535353'}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
                animation: isHovered
                  ? 'hero-waveform-pulse 1.4s ease-in-out infinite'
                  : !isIntroDone
                    ? `hero-waveform-rise 700ms ease-out ${bar.delay}ms forwards`
                    : 'none',
              }}
            />
          )
        })}
      </svg>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/60"
        style={{ animation: `hero-waveform-playhead ${PLAYHEAD_DURATION_MS}ms linear infinite` }}
      />
    </div>
  )
}

export default HeroWaveform
