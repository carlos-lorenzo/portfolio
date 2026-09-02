import styles from './About.module.css'

const SPEC: [string, string][] = [
    ['Hardware', 'PCB Design'],
    ['Embedded', 'C++ / Constrained'],
    ['ML', 'Edge AI'],
    ['Signals', 'DSP / EEG / EMG'],
]

const DOMAINS = [
    { label: 'Systems Engineering', cls: 'tag--sys' },
    { label: 'Embedded Systems', cls: 'tag--sys' },
    { label: 'Biosignal Processing', cls: 'tag--hw' },
    { label: 'Machine Learning', cls: 'tag--ml' },
]

export default function About() {
    return (
        <section aria-labelledby="about-heading">
            <h2 className="t-rule" id="about-heading">
                <span>about</span>
            </h2>

            <div className={styles.grid}>
                <div className={styles.body}>
                    <h3 className="t-bar">Hi, I&apos;m Carlos :)</h3>

                    <div className={styles.prose}>
                        <p>
                            I like building things. More specifically, things that sit
                            somewhere between biology, electronics, and software. I&apos;m based
                            in Valencia, where I&apos;m a 2nd-year{' '}
                            <strong>Biomedical Engineering</strong> student at{' '}
                            <a href="https://www.upv.es/" target="_blank" rel="noopener noreferrer">
                                UPV
                            </a>
                            , a self-taught developer, and an electronic designer at{' '}
                            <a
                                href="https://www.linkedin.com/company/daidalonic/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                DAIDALONIC
                            </a>
                            .
                        </p>

                        <p>
                            A lot of what I do starts with a biological signal: an{' '}
                            <strong>EEG</strong>, an <strong>EMG</strong>, or something else,
                            and ends with software doing something useful with it. I enjoy
                            working across the whole process, from designing the hardware that
                            captures the signal to writing the code that processes it. I&apos;m
                            particularly drawn to problems where making something{' '}
                            <strong>faster, smaller, or more efficient</strong> actually
                            matters.
                        </p>

                        <p>
                            Long term, I want to bring that same focus on performance and
                            efficiency into <strong>neurotechnology</strong>. Building systems
                            that can turn signals from the human body into something useful, in
                            real time.
                        </p>
                    </div>

                    <ul className="tags">
                        {DOMAINS.map((d) => (
                            <li key={d.label}>
                                <span className={`tag ${d.cls}`}>{d.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <aside className={`win win--titled ${styles.spec}`}>
                    <span className="win__t">core</span>
                    <dl className="kv kv--split">
                        {SPEC.map(([k, v]) => (
                            <div key={k} className={styles.row}>
                                <dt>{k}</dt>
                                <dd>{v}</dd>
                            </div>
                        ))}
                    </dl>
                </aside>
            </div>
        </section>
    )
}
