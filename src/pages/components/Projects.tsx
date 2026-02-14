import React from 'react'
import { motion } from 'motion/react'

import ProjectCard from './ProjectCard'

import styles from "./Projects.module.css"

const projects = [
    {
        title: 'Portfolio',
        description: 'Personal portfolio website built with a code-editor aesthetic, featuring dynamic line numbers and modern design.',
        repo_link: 'https://github.com/carlos-lorenzo/portfolio',
        skills: ['React', 'TypeScript', 'CSS'],
    },
    {
        title: 'Project Alpha',
        description: 'Some description about a very interesting project where cool things are done.',
        repo_link: 'https://github.com/example/alpha',
        skills: ['Python', 'FastAPI', 'Docker'],
    },
    {
        title: 'Project Beta',
        description: 'Another compelling project showcasing innovative solutions to real-world problems.',
        repo_link: 'https://github.com/example/beta',
        skills: ['Node.js', 'PostgreSQL', 'AWS'],
    },
]

const gridStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Projects() {
    return (
        <motion.div
            className={styles.projectsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.h1 variants={headingVariant}>My Projects</motion.h1>
            <motion.div className={styles.grid} variants={gridStagger}>
                {projects.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </motion.div>
        </motion.div>
    )
}
