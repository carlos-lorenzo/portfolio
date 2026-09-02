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
                I like building things. More specifically, things that sit somewhere between biology, electronics, and software. 
                I'm based in Valencia, where I'm a 2nd-year <strong>Biomedical Engineering</strong> student at <a href="https://www.upv.es/" target="_blank" rel="noopener noreferrer">UPV</a>,
                a self-taught developer, and an electronic designer at <a href="https://www.linkedin.com/company/daidalonic/" target="_blank" rel="noopener noreferrer">DAIDALONIC</a>. 
                </p>

                <p>
                A lot of what I do starts with a biological signal — an <strong>EEG</strong>, an <strong>EMG</strong>, or something else — 
                and ends with software doing something useful with it. I enjoy working across the whole process, 
                from designing the hardware that captures the signal to writing the code that processes it. 
                I'm particularly drawn to problems where making something <strong>faster, smaller, 
                or more efficient</strong> actually matters.
                </p>

                <p>
                Long term, I want to bring that same focus on performance and efficiency into <strong>neurotechnology</strong> — 
                building systems that can turn signals from the human body into something useful, in real time.
                </p>

                
            </motion.div>

            <motion.aside className={styles.aside} variants={asideStagger}>
                <motion.div className={styles.stat} variants={asideItem}>
                    <div className={styles.statValue}>7+</div>
                    <div className={styles.statLabel}>Years Creating</div>
                </motion.div>

                <motion.div className={styles.pillList} variants={asideItem}>
                    <span className={styles.pill}>Systems Engineering</span>
                    <span className={styles.pill}>Embedded Systems</span>
                    <span className={styles.pill}>Biosignal Processing</span>
                    <span className={styles.pill}>Machine Learning</span>
                </motion.div>
            </motion.aside>
        </motion.section>
    )
}