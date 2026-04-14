import { useEffect, useMemo, useState } from 'react'

const BAR_COUNT = 200
const BAR_WIDTH = 2.25
const CANVAS_SIZE = 320
const CENTER = CANVAS_SIZE / 2
const INNER_RADIUS = 108

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function HeroWaveform({ isHovered = false, className = '' }) {
  const [animationTime, setAnimationTime] = useState(0)

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, index) => {
      const progress = index / (BAR_COUNT - 1)

      const baseHeight = 10 + Math.random() * 16
      const amplitude = 10 + Math.random() * 16
      const secondaryAmplitude = 3 + Math.random() * 6
      const phase = progress * Math.PI * 2.2 + Math.random() * Math.PI * 2
      const secondaryPhase = Math.random() * Math.PI * 2
      const speed = 0.32 + Math.random() * 0.55
      const secondarySpeed = speed * (1.45 + Math.random() * 0.45)
      const opacity = 0.68 + Math.random() * 0.32
      const angle = (index / BAR_COUNT) * 360
      const hue = (index / BAR_COUNT) * 360

      return {
        baseHeight,
        amplitude,
        secondaryAmplitude,
        phase,
        secondaryPhase,
        speed,
        secondarySpeed,
        opacity,
        angle,
        hue,
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

  const waveTime = animationTime / 1000

  return (
    <div
      className={`pointer-events-none absolute inset-0 w-full overflow-hidden transition-opacity duration-300 ${
        isHovered ? 'opacity-40' : 'opacity-[0.15]'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full overflow-visible"
      >
        {bars.map((bar, index) => {
          const swell = Math.sin(waveTime * bar.speed + bar.phase)
          const secondarySwell = Math.sin(waveTime * bar.secondarySpeed + bar.secondaryPhase)
          const hoverMultiplier = isHovered ? 1.12 : 1
          const barHeight = clamp(
            bar.baseHeight + swell * bar.amplitude * hoverMultiplier + secondarySwell * bar.secondaryAmplitude * hoverMultiplier,
            8,
            34,
          )
          const color = `hsl(${bar.hue}, 100%, 62%)`

          return (
            <g
              key={index}
              transform={`translate(${CENTER} ${CENTER}) rotate(${bar.angle})`}
            >
              <line
                x1={0}
                y1={-INNER_RADIUS}
                x2={0}
                y2={-INNER_RADIUS - barHeight}
                stroke={color}
                strokeOpacity={bar.opacity}
                strokeLinecap="round"
                strokeWidth={BAR_WIDTH}
                style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.08))' }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default HeroWaveform
