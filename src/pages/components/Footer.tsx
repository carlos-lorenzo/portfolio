import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import Social from './Social'
import styles from './Footer.module.css'

const EMAIL = 'contact@carloslorenzo.dev'

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

export default function Footer() {
    const [copied, setCopied] = useState(false)

    const handleCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = EMAIL
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }, [])

    return (
        <motion.footer
            className={styles.footerContainer}
            aria-label="Site footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            role='contentinfo'
        >
            <motion.div variants={itemVariants}>
                <Social />
            </motion.div>

            <motion.div variants={itemVariants}>
                <motion.button
                    className={styles.emailButton}
                    onClick={handleCopyEmail}
                    aria-label={`Copy email address ${EMAIL} to clipboard`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <FontAwesomeIcon icon={faEnvelope} className={styles.emailIcon} />
                    <span className={styles.emailTextWrapper}>
                        {/* Invisible sizers keep the wrapper at the widest text's width */}
                        <span className={styles.emailSizer} aria-hidden="true">{EMAIL}</span>
                        <span className={styles.emailSizer} aria-hidden="true">Copied to clipboard!</span>
                        <AnimatePresence mode="wait" initial={false}>
                            {copied ? (
                                <motion.span
                                    key="copied"
                                    className={styles.copiedFeedback}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    role="status"
                                    aria-live="polite"
                                >
                                    Copied to clipboard!
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="email"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                >
                                    {EMAIL}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </span>
                </motion.button>
            </motion.div>

            <motion.p className={styles.copyright} variants={itemVariants}>
                © {new Date().getFullYear()} Carlos Lorenzo-Zúñiga Marí
                
            </motion.p>
        </motion.footer>
    )
}
