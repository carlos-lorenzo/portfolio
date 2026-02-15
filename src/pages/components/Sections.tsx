import { useEffect, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-scroll'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faBolt, faBriefcase, faUser} from '@fortawesome/free-solid-svg-icons'

import styles from "./Sections.module.css"
import { getNavOffset, NAV_MOBILE_BP } from './scrollConfig'

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
    const [navOffset, setNavOffset] = useState(() => getNavOffset())

    /** Keep navOffset in sync when the viewport crosses the mobile breakpoint */
    const syncOffset = useCallback(() => {
        setNavOffset(getNavOffset())
    }, [])

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${NAV_MOBILE_BP}px)`)
        mql.addEventListener('change', syncOffset)
        return () => mql.removeEventListener('change', syncOffset)
    }, [syncOffset])

    useEffect(() => {
        let raf = 0

        const handleScroll = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                // If we're at the very bottom, highlight the last section
                if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2) {
                    setActiveSection(sections[sections.length - 1].to)
                    return
                }

                let current = sections[0].to

                for (const { to } of sections) {
                    const el = document.getElementById(to)
                    if (!el) continue
                    // Using a slightly larger offset helps catch sections earlier
                    // especially if the scroll doesn't align perfectly
                    const buffer = 150 
                    if (el.getBoundingClientRect().top <= navOffset + buffer) {
                        current = to
                    }
                }

                setActiveSection(current)
            })
        }

        // Set initial state
        handleScroll()

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [navOffset])

    return (
        <motion.nav
            id={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            role='navigation'
        >
            {sections.map(({ to, icon, label }) => (
                <Link
                    key={to}
                    to={to}
                    smooth={true}
                    duration={600}
                    offset={-navOffset}
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
        </motion.nav>

    )
}
