import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import styles from './ProjectCard.module.css'

export interface ExtraLink {
    label: string
    url: string
    icon: IconDefinition
}

interface ProjectCardProps {
    title: string
    slug: string
    description: string
    repo_link: string
    extraLinks?: ExtraLink[]
    skills: string[]
    tone?: string
}

declare function gtag(...args: any[]): void

export default function ProjectCard({
    title,
    slug,
    description,
    repo_link,
    extraLinks,
    skills,
    tone,
}: ProjectCardProps) {
    // The card's primary destination — the repo if there is one, otherwise the
    // first extra link. It backs the stretched link that makes the whole card
    // clickable, which is what earns the card a hover state at all.
    const primary = repo_link || extraLinks?.[0]?.url || ''
    const secondary = extraLinks?.filter((l) => l.url !== primary) ?? []

    return (
        <article
            className={`win ${styles.card}`}
            style={tone ? ({ '--accent': tone } as React.CSSProperties) : undefined}
        >
            <span className={`path ${styles.path}`}>/projects/{slug}</span>

            <h3 className={styles.title}>
                {primary ? (
                    <a
                        href={primary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.stretch}
                        onClick={() =>
                            gtag('event', 'project_click', {
                                project_name: title,
                                link_text: title,
                            })
                        }
                    >
                        {title}
                    </a>
                ) : (
                    title
                )}
            </h3>

            <p className={styles.desc}>{description}</p>

            <ul className={`tags ${styles.tags}`}>
                {skills.map((skill) => (
                    <li key={skill}>
                        <span className="tag">{skill}</span>
                    </li>
                ))}
            </ul>

            <div className={styles.links}>
                {repo_link && (
                    <a
                        href={repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${title} on GitHub`}
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                )}
                {secondary.map((link) => (
                    <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.label} — ${title}`}
                        onClick={() =>
                            gtag('event', 'project_click', {
                                project_name: title,
                                link_text: link.label,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={link.icon} />
                    </a>
                ))}
            </div>
        </article>
    )
}
