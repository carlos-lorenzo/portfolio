import { useRef, lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { scroller } from 'react-scroll'
import styles from './Hero.module.css'
import waveStyles from './WaveformVisual.module.css'
import { getNavOffset } from './scrollConfig'

import Social from './Social'

const WaveformVisual = lazy(() => import('./WaveformVisual'))


const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  
    return (
    <div id={styles.hero} ref={heroRef}>
    {/* Layered ambient glow orbs */}
    <motion.div
        className={`${styles.orb} ${styles.orbPrimary}`}
        animate={{
          x: ['-3%', '4%', '-3%'],
          y: ['-2%', '3%', '-2%'],
          scale: [1.0, 1.04, 1.0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
        className={`${styles.orb} ${styles.orbAccent}`}
        animate={{
          x: ['5%', '-3%', '5%'],
          y: ['2%', '-4%', '2%'],
          scale: [1.02, 0.98, 1.02],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
        className={`${styles.orb} ${styles.orbMuted}`}
        animate={{
          x: ['-1%', '2%', '-1%'],
          y: ['1%', '-2%', '1%'],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />

    <div className={styles.left}>
        <motion.div
        id={styles.description}
        variants={stagger}
        initial="hidden"
        animate="visible"
        >
            <motion.div className={styles.tag} variants={fadeUp}>
                <span>WELCOME TO MY TERMINAL</span>
            </motion.div>

            <motion.h1 variants={fadeUp}>
                Engineering{' '}
                <span className={styles.adjective}>
                    Impactful
                </span>
                <br />Solutions
            </motion.h1>
            <motion.p variants={fadeUp}>
                I'm <b>Carlos Lorenzo-Zúñiga Marí</b> — bridging the gap between
                <b> health</b> and <b>techonlogy</b> through physics, ML, and hardware.
            </motion.p>

            <motion.div className={styles.actions} variants={fadeUp}>
                <motion.button
                className={styles.launch}
                onClick={() =>
                    scroller.scrollTo('about-section', {
                    smooth: true,
                    duration: 600,
                    offset: -getNavOffset(),
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
