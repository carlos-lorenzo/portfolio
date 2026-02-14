import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { scroller } from 'react-scroll'
import styles from './Hero.module.css'
import waveStyles from './WaveformVisual.module.css'

import Social from './Social'

const WaveformVisual = lazy(() => import('./WaveformVisual'))

const adjectives = ['Robust', 'Scalable', 'Reliable', 'Elegant', 'Precise']

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const cycle = useCallback(() => {
    setIndex(prev => (prev + 1) % adjectives.length)
  }, [])

  useEffect(() => {
    const id = setInterval(cycle, 2800)
    return () => clearInterval(id)
  }, [cycle])

  return (
  <div id={styles.hero} ref={heroRef}>
    {/* Animated blob background */}
    <motion.div
      className={styles.blob}
      animate={{
        x: ['-6%', '6%', '-6%'],
        y: ['-2%', '4%', '-2%'],
        scale: [1.02, 1.06, 1.02],
        rotate: [-2, 2, -2],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className={styles.left}>
      <motion.div
        id={styles.description}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.tag} variants={fadeUp}>
          <h5>WELCOME TO MY TERMINAL</h5>
        </motion.div>

        <motion.h1 variants={fadeUp}>
          Building{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={adjectives[index]}
              className={styles.adjective}
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {adjectives[index]}
            </motion.span>
          </AnimatePresence>
          <br />Systems
        </motion.h1>

        <motion.p variants={fadeUp}>
          I'm <b>Carlos Lorenzo-Zúñiga Marí</b> — biomedical engineer, systems architect, and builder of things that bridge biology and code.
        </motion.p>

        <motion.div className={styles.actions} variants={fadeUp}>
          <motion.button
            className={styles.launch}
            onClick={() =>
              scroller.scrollTo('about-section', {
                smooth: true,
                duration: 600,
                offset: -20,
              })
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Launch terminal and go to next section"
          >
            <span className={styles.launchIcon}>▶</span>
            Launch Terminal
          </motion.button>
          <Social />
        </motion.div>
      </motion.div>
    </div>

    <div className={styles.right}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
      >
        <Suspense fallback={<div className={waveStyles.placeholder} />}>
          <WaveformVisual heroRef={heroRef} />
        </Suspense>
      </motion.div>
    </div>
  </div>
  )
}
