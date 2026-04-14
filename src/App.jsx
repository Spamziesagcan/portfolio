import { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import PlayerBar from './components/PlayerBar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import MobileBottomNav from './components/MobileBottomNav'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'

function App() {
  const mainScrollRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <>
        <style>{`* { cursor: none !important; }`}</style>
        <CustomCursor />
        <LoadingScreen />
      </>
    )
  }

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <CustomCursor />

      <BrowserRouter>
        <div className="h-screen bg-[#121212] text-white flex flex-col">
        <section className="flex-1 min-h-0 flex flex-row bg-[#121212]">
          <aside className="hidden lg:block w-[240px] shrink-0 bg-[#121212] border-r border-white/10">
            <Sidebar />
          </aside>

          <aside
            className={[
              'fixed inset-y-0 left-0 z-40 w-[240px] border-r border-white/10 bg-[#121212] transition-transform duration-300 lg:hidden',
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}
          >
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </aside>

          {isSidebarOpen ? (
            <button
              type="button"
              aria-label="Close sidebar overlay"
              className="fixed inset-0 z-30 bg-black/40 md:block lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          ) : null}

          <main
            id="app-main-scroll"
            ref={mainScrollRef}
            className="flex-1 min-w-0 overflow-y-auto bg-[#121212]"
          >
            <div className="sticky top-0 z-20 hidden md:flex lg:hidden items-center justify-between border-b border-white/10 bg-[#121212]/95 px-4 py-3 backdrop-blur">
              <button
                type="button"
                aria-label="Open sidebar"
                onClick={() => setIsSidebarOpen(true)}
                className="hoverable inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-sm text-white"
              >
                <Menu className="h-4 w-4" />
                Menu
              </button>
              {isSidebarOpen ? (
                <button
                  type="button"
                  aria-label="Close sidebar"
                  onClick={() => setIsSidebarOpen(false)}
                  className="hoverable inline-flex rounded-md border border-white/15 p-2 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/projects"
                element={<Projects />}
              />
              <Route
                path="/skills"
                element={
                  <MainContent
                    title="Skills"
                    description="Skills grouped as music genres."
                  />
                }
              />
              <Route
                path="/experience"
                element={<Experience />}
              />
              <Route
                path="/contact"
                element={
                  <MainContent
                    title="Contact"
                    description="Get in touch and collaborate."
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </section>

          <footer className="h-[136px] md:h-[90px] shrink-0">
            <PlayerBar scrollContainerRef={mainScrollRef} />
          </footer>

          <MobileBottomNav />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
