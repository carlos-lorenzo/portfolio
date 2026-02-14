import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import styles from './Social.module.css'


export default function Social() {
    return (
        <div className={styles.social}>
            <motion.a
                className={styles.icon}
                href="https://www.linkedin.com/in/carlos-lorenzo-z%C3%BA%C3%B1iga-mar%C3%AD-99a666256/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -3, scale: 1.1, boxShadow: '0 8px 20px rgba(2,6,23,0.35)' }}
                whileTap={{ scale: 0.9 }}
            >
                <FontAwesomeIcon icon={faLinkedin} />
            </motion.a>
            <motion.a
                className={styles.icon}
                href="https://github.com/carlos-lorenzo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.1, boxShadow: '0 8px 20px rgba(2,6,23,0.35)' }}
                whileTap={{ scale: 0.9 }}
            >
                <FontAwesomeIcon icon={faGithub} />
            </motion.a>
        </div>
    )
}
