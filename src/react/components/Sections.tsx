import { useState, useCallback } from 'react'
import { scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHouseChimney,
    faUser,
    faCode,
    faNewspaper,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

import { getNavOffset } from './scrollConfig'
import { copyEmail } from './Footer'

/**
 * The mobile action bar.
 *
 * There is deliberately no desktop navigation — navigation is scroll, and the
 * rail in Content.tsx is the only indicator. Below 880px the primary actions
 * move into the thumb zone at the bottom of the screen; `.actions` in
 * _terminal.css hides this entirely on larger viewports.
 */
const TARGETS = [
    { id: 'hero-section', icon: faHouseChimney, label: 'Top' },
    { id: 'about-section', icon: faUser, label: 'About' },
    { id: 'projects-section', icon: faCode, label: 'Work' },
]

export default function Sections() {
    const [copied, setCopied] = useState(false)

    const go = useCallback((id: string) => {
        scroller.scrollTo(id, { smooth: true, duration: 500, offset: -getNavOffset() })
    }, [])

    const handleCopy = useCallback(async () => {
        await copyEmail()
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [])

    return (
        <nav className="actions" aria-label="Primary actions">
            {TARGETS.map((t) => (
                <button key={t.id} type="button" onClick={() => go(t.id)}>
                    <FontAwesomeIcon icon={t.icon} aria-hidden="true" />
                    {t.label}
                </button>
            ))}

            <a href="/blog">
                <FontAwesomeIcon icon={faNewspaper} aria-hidden="true" />
                Blog
            </a>

            <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address to clipboard"
            >
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                <span role="status" aria-live="polite">
                    {copied ? 'Copied' : 'Mail'}
                </span>
            </button>
        </nav>
    )
}
