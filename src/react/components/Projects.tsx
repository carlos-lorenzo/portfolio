import { motion } from 'motion/react'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import ProjectCard from './ProjectCard'
import type { ExtraLink } from './ProjectCard'

import styles from "./Projects.module.css"

const projects: {
    title: string
    description: string
    skills: string[]
    repo_link: string
    extraLinks?: ExtraLink[]
}[] = [
    {
        title: 'Neurodaq',
        description: 'An open, 8-channel, 24-bit wearable EEG system built end-to-end across hardware, firmware, and software. Features a custom ADS1299 analog front-end achieving ~0.3 µV baseline noise, ESP32-S3 acquisition with Wi-Fi streaming, and a Python/PyQt host with live waveform and spectral visualization, 10–20 brain mapping, and electrode-impedance diagnostics. The complete system — including PCBs, firmware, host software, and wearable enclosure — is open and reproducible.',
        skills: ['PCB Design', 'Mixed Signal', 'Embedded Systems', 'Biomedical Signal Processing', 'EEG'],
        repo_link: 'https://github.com/carlos-lorenzo/neurodaq',
        extraLinks: [],
    },
    {
        title: 'ADS1299 ESP-IDF Driver',
        description: 'An ultra-efficient, production-grade C driver for the TI ADS1299 24-bit ADC. Built on the ESP-IDF framework, it utilizes SPI with DMA transfers, hardware interrupts, and ISR-safe FreeRTOS ring buffers to achieve zero-copy, real-time biosignal data acquisition.',
        skills: ['C', 'ESP-IDF', 'SPI DMA', 'FreeRTOS', 'Interrupt Handling'],
        repo_link: 'https://github.com/carlos-lorenzo/ads1299-esp.git',
    },
    {
        title: 'Vectra',
        description: 'A bespoke 3D physics engine and OpenGL renderer built from scratch to demystify complex mechanical simulations. It features a custom multithreaded architecture and a dynamic BVH for efficient collision handling.',
        skills: ['C++', 'OpenGL', 'Data Structures', 'Physics Systems'],
        repo_link: 'https://github.com/carlos-lorenzo/vectra',
    },
    {
        title: 'EMG Interface PCB',
        description: 'A multi-electrode acquisition system developed for DAIDALONIC\'s arm prosthetic (CUPPER). Designed using EasyEDA, the board features a custom analog front-end to isolate, filter and amplify muscular signals for real-time prosthetic control.',
        skills: ['PCB Design', 'Analog Circuitry', 'Prosthetics', 'Bio-Signal Processing'],
        repo_link: '',
        extraLinks: [
            { label: 'Blog Post', url: 'https://carloslorenzo.dev/blog/cupper-daq', icon: faArrowUpRightFromSquare },
        ],
    },
    {
        title: 'DrivingML',
        description: 'An exploration of evolutionary intelligence where autonomous agents learn to navigate circuits. I bypassed standard AI libraries to implement the neural network and genetic training algorithms from first principles.',
        skills: ['C#', 'Neural Networks', 'Genetic Algorithms'],
        repo_link: 'https://github.com/carlos-lorenzo/DrivingML',
    },
    {
        title: 'FormuFlash',
        description: 'A full-stack ecosystem built to help STEM students master complex notation. I engineered the entire pipeline from LaTeX rendering to a containerized cloud deployment on GCP.',
        skills: ['Django', 'React', 'Docker', 'PostgreSQL'],
        repo_link: 'https://github.com/carlos-lorenzo/formuflash',
        extraLinks: [
            { label: 'Live Site', url: 'https://formuflash.com', icon: faArrowUpRightFromSquare },
        ],
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
