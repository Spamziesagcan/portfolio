import { NavLink } from 'react-router-dom'
import {
  Home,
  Search,
  Library,
  Music,
  Disc,
  Briefcase,
  GitBranch as Github,
  Mail,
} from 'lucide-react'
import useConfetti from '../hooks/useConfetti'

function Sidebar({ className = '', onNavigate }) {
  const fireConfetti = useConfetti()

  const primaryNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/skills', label: 'Explore Skills', icon: Search },
    { to: '/projects', label: 'My Projects', icon: Library },
  ]

  const playlistItems = [
    { to: '/', label: 'About Me', icon: Music },
    { to: '/experience', label: 'Work Experience', icon: Briefcase },
    { to: '/projects', label: 'Open Source', icon: Github },
    { to: '/contact', label: 'Contact', icon: Mail, celebrate: true },
  ]

  const baseLinkClasses =
    'hoverable group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors'

  const getPrimaryNavClasses = ({ isActive }) =>
    [
      baseLinkClasses,
      isActive
        ? 'text-white'
        : 'text-[#B3B3B3] hover:text-white focus-visible:text-white',
    ].join(' ')

  const getPlaylistClasses = ({ isActive }) =>
    [
      'hoverable group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      isActive
        ? 'text-white'
        : 'text-[#B3B3B3] hover:text-white focus-visible:text-white',
    ].join(' ')

  return (
    <div className={`h-full w-full bg-[#121212] px-3 py-6 ${className}`}>
      <div className="px-3">
        <svg
          aria-label="Spotify"
          role="img"
          viewBox="0 0 24 24"
          className="h-9 w-9 fill-white"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12S18.628 0 12 0zm5.503 17.298a.747.747 0 01-1.028.246c-2.815-1.72-6.358-2.11-10.53-1.16a.748.748 0 11-.332-1.458c4.566-1.04 8.482-.597 11.643 1.333.35.214.46.675.247 1.04zm1.468-3.27a.936.936 0 01-1.287.309c-3.222-1.98-8.134-2.553-11.946-1.392a.937.937 0 11-.546-1.792c4.357-1.326 9.776-.684 13.473 1.588a.936.936 0 01.306 1.287zm.126-3.406C15.233 8.33 8.86 8.12 5.173 9.246a1.123 1.123 0 11-.658-2.147c4.23-1.294 11.262-1.043 15.757 1.626a1.122 1.122 0 11-1.175 1.897z" />
        </svg>
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        {primaryNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={getPrimaryNavClasses}
              onClick={onNavigate}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="my-5 border-t border-white/10" />

      <div className="px-3 text-xs font-semibold tracking-wide uppercase text-[#B3B3B3] flex items-center gap-2">
        <Disc className="h-5 w-5" strokeWidth={2} />
        <span>Playlists</span>
      </div>

      <nav className="mt-3 flex flex-col gap-1">
        {playlistItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={getPlaylistClasses}
              onClick={() => {
                if (item.celebrate) {
                  fireConfetti()
                }

                if (onNavigate) {
                  onNavigate()
                }
              }}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
