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
                <h2 id="about-heading">Hi — I’m Carlos</h2>
                <p>
                    A Spanish <strong>Biomedical Engineering</strong> student at <a href="https://www.linkedin.com/company/daidalonic/" target="_blank" rel="noopener noreferrer">UPV</a> and a self-taught developer Whenever I build something I seek to first understand the underlying principles upon which one can create impact. That’s also why I’m a member of <a href="https://www.linkedin.com/company/daidalonic/" target="_blank" rel="noopener noreferrer">DAIDALONIC</a>, a student lead group, developing biomedical devices.

                </p>

                <p>
                    As an upcoming biomedical engineer and developer my goal is to <strong>bridge the gap</strong> between cutting-edge technology and health. I build with the goal of solving <strong>real</strong> problems for <strong>real</strong> people in pursuit of the improvement of <strong>quality of life</strong>.
                </p>

                <p>
                    Currently I'm exploring the mathematical foundation behind Machine Learning - <strong>PAC</strong> - and developing multi electrode EMG bespoke <strong>PCBs</strong> for a modular arm prosthetic. My long term goal is the development of <strong>Brain-Computer Interfaces</strong> and advancements in <strong>Neurotechnology</strong>.             
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