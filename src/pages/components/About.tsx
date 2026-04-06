import { motion } from 'motion/react'
import styles from './About.module.css'

const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const asideStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const asideItem = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
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
                <h2 id="about-heading">Hi — I'm Carlos</h2>
                <p>
                    I build at the intersection of biology and silicon. Based in Valencia, I'm a 1st-year <strong>Biomedical Engineering</strong> student at <a href="https://www.upv.es/" target="_blank" rel="noopener noreferrer">UPV</a>, 
                    self-taught developer and an electronic designer for <a href="https://www.linkedin.com/company/daidalonic/" target="_blank" rel="noopener noreferrer">DAIDALONIC</a>. 
                </p>

                <p>
                I focus on the Signal-to-Action pipeline: translating noisy biological data into <strong>real-time</strong> control. 
                Whether it's designing multi-electrode EMG PCBs or deploying <strong>machine learning</strong> models on microcontrollers.
                My goal is moving towards the frontier in <strong>Neurotechnology</strong>, where the human body meets cutting-edge silicon.
                </p>

                
            </motion.div>

            <motion.aside className={styles.aside} variants={asideStagger}>
                <motion.div className={styles.stat} variants={asideItem}>
                    <div className={styles.statValue}>6+</div>
                    <div className={styles.statLabel}>Years Creating</div>
                </motion.div>

                <motion.div className={styles.pillList} variants={asideItem}>
                    <span className={styles.pill}>Systems Engineering</span>
                    <span className={styles.pill}>Machine Learning</span>
                    <span className={styles.pill}>Biosignal Processing</span>
                    <span className={styles.pill}>Embedded Systems</span>
                </motion.div>
            </motion.aside>
        </motion.section>
    )
}