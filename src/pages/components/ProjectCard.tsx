import React from 'react'
import { motion } from 'motion/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import styles from "./ProjectCard.module.css"

// Props for ProjectCard
interface ProjectCardProps {
    title: string
    description: string
    repo_link: string
    skills: string[]
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const skillStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}

const skillItem = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
}

export default function ProjectCard({ title, description, repo_link, skills }: ProjectCardProps) {
    return (
        <motion.div
            className={styles.projectCard}
            variants={cardVariants}
            
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            {
                repo_link && (
                    <motion.a
                href={repo_link}
                target='_blank'
                whileHover={{ scale: 1.15, color: '#E6EDF3' }}
                whileTap={{ scale: 0.95 }}
            >
                <FontAwesomeIcon icon={faGithub} />
            </motion.a>
                )
            }
            
            <motion.div
                className={styles.skillsContainer}
                variants={skillStagger}
            >
            {skills.map((skill, index) => (
                <motion.div key={index} className={styles.skill} variants={skillItem}>{skill}</motion.div>
            ))}
            </motion.div>
        </motion.div>
    )
}
