import { motion } from 'motion/react'

import ProjectCard from './ProjectCard'

import styles from "./Projects.module.css"

const projects = [
    {
        title: 'Vectra',
        description: 'A bespoke 3D physics engine and OpenGL renderer built from scratch to demystify complex mechanical simulations. It features a custom multithreaded architecture and a dynamic BVH for efficient collision handling.',
        skills: ['C++', 'OpenGL', 'Multithreading', 'Physics Systems'],
        repo_link: 'https://github.com/carlos-lorenzo/vectra',
    },
    {
        title: 'DrivingML',
        description: 'An exploration of evolutionary intelligence where autonomous agents learn to navigate circuits. I bypassed standard AI libraries to implement the neural network and genetic training algorithms from first principles.',
        skills: ['C#', 'Neural Networks', 'Genetic Algorithms', ],
        repo_link: 'https://github.com/carlos-lorenzo/DrivingML',
    },
    {
        title: 'FormuFlash',
        description: 'A full-stack ecosystem built to help STEM students master complex notation. I engineered the entire pipeline from LaTeX rendering to a containerized cloud deployment on GCP.',
        skills: ['Django', 'React', 'Docker', 'PostgreSQL'],
        repo_link: 'https://github.com/carlos-lorenzo/formuflash',
    },
    {
        title: 'EMG Interface PCB',
        description: 'A multi-electrode acquisition system developed for DAIDALONIC\'s arm prosthetic project. Designed using EasyEDA, the board features a custom analog front-end to isolate, filter and amplify muscular signals for real-time prosthetic control.',
        skills: ['EasyEDA', 'Analog Circuitry', 'Prosthetics', 'Bio-Signal Processing'],
        repo_link: '', // Update with your actual link
    }
]

const gridStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Projects() {
    return (
        <motion.div
            className={styles.projectsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.h2 variants={headingVariant}>My Projects</motion.h2>
            <motion.div className={styles.grid} variants={gridStagger}>
                {projects.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </motion.div>
        </motion.div>
    )
}
