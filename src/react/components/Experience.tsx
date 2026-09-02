import styles from './Experience.module.css'

const experiences = [
    {
        company: 'DAIDALONIC',
        role: 'Hardware & Embedded Engineer',
        date: '2025 — Present',
        achievements: [
            'Engineered 2 multi-layer sEMG data acquisition PCBs incorporating galvanic isolation and ESD protection, enabling +99% muscle contraction detection accuracy in downstream edge ML models (Random Forest/CNNs).',
            'Designed 2-stage active analog front-ends featuring 30-300Hz bandpass filtering and DRL bias, achieving up to 1100V/V amplification and robust RMS/offset signal conditioning',
            'Standardized hardware validation by authoring DVT protocols, expanding testing bandwidth across the team and successfully isolating and resolving a critical power supply reliability issue.',
        ],
    },
    {
        company: 'Caxton College',
        role: 'IT Specialist',
        date: '2024 — Present (Recurring Seasonal Role)',
        achievements: [
            'Contributed to the recovery from a school-wide ransomware attack, restoring critical IT services within 24 hours and recovering terabytes of data from physical backups. Subsequently developed a persistent automated Windows deployment pipeline that reduced system reinstallation time by over 95%, allowing technicians to boot from a USB, leave the system unattended, and return to a fully functional deployment.',
            'Automated a domain controller (Active Directory) migration for 1,700 students, reducing a 3-day multi-technician process to 30 minutes and saving thousands of euros in labor costs.',
            'Developed a custom Google Apps Script platform for faculty to report and monitor over 1,000 students, streamlining communication workflows through database fuzzy-finding and automated emailing.',
        ],
    },
]

export default function Experience() {
    return (
        <section aria-labelledby="experience-heading">
            <h2 className="t-rule" id="experience-heading">
                <span>experience</span>
            </h2>

            <div className={styles.log}>
                {experiences.map((exp, i) => (
                    <article key={exp.company} className={styles.entry}>
                        <div className={styles.head}>
                            <span className={styles.ref} aria-hidden="true">
                                * [{i === 0 ? 'HEAD' : 'main'}]
                            </span>
                            <h3 className={styles.role}>{exp.role}</h3>
                            <span className={styles.date}>{exp.date}</span>
                        </div>

                        <p className={styles.company}>{exp.company}</p>

                        <ul className="tree">
                            {exp.achievements.map((a, j) => (
                                <li key={j}>{a}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    )
}
