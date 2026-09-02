import { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import Social from './Social'
import styles from './Footer.module.css'

export const EMAIL = 'contact@carloslorenzo.dev'

export async function copyEmail(): Promise<void> {
    try {
        await navigator.clipboard.writeText(EMAIL)
    } catch {
        // Fallback for browsers without the async clipboard API.
        const ta = document.createElement('textarea')
        ta.value = EMAIL
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
    }
}

export default function Footer() {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(async () => {
        await copyEmail()
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [])

    return (
        <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
            <h2 className="t-rule">
                <span>contact</span>
            </h2>

            <p className={styles.blurb}>
                Interested in hardware, biosignals or embedded systems? Always happy to talk.
            </p>

            <div className={styles.row}>
                <button
                    type="button"
                    className={styles.email}
                    onClick={handleCopy}
                    data-copied={copied || undefined}
                    aria-label={`Copy email address ${EMAIL} to clipboard`}
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className={styles.stack}>
                        {/* Invisible sizers hold the button at the wider of the two
                            labels, so swapping them cannot shift the layout. */}
                        <span className={styles.sizer} aria-hidden="true">
                            {EMAIL}
                        </span>
                        <span className={styles.sizer} aria-hidden="true">
                            copied to clipboard
                        </span>
                        <span className={styles.live} role="status" aria-live="polite">
                            {copied ? 'copied to clipboard' : EMAIL}
                        </span>
                    </span>
                </button>

                <Social />
            </div>

            <p className={styles.copyright}>
                © {new Date().getFullYear()} Carlos Lorenzo-Zúñiga Marí
            </p>
        </footer>
    )
}
