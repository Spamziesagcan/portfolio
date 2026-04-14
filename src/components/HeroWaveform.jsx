import { useEffect, useMemo, useState } from 'react'

const BAR_COUNT = 200
const PLAYHEAD_DURATION_MS = 8000
const BAR_WIDTH = 0.7
const SVG_HEIGHT = 100

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function HeroWaveform({ isHovered = false, className = '' }) {
  const [animationTime, setAnimationTime] = useState(0)

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, index) => {
      const progress = index / (BAR_COUNT - 1)

      const baseHeight = 18 + Math.random() * 26
      const amplitude = 9 + Math.random() * 20
      const secondaryAmplitude = 3 + Math.random() * 8
      const phase = progress * Math.PI * 1.5 + Math.random() * Math.PI * 2
      const secondaryPhase = Math.random() * Math.PI * 2
      const speed = 0.55 + Math.random() * 0.75
      const secondarySpeed = speed * (1.55 + Math.random() * 0.35)

      return {
        baseHeight,
        amplitude,
        secondaryAmplitude,
        phase,
        secondaryPhase,
        speed,
        secondarySpeed,
        opacity: 0.75 + Math.random() * 0.25,
      }
    })
  }, [])

  useEffect(() => {
    let rafId = 0
    const startTime = performance.now()

    const frame = () => {
      setAnimationTime(performance.now() - startTime)
      rafId = window.requestAnimationFrame(frame)
    }

    rafId = window.requestAnimationFrame(frame)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  const playheadProgress = (animationTime % PLAYHEAD_DURATION_MS) / PLAYHEAD_DURATION_MS
  const activeBarIndex = Math.floor(playheadProgress * BAR_COUNT)
  const waveTime = animationTime / 1000

  return (
    <div
      className={`pointer-events-none absolute inset-0 w-full overflow-hidden transition-opacity duration-300 ${
        isHovered ? 'opacity-40' : 'opacity-[0.15]'
      } ${className}`}
      aria-hidden="true"
    >
      <style>{`
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
          const swell = Math.sin(waveTime * bar.speed + bar.phase)
          const secondarySwell = Math.sin(waveTime * bar.secondarySpeed + bar.secondaryPhase)
          const hoverMultiplier = isHovered ? 1.12 : 1
          const barHeight = clamp(
            bar.baseHeight + swell * bar.amplitude * hoverMultiplier + secondarySwell * bar.secondaryAmplitude * hoverMultiplier,
            6,
            SVG_HEIGHT - 6,
          )
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
                transition: 'fill 120ms linear',
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
