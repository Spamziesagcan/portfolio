import { useEffect, useMemo, useState } from 'react'

const BAR_COUNT = 200
const BAR_WIDTH = 2.25
const CANVAS_SIZE = 320
const CENTER = CANVAS_SIZE / 2
const INNER_RADIUS = 84

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function HeroWaveform({ isHovered = false, className = '' }) {
  const [animationTime, setAnimationTime] = useState(0)

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, index) => {
      const progress = index / (BAR_COUNT - 1)

      const baseHeight = 12 + Math.random() * 18
      const amplitude = 10 + Math.random() * 18
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
  const hueShift = waveTime * 28

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
        <defs>
          <filter id="hero-waveform-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {bars.map((bar, index) => {
          const swell = Math.sin(waveTime * bar.speed + bar.phase)
          const secondarySwell = Math.sin(waveTime * bar.secondarySpeed + bar.secondaryPhase)
          const hoverMultiplier = isHovered ? 1.12 : 1
          const radialWobble = Math.sin(waveTime * 0.9 + bar.phase) * 5
          const spiralTwist = Math.sin(waveTime * 0.35 + index * 0.1) * 4
          const barHeight = clamp(
            bar.baseHeight + swell * bar.amplitude * hoverMultiplier + secondarySwell * bar.secondaryAmplitude * hoverMultiplier,
            8,
            34,
          )
          const color = `hsl(${(bar.hue + hueShift) % 360}, 100%, ${isHovered ? 70 : 62}%)`
          const glowColor = `hsl(${(bar.hue + hueShift + 10) % 360}, 100%, 72%)`

          return (
            <g
              key={index}
              transform={`translate(${CENTER} ${CENTER}) rotate(${bar.angle + spiralTwist}) translate(0 ${-(INNER_RADIUS + radialWobble)})`}
            >
              <line
                x1={0}
                y1={-barHeight}
                x2={0}
                y2={0}
                stroke={glowColor}
                strokeOpacity={bar.opacity * 0.22}
                strokeLinecap="round"
                strokeWidth={BAR_WIDTH * 3.15}
                filter="url(#hero-waveform-glow)"
              />
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
