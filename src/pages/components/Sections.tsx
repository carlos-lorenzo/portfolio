import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-scroll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faBolt, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import styles from "./Sections.module.css"

const containerVariants = {
    hidden: { x: 60, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.8, ease: 'easeOut', staggerChildren: 0.07, delayChildren: 1.0 },
    },
}

const iconVariant = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

const sections = [
    { to: 'hero-section', icon: faHouseChimney, label: 'Home' },
    { to: 'about-section', icon: faUser, label: 'About' },
    { to: 'projects-section', icon: faBriefcase, label: 'Projects' },
    { to: 'skills-section', icon: faBolt, label: 'Skills' },
]

export default function Sections() {
    return (
        <motion.div
            id={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {sections.map(({ to, icon, label }) => (
                <Link
                    key={to}
                    to={to}
                    spy={true}
                    smooth={true}
                    duration={600}
                    offset={-20}
                    activeClass={styles.active}
                    aria-label={label}
                >
                    <motion.div
                        className={styles.section}
                        variants={iconVariant}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(88,166,255,0.08)' }}
                        whileTap={{ scale: 0.92 }}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </motion.div>
                </Link>
            ))}
        </motion.div>

    )
}
