import { motion } from 'motion/react'
import styles from './Experience.module.css'

const experiences = [
    {
        company: 'DAIDALONIC',
        role: 'Hardware & Embedded Engineer',
        date: '2025 — Present',
        achievements: [
            'Engineered multi-channel EMG filtering PCBs for realtime control of mioelectric prosthetics.',
         
        ]
    },
    {
        company: 'Caxton College',
        role: 'IT Specialist',
        date: '2024 — Present (Recurring Seasonal Role)',
        achievements: [
            'Orchestrated and automated a domain controller (active directory) migration.',
            'Developed a custom platform with Google Apps Script integration for staff to report concerns about students. It included features such as fuzzy finding students from a database or automated emailing.',
            'Provided technical support across the school, including troubleshooting hardware and software issues and maintaining the IT infrastructure.',

         
        ]
    }
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Experience() {
    return (
        <motion.div
            className={styles.experienceContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.h2 variants={headingVariant}>Experience</motion.h2>
            
            <motion.div className={styles.timeline} variants={containerVariants}>
                {experiences.map((exp, index) => (
                    <motion.div key={index} className={styles.timelineItem} variants={itemVariants}>
                        <div className={styles.timelineDot} />
                        <div className={styles.header}>
                            <h3 className={styles.role}>{exp.role}</h3>
                            <div className={styles.company}>{exp.company}</div>
                            <div className={styles.date}>{exp.date}</div>
                        </div>
                        <ul className={styles.description}>
                            {exp.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}