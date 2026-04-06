import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import styles from './Social.module.css'


declare function gtag(...args: any[]): void;

export default function Social() {
    return (
        <div className={styles.social}>
            <motion.a
                className={styles.icon}
                href="https://www.linkedin.com/in/carlos-lorenzo-z%C3%BA%C3%B1iga-mar%C3%AD-99a666256/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -1, scale: 1.05, boxShadow: '0 4px 18px rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => gtag('event', 'social_media_click', { platform: 'LinkedIn', link_text: 'LinkedIn Profile' })}
            >
                <FontAwesomeIcon icon={faLinkedin} />
            </motion.a>
            <motion.a
                className={styles.icon}
                href="https://github.com/carlos-lorenzo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -1, scale: 1.05, boxShadow: '0 4px 18px rgba(255, 255, 255, 0.25)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => gtag('event', 'social_media_click', { platform: 'GitHub', link_text: 'GitHub Profile' })}
            >
                <FontAwesomeIcon icon={faGithub} />
            </motion.a>
        </div>
    )
}
