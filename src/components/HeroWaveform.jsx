import { useEffect, useState } from 'react'

const CANVAS_SIZE = 320

function HeroWaveform({ isHovered = false, className = '' }) {
  const [animationTime, setAnimationTime] = useState(0)

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

  const rotation = animationTime * 0.03
  const wobble = Math.sin(animationTime / 850) * 1.4
  const pulse = 1 + Math.sin(animationTime / 1200) * 0.012 + (isHovered ? 0.018 : 0)

  const spectrumStyle = {
    background: `conic-gradient(from ${rotation}deg,
      #ff2bb5 0deg,
      #9b5cff 42deg,
      #33c3ff 86deg,
      #20e3b2 130deg,
      #b7ff3d 166deg,
      #ffd93d 206deg,
      #ff9f1a 248deg,
      #ff4d6d 302deg,
      #ff2bb5 360deg)`,
  }

  const ringMask =
    'radial-gradient(circle at center, transparent 0 44%, black 46% 56%, transparent 58%)'
  const glowMask =
    'radial-gradient(circle at center, transparent 0 40%, black 42% 60%, transparent 62%)'

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible transition-opacity duration-300 ${
        isHovered ? 'opacity-60' : 'opacity-[0.18]'
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          ...spectrumStyle,
          WebkitMask: glowMask,
          mask: glowMask,
          transform: `scale(${1.04 * pulse}) rotate(${wobble}deg)`,
          opacity: isHovered ? 0.5 : 0.28,
          filter: 'saturate(1.7) brightness(1.15)',
          mixBlendMode: 'screen',
        }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          ...spectrumStyle,
          WebkitMask: ringMask,
          mask: ringMask,
          transform: `scale(${pulse}) rotate(${wobble}deg)`,
          filter: 'saturate(1.9) brightness(1.08)',
          mixBlendMode: 'screen',
        }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.13)',
          opacity: isHovered ? 0.78 : 0.52,
        }}
      />
    </div>
  )
}

export default HeroWaveform
          const spiralTwist = Math.sin(waveTime * 0.35 + index * 0.1) * 4
