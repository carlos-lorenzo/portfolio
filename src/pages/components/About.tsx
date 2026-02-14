import React from 'react'
import { motion } from 'motion/react'
import styles from './About.module.css'

const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const asideStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const asideItem = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function About() {
    return (
        <motion.section
            className={styles.aboutContainer}
            aria-labelledby="about-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className={styles.card} variants={cardVariants}>
                <h2 id="about-heading">Hi — I’m Carlos</h2>
                <p>
                    I am a <strong>Biomedical Engineering</strong> student at <a href="https://upv.es/" target="_blank" rel="noopener noreferrer">UPV</a> and a developer who believes that the most complex systems are simply a collection of first principles waiting to be connected. For over <strong>6 years</strong>, I have navigated the space between low-level machine logic and the intricate dynamics of human biology.
                </p>

                <p>
                    I don’t just use tools; I seek to understand their architecture. This curiosity is what drives me to build 3D physics engines from scratch in <strong>C++</strong>, implement neural networks without high-level libraries, and design the analog circuitry required to capture the faint electrical whispers of the brain. To me, "too daunting" is just an invitation to dive deeper.
                </p>

                <p>
                    My goal is to build the future of <strong>Neurotechnology</strong>. Whether I’m developing cloud-native platforms with Django and React or optimizing embedded signal processing for BCIs, I am focused on creating a seamless interface between engineering precision and biological complexity.
                </p>
            </motion.div>

            <motion.aside className={styles.aside} variants={asideStagger}>
                <motion.div className={styles.stat} variants={asideItem}>
                    <div className={styles.statValue}>6+</div>
                    <div className={styles.statLabel}>Years of Building</div>
                </motion.div>

                <motion.div className={styles.pillList} variants={asideItem}>
                    <span className={styles.pill}>Systems Engineering</span>
                    <span className={styles.pill}>Machine Learning</span>
                    <span className={styles.pill}>Signal Processing</span>
                    <span className={styles.pill}>Full-Stack</span>
                </motion.div>
            </motion.aside>
        </motion.section>
    )
}