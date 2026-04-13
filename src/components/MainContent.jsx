import { motion } from 'framer-motion'
import PageWrapper from './PageWrapper'

function MainContent({ title, description }) {
  return (
    <PageWrapper className="h-full p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-3 text-sm text-spotify-light">{description}</p>
      <div className="mt-6 space-y-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            className="h-20 rounded-lg bg-spotify-card/70 border border-white/5"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        ))}
      </div>
    </PageWrapper>
  )
}

export default MainContent
