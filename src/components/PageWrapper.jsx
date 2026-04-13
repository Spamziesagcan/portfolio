import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

function PageWrapper({ className, children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
