import { motion } from 'motion/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import styles from "./ProjectCard.module.css"

// Extra link type — each entry carries its own label, URL, and icon
export interface ExtraLink {
    label: string
    url: string
    icon: IconDefinition
}

// Props for ProjectCard
interface ProjectCardProps {
    title: string
    description: string
    repo_link: string
    extraLinks?: ExtraLink[]
    skills: string[]
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

const skillStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}

const skillItem = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
}

declare function gtag(...args: any[]): void;

export default function ProjectCard({ title, description, repo_link, extraLinks, skills }: ProjectCardProps) {
    const hasLinks = !!repo_link || (extraLinks && extraLinks.length > 0)

    return (
        <motion.div
            className={styles.projectCard}
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            <h3>{title}</h3>
            <p>{description}</p>

            {hasLinks && (
                <div className={styles.linksRow}>
                    {repo_link && (
                        <motion.a
                            href={repo_link}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`View ${title} on GitHub`}
                            whileHover={{ scale: 1.15, color: '#E6EDF3' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => gtag('event', 'project_click', { project_name: title, link_text: `${title} GitHub` })}
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </motion.a>
                    )}
                    {extraLinks?.map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${link.label} — ${title}`}
                            whileHover={{ scale: 1.15, color: '#E6EDF3' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => gtag('event', 'project_click', { project_name: title, link_text: link.label })}
                        >
                            <FontAwesomeIcon icon={link.icon} />
                        </motion.a>
                    ))}
                </div>
            )}

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
