import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-scroll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faBolt, faBriefcase, faUser} from '@fortawesome/free-solid-svg-icons'

import styles from "./Sections.module.css"
import { NAV_OFFSET_PX } from './scrollConfig'

const containerVariants = {
    hidden: { x: 60, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.8, ease: 'easeOut' as const, staggerChildren: 0.07, delayChildren: 1.0 },
    },
}

const iconVariant = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

const sections = [
    { to: 'hero-section', icon: faHouseChimney, label: 'Home' },
    { to: 'about-section', icon: faUser, label: 'About' },
    { to: 'skills-section', icon: faBolt, label: 'Skills' },
    { to: 'projects-section', icon: faBriefcase, label: 'Projects' },
]

export default function Sections() {
    const [activeSection, setActiveSection] = useState(sections[0].to)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                root: null,
                rootMargin: `-${NAV_OFFSET_PX}px 0px -55% 0px`,
                threshold: [0.25, 0.5],
            }
        )

        const observed = sections
            .map(({ to }) => document.getElementById(to))
            .filter((el): el is HTMLElement => Boolean(el))

        observed.forEach((el) => observer.observe(el))

        return () => {
            observed.forEach((el) => observer.unobserve(el))
            observer.disconnect()
        }
    }, [])

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
                    smooth={true}
                    duration={600}
                    offset={-NAV_OFFSET_PX}
                    className={activeSection === to ? styles.active : undefined}
                    aria-label={label}
                >
                    <motion.div
                        className={styles.section}
                        variants={iconVariant}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </motion.div>
                </Link>
            ))}
        </motion.div>

    )
}
