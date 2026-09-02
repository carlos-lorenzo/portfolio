import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import styles from './Social.module.css'

declare function gtag(...args: any[]): void

const LINKS = [
    {
        href: 'https://www.linkedin.com/in/carlos-lorenzo-z%C3%BA%C3%B1iga-mar%C3%AD-99a666256/',
        label: 'LinkedIn',
        tip: 'LinkedIn',
        icon: faLinkedin,
        platform: 'LinkedIn',
    },
    {
        href: 'https://github.com/carlos-lorenzo',
        label: 'GitHub',
        tip: 'GitHub',
        icon: faGithub,
        platform: 'GitHub',
    },
    {
        // A bare document glyph reads as nothing in particular, so this one
        // carries an explicit label on hover and on keyboard focus.
        href: '/CV_CarlosLorenzoZunigaMari.pdf',
        label: 'CV / résumé (PDF)',
        tip: 'CV / résumé',
        icon: faFile,
        platform: 'Portfolio',
    },
]

export default function Social() {
    return (
        <div className={styles.social}>
            {LINKS.map((l) => (
                <a
                    key={l.platform}
                    className={styles.icon}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    data-tip={l.tip}
                    onClick={() =>
                        gtag('event', 'social_media_click', {
                            platform: l.platform,
                            link_text: l.label,
                        })
                    }
                >
                    <FontAwesomeIcon icon={l.icon} />
                </a>
            ))}
        </div>
    )
}
