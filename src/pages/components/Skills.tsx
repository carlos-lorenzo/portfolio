import React from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTypescript, faPython, faReact, faDocker, faUnity } from '@fortawesome/free-brands-svg-icons'
import {
    SiCplusplus,
    SiSharp,
    SiDjango,
    SiPostgresql,
    SiGooglecloud,
    SiNginx,
    SiPytorch,
    SiOpengl,
    SiEasyeda,
} from '@icons-pack/react-simple-icons'

import styles from './Skills.module.css'

const SI_SIZE = 18

const categories = [
    {
        title: 'Languages',
        colorVar: '--primary',
        items: [
            { name: 'C++', icon: <SiCplusplus size={SI_SIZE} /> },
            { name: 'C#', icon: <SiSharp size={SI_SIZE} /> },
            { name: 'TypeScript', icon: <FontAwesomeIcon icon={faTypescript} /> },
            { name: 'Python', icon: <FontAwesomeIcon icon={faPython} /> },
        ],
    },
    {
        title: 'Web',
        colorVar: '--accent',
        items: [
            { name: 'React', icon: <FontAwesomeIcon icon={faReact} /> },
            { name: 'Django', icon: <SiDjango size={SI_SIZE} /> },
            { name: 'PostgreSQL', icon: <SiPostgresql size={SI_SIZE} /> },
        ],
    },
    {
        title: 'Infrastructure',
        colorVar: '--code-green',
        items: [
            { name: 'Docker', icon: <FontAwesomeIcon icon={faDocker} /> },
            { name: 'GCP', icon: <SiGooglecloud size={SI_SIZE} /> },
            { name: 'Nginx', icon: <SiNginx size={SI_SIZE} /> },
        ],
    },
    {
        title: 'ML & Systems',
        colorVar: '--code-purple',
        items: [
            { name: 'PyTorch', icon: <SiPytorch size={SI_SIZE} /> },
            { name: 'Unity', icon: <FontAwesomeIcon icon={faUnity} /> },
            { name: 'OpenGL', icon: <SiOpengl size={SI_SIZE} /> },
            { name: 'EasyEDA', icon: <SiEasyeda size={SI_SIZE} /> },
        ],
    },
]

const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const rowStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
}

const rowVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const, staggerChildren: 0.06 } },
}

const badgeVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

export default function Skills() {
    return (
        <motion.section
            className={styles.skillsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2 variants={headingVariant}>Technical Stack</motion.h2>

            <motion.div className={styles.rows} variants={rowStagger}>
                {categories.map((cat) => (
                    <motion.div
                        key={cat.title}
                        className={styles.categoryRow}
                        style={{ '--cat-color': `var(${cat.colorVar})` } as React.CSSProperties}
                        variants={rowVariant}
                    >
                        <span className={styles.categoryLabel}>{cat.title}</span>

                        <div className={styles.badges}>
                            {cat.items.map((item) => (
                                <motion.div key={item.name} className={styles.badge} variants={badgeVariant}>
                                    <span className={styles.badgeIcon}>{item.icon}</span>
                                    <span className={styles.badgeName}>{item.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}
