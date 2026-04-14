import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'
import useScrollProgress from '../hooks/useScrollProgress'
import AudioVisualizer from './AudioVisualizer'

const routeOrder = ['/', '/projects', '/skills', '/experience', '/contact']

const pageMeta = {
  '/': {
    title: 'About Me',
    thumbnail: 'from-[#6D28D9] via-[#4338CA] to-[#1D4ED8]',
  },
  '/projects': {
    title: 'My Projects',
    thumbnail: 'from-[#0EA5E9] via-[#0284C7] to-[#0369A1]',
  },
  '/skills': {
    title: 'Explore Skills',
    thumbnail: 'from-[#22C55E] via-[#16A34A] to-[#166534]',
  },
  '/experience': {
    title: 'Experience',
    thumbnail: 'from-[#F97316] via-[#EA580C] to-[#C2410C]',
  },
  '/contact': {
    title: 'Contact',
    thumbnail: 'from-[#EC4899] via-[#DB2777] to-[#9D174D]',
  },
}

function PlayerBar({ scrollContainerRef }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [volume, setVolume] = useState(65)
  const { progress, isPlaying, togglePlay } = useScrollProgress(scrollContainerRef)

  const currentPath = useMemo(() => {
    if (routeOrder.includes(location.pathname)) return location.pathname
    return '/'
  }, [location.pathname])

  const currentIndex = routeOrder.indexOf(currentPath)
  const previousPath = routeOrder[(currentIndex - 1 + routeOrder.length) % routeOrder.length]
  const nextPath = routeOrder[(currentIndex + 1) % routeOrder.length]

  const currentPage = pageMeta[currentPath]

  const scrollPercent = Math.round(progress * 100)

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 h-[72px] border-t border-[#282828] bg-[#181818] px-4 md:bottom-0 md:h-[90px] md:px-6">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4">
        <section className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className={[
              'h-14 w-14 shrink-0 rounded-md bg-gradient-to-br animate-[spin_8s_linear_infinite]',
              currentPage.thumbnail,
            ].join(' ')}
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            aria-hidden="true"
          />

          <AudioVisualizer isPlaying={isPlaying} height={20} barCount={12} />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentPage.title}</p>
            <p className="truncate text-xs text-[#B3B3B3]">Your Name</p>
          </div>

          <button
            type="button"
            aria-label="Like current track"
            className="hidden md:block text-[#B3B3B3] transition-colors hover:text-white"
          >
            <Heart className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={togglePlay}
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black md:hidden"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
        </section>

        <section className="hidden w-full max-w-xl flex-col items-center justify-center gap-2 md:flex">
          <div className="relative w-full overflow-hidden rounded-full">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center overflow-hidden">
              <AudioVisualizer isPlaying={isPlaying} height={60} opacity={0.3} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-4 text-[#B3B3B3]">
                <button type="button" aria-label="Shuffle" className="hover:text-white">
                  <Shuffle className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Previous section"
                  className="hover:text-white"
                  onClick={() => navigate(previousPath)}
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  onClick={togglePlay}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
                <button
                  type="button"
                  aria-label="Next section"
                  className="hover:text-white"
                  onClick={() => navigate(nextPath)}
                >
                  <SkipForward className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Repeat" className="hover:text-white">
                  <Repeat className="h-4 w-4" />
                </button>
              </div>

              <div className="flex w-full items-center gap-2 text-[11px] text-[#B3B3B3]">
                <span className="w-8 text-right">{scrollPercent}%</span>
                <div className="relative h-1 flex-1 rounded-full bg-white/20">
                  <div
                    className="relative h-1 rounded-full bg-[#1DB954]"
                    style={{ width: `${progress * 100}%` }}
                  >
                    <span className="absolute -right-1.5 -top-1 h-3 w-3 rounded-full bg-[#1DB954]" />
                  </div>
                </div>
                <span className="w-10 text-left">100%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden flex-1 items-center justify-end gap-2 lg:flex">
          <Volume2 className="h-4 w-4 text-[#B3B3B3]" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-1 w-24 cursor-pointer accent-[#1DB954]"
            aria-label="Volume"
          />
          <p className="ml-2 text-xs text-[#B3B3B3]">Now Playing: {currentPath}</p>
        </section>
      </div>
    </div>
  )
}

export default PlayerBar
