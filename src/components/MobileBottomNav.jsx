import { Home, Library, Search, UserRound, Layers } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import useConfetti from '../hooks/useConfetti'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/skills', label: 'Search', icon: Search },
  { to: '/experience', label: 'Library', icon: Library },
  { to: '/projects', label: 'Projects', icon: Layers },
  { to: '/contact', label: 'Profile', icon: UserRound },
]

function MobileBottomNav() {
  const fireConfetti = useConfetti()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-[#282828] bg-[#121212] md:hidden">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => {
                if (item.to === '/contact') {
                  fireConfetti()
                }
              }}
              className={({ isActive }) =>
                [
                  'hoverable flex flex-col items-center justify-center gap-1 text-[11px] transition-colors',
                  isActive ? 'text-white' : 'text-[#B3B3B3] hover:text-white',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileBottomNav
