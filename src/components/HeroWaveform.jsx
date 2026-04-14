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

      const scaleLow = clamp(0.76 + Math.random() * 0.08, 0.72, 0.86)
      const scaleHigh = clamp(1.02 + Math.random() * 0.1, 1.02, 1.16)

      return {
        height: 12 + Math.round(normalized * 84),
        delay: index * 5,
        waveDelay: -index * 38,
        waveDuration: 3600 + Math.random() * 1800,
        scaleLow,
        scaleHigh,
        opacity: 0.75 + Math.random() * 0.25,
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

    return () => {
      window.clearInterval(intervalId)
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
        @keyframes hero-waveform-swell {
          0%,
          100% {
            transform: scaleY(var(--wave-scale-low));
          }
          50% {
            transform: scaleY(var(--wave-scale-high));
          }
        }

        @keyframes hero-waveform-swell-hover {
          0%,
          100% {
            transform: scaleY(var(--wave-scale-hover-low));
          }
          50% {
            transform: scaleY(var(--wave-scale-hover-high));
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
                '--wave-scale-low': bar.scaleLow,
                '--wave-scale-high': bar.scaleHigh,
                '--wave-scale-hover-low': Math.max(0.7, bar.scaleLow - 0.04),
                '--wave-scale-hover-high': bar.scaleHigh + 0.06,
                animation: isHovered
                  ? `hero-waveform-swell-hover ${Math.round(bar.waveDuration * 0.82)}ms ease-in-out infinite`
                  : `hero-waveform-swell ${Math.round(bar.waveDuration)}ms ease-in-out infinite`,
                animationDelay: `${bar.waveDelay}ms`,
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
