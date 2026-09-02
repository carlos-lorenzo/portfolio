import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTypescript, faPython, faReact, faDocker } from '@fortawesome/free-brands-svg-icons'
import {
    SiCplusplus,
    SiC,
    SiDjango,
    SiPostgresql,
    SiGooglecloud,
    SiNginx,
    SiPytorch,
    SiEspressif,
    SiEasyeda,
} from '@icons-pack/react-simple-icons'

import styles from './Skills.module.css'

const SI_SIZE = 15

const categories = [
    {
        title: 'Languages',
        color: 'var(--cyan)',
        items: [
            { name: 'C++', icon: <SiCplusplus size={SI_SIZE} /> },
            { name: 'C', icon: <SiC size={SI_SIZE} /> },
            { name: 'Python', icon: <FontAwesomeIcon icon={faPython} /> },
            { name: 'TypeScript', icon: <FontAwesomeIcon icon={faTypescript} /> },
        ],
    },
    {
        title: 'ML & Systems',
        color: 'var(--purple)',
        items: [
            { name: 'PyTorch', icon: <SiPytorch size={SI_SIZE} /> },
            { name: 'ESP-IDF', icon: <SiEspressif size={SI_SIZE} /> },
            { name: 'EasyEDA', icon: <SiEasyeda size={SI_SIZE} /> },
        ],
    },
    {
        title: 'Infrastructure',
        color: 'var(--green)',
        items: [
            { name: 'Docker', icon: <FontAwesomeIcon icon={faDocker} /> },
            { name: 'GCP', icon: <SiGooglecloud size={SI_SIZE} /> },
            { name: 'Nginx', icon: <SiNginx size={SI_SIZE} /> },
        ],
    },
    {
        title: 'Web',
        color: 'var(--pink)',
        items: [
            { name: 'React', icon: <FontAwesomeIcon icon={faReact} /> },
            { name: 'Django', icon: <SiDjango size={SI_SIZE} /> },
            { name: 'PostgreSQL', icon: <SiPostgresql size={SI_SIZE} /> },
        ],
    },
]

export default function Skills() {
    return (
        <section aria-labelledby="skills-heading">
            <h2 className="t-rule" id="skills-heading">
                <span>stack</span>
            </h2>

            <div className={styles.rows}>
                {categories.map((cat) => (
                    <div
                        key={cat.title}
                        className={styles.row}
                        style={{ '--cat': cat.color } as React.CSSProperties}
                    >
                        <h3 className={styles.label}>{cat.title}</h3>
                        <ul className={styles.items}>
                            {cat.items.map((item) => (
                                <li key={item.name} className={styles.item}>
                                    <span className={styles.icon} aria-hidden="true">
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
