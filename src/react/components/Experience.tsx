import { motion } from 'motion/react'
import styles from './Experience.module.css'

const experiences = [
    {
        company: 'DAIDALONIC',
        role: 'Hardware & Embedded Engineer',
        date: '2025 — Present',
        achievements: [
            'Engineered 2 multi-layer sEMG data acquisition PCBs incorporating galvanic isolation and ESD protection, enabling +99% muscle contraction detection accuracy in downstream edge ML models (Random Forest/CNNs).',
            'Designed 2-stage active analog front-ends featuring 30-300Hz bandpass filtering and DRL bias, achieving up to 1100V/V amplification and robust RMS/offset signal conditioning',
            'Standardized hardware validation by authoring DVT protocols, expanding testing bandwidth across the team and successfully isolating and resolving a critical power supply reliability issue.'
         
        ]
    },
    {
        company: 'Caxton College',
        role: 'IT Specialist',
        date: '2024 — Present (Recurring Seasonal Role)',
        achievements: [
            'Contributed to the recovery from a school-wide ransomware attack, restoring critical IT services within 24 hours and recovering terabytes of data from physical backups. Subsequently developed a persistent automated Windows deployment pipeline that reduced system reinstallation time by over 95%, allowing technicians to boot from a USB, leave the system unattended, and return to a fully functional deployment.',
            'Automated a domain controller (Active Directory) migration for 1,700 students, reducing a 3-day multi-technician process to 30 minutes and saving thousands of euros in labor costs.',
            'Developed a custom Google Apps Script platform for faculty to report and monitor over 1,000 students, streamlining communication workflows through database fuzzy-finding and automated emailing.'
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