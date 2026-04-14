import { useEffect, useMemo, useState } from 'react'

const SEGMENT_COUNT = 180
const CANVAS_SIZE = 280
const CENTER = CANVAS_SIZE / 2
const INNER_RADIUS = 76
const MIN_LENGTH = 8
const MAX_LENGTH = 28

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function HeroWaveform({ isHovered = false, className = '' }) {
  const [animationTime, setAnimationTime] = useState(0)

  const segments = useMemo(
    () =>
      Array.from({ length: SEGMENT_COUNT }, (_, index) => {
        const progress = index / SEGMENT_COUNT
        const angle = progress * 360

        return {
          angle,
          hue: (progress * 360 + Math.random() * 16) % 360,
          phase: Math.random() * Math.PI * 2,
          secondaryPhase: Math.random() * Math.PI * 2,
          speed: 0.55 + Math.random() * 0.65,
          secondarySpeed: 0.75 + Math.random() * 0.7,
          baseLength: 10 + Math.random() * 12,
          amplitude: 6 + Math.random() * 12,
          opacity: 0.72 + Math.random() * 0.28,
        }
      }),
    [],
  )

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
  const overallPulse = 1 + Math.sin(animationTime / 1100) * 0.015 + (isHovered ? 0.03 : 0)
  const ringOpacity = isHovered ? 0.72 : 0.2

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-[0.15]'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <filter id="hero-waveform-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${CENTER} ${CENTER}) scale(${overallPulse})`}>
          {segments.map((segment, index) => {
            const primaryWave = Math.sin(waveTime * segment.speed + segment.phase)
            const secondaryWave = Math.sin(waveTime * segment.secondarySpeed + segment.secondaryPhase)
            const liquidWobble = Math.sin(waveTime * 0.8 + index * 0.09) * 3.5
            const spokeLength = clamp(
              segment.baseLength + primaryWave * segment.amplitude + secondaryWave * 3.8 + liquidWobble,
              MIN_LENGTH,
              MAX_LENGTH,
            )
            const sweepHue = (segment.hue + waveTime * 24) % 360
            const color = `hsl(${sweepHue}, 100%, ${isHovered ? 70 : 62}%)`
            const glowColor = `hsla(${sweepHue}, 100%, 72%, ${ringOpacity * 0.85})`

            return (
              <g key={index} transform={`rotate(${segment.angle})`}>
                <line
                  x1={0}
                  y1={-(INNER_RADIUS + 10)}
                  x2={0}
                  y2={-(INNER_RADIUS + 10 + spokeLength)}
                  stroke={glowColor}
                  strokeLinecap="round"
                  strokeWidth={4.4}
                  filter="url(#hero-waveform-glow)"
                />
                <line
                  x1={0}
                  y1={-(INNER_RADIUS + 10)}
                  x2={0}
                  y2={-(INNER_RADIUS + 10 + spokeLength)}
                  stroke={color}
                  strokeOpacity={segment.opacity}
                  strokeLinecap="round"
                  strokeWidth={1.8}
                />
              </g>
            )
          })}
        </g>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS + 10}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

export default HeroWaveform
