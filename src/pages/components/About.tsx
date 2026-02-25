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
                    Based in Valencia, I am a 1st-year <strong>Biomedical Engineering</strong> student at <a href="https://www.upv.es/" target="_blank" rel="noopener noreferrer">UPV</a> and a self-taught developer. I build from first principles, decomposing complex systems to their fundamentals before optimizing for impact. This approach drives my work at <a href="https://www.linkedin.com/company/daidalonic/" target="_blank" rel="noopener noreferrer">DAIDALONIC</a>, where we develop modular biomedical hardware.
                </p>

                <p>
                    My focus is the <strong>Signal-to-Action</strong> pipeline: translating noisy biological data into actionable control. I am currently bridging the layer between physical sensing and digital processing by designing <strong>multi-electrode EMG PCBs</strong> for modular prosthetics.
                </p>

                <p>
                    Beyond the hardware, I am exploring <strong>Computational Learning Theory (PAC)</strong> to improve my mathematical foundation behind the <strong>ML</strong> models I deploy. 
                    I've always been fascinated by the complexity of the brain and the challenges it presents. 
                    This is why I strive to push the frontier of <strong>Neurotechnology</strong>.
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
                    <span className={styles.pill}>Signal Processing</span>
                    <span className={styles.pill}>Full-Stack</span>
                </motion.div>
            </motion.aside>
        </motion.section>
    )
}