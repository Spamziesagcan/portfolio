import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const INNER_SIZE = 10
const OUTER_SIZE = 32
const HOVER_SIZE = 60
const PRESS_SCALE = 0.7
const PARTICLE_COUNT = 8
const MAX_PARTICLES = 20
const PARTICLE_SIZE = 4
const PARTICLE_DISTANCE_MIN = 30
const PARTICLE_DISTANCE_MAX = 60
const PARTICLE_LIFETIME_MS = 500

function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [particles, setParticles] = useState([])
  const pressTimerRef = useRef(null)
  const activeParticlesRef = useRef([])
  const particleIdRef = useRef(0)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18 })

  const innerX = useTransform(mouseX, (value) => value - INNER_SIZE / 2)
  const innerY = useTransform(mouseY, (value) => value - INNER_SIZE / 2)
  const outerX = useTransform(springX, (value) => value - OUTER_SIZE / 2)
  const outerY = useTransform(springY, (value) => value - OUTER_SIZE / 2)

  const removeParticle = useCallback((particleId) => {
    activeParticlesRef.current = activeParticlesRef.current.filter(
      (particle) => particle.id !== particleId,
    )
    setParticles((currentParticles) =>
      currentParticles.filter((particle) => particle.id !== particleId),
    )
  }, [])

  const spawnParticles = useCallback(
    (clientX, clientY) => {
      const availableSlots = MAX_PARTICLES - activeParticlesRef.current.length
      const particleTotal = Math.min(PARTICLE_COUNT, availableSlots)

      if (particleTotal <= 0) {
        return
      }

      const spawnedParticles = Array.from({ length: particleTotal }, () => {
        const angle = Math.random() * Math.PI * 2
        const distance =
          PARTICLE_DISTANCE_MIN + Math.random() * (PARTICLE_DISTANCE_MAX - PARTICLE_DISTANCE_MIN)
        const travelX = Math.cos(angle) * distance
        const travelY = Math.sin(angle) * distance

        return {
          id: particleIdRef.current += 1,
          x: clientX - PARTICLE_SIZE / 2,
          y: clientY - PARTICLE_SIZE / 2,
          travelX,
          travelY,
          color: Math.random() < 0.5 ? '#1DB954' : '#FFFFFF',
        }
      })

      activeParticlesRef.current = [...activeParticlesRef.current, ...spawnedParticles]
      setParticles((currentParticles) => [...currentParticles, ...spawnedParticles])
    },
    [],
  )

  useEffect(() => {
    setMounted(true)

    const handlePointerMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      setIsVisible(true)

      if (event.target instanceof Element) {
        setIsHovered(Boolean(event.target.closest('.hoverable')))
      } else {
        setIsHovered(false)
      }
    }

    const releasePress = () => {
      if (pressTimerRef.current) {
        window.clearTimeout(pressTimerRef.current)
        pressTimerRef.current = null
      }

      setIsPressed(false)
    }

    const handlePointerDown = (event) => {
      if (event.button !== 0) {
        return
      }

      if (pressTimerRef.current) {
        window.clearTimeout(pressTimerRef.current)
      }

      setIsPressed(true)
      spawnParticles(event.clientX, event.clientY)
      pressTimerRef.current = window.setTimeout(() => {
        setIsPressed(false)
        pressTimerRef.current = null
      }, 140)
    }

    const handlePointerLeave = () => {
      setIsHovered(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', releasePress)
    window.addEventListener('pointercancel', releasePress)
    document.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', releasePress)
      window.removeEventListener('pointercancel', releasePress)
      document.removeEventListener('mouseleave', handlePointerLeave)

      if (pressTimerRef.current) {
        window.clearTimeout(pressTimerRef.current)
      }

      activeParticlesRef.current = []
    }
  }, [mouseX, mouseY, spawnParticles])

  useEffect(() => {
    return () => {
      activeParticlesRef.current = []
      setParticles([])
    }
  }, [])

  if (!mounted) {
    return null
  }

  const hoverScale = isHovered ? HOVER_SIZE / OUTER_SIZE : 1
  const pressScale = isPressed ? PRESS_SCALE : 1
  const combinedOuterScale = hoverScale * pressScale
  const combinedInnerScale = pressScale

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <AnimatePresence initial={false}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed left-0 top-0 h-[4px] w-[4px] rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
            }}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: [1, 0.9, 0],
              scale: [1, 0.88, 0],
              x: particle.travelX,
              y: particle.travelY,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: PARTICLE_LIFETIME_MS / 1000, ease: 'easeOut' }}
            onAnimationComplete={() => removeParticle(particle.id)}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed left-0 top-0 h-[10px] w-[10px] rounded-full bg-[#1DB954]"
        style={{ x: innerX, y: innerY }}
        animate={{ scale: combinedInnerScale, opacity: isVisible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      />

      <motion.div
        className="fixed left-0 top-0 h-[32px] w-[32px] rounded-full border-[1.5px] border-[#1DB954]"
        style={{ x: outerX, y: outerY }}
        animate={{
          scale: combinedOuterScale,
          opacity: isVisible ? (isHovered ? 0.4 : 0.6) : 0,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      />
    </div>,
    document.body,
  )
}

export default CustomCursor
