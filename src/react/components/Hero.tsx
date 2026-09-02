import { useRef, lazy, Suspense } from 'react'
import { scroller } from 'react-scroll'

import Social from './Social'
import styles from './Hero.module.css'
import waveStyles from './WaveformVisual.module.css'
import { getNavOffset } from './scrollConfig'

const WaveformVisual = lazy(() => import('./WaveformVisual'))

/** Small Arch mark. Hero only — a fixed full-page watermark behind scrolling
 *  body text costs readability for a purely decorative gain. */
const ARCH = `      /\\
     /  \\
    /\\   \\
   /      \\
  /   ,,   \\
 /   |  |   \\
/_-''    ''-_\\`

const FACTS: [string, string][] = [
    ['Role', 'Embedded & AI Engineer'],
    ['Team', 'DAIDALONIC'],
    ['Study', 'Biomedical Eng @ UPV'],
    ['Focus', 'Biosignals'],
    ['Base', 'Valencia, ES'],
]

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.hero} ref={heroRef}>
            <div className={styles.grid}>
                <div className={styles.left}>
                    <div className={styles.head}>
                        <pre className="ascii" aria-hidden="true">
                            {ARCH}
                        </pre>
                        <div className={styles.ident}>
                            <span className="path">/portfolio</span>
                            <h1 className="t-h1">Carlos Lorenzo-Zúñiga Marí</h1>
                            <p className={styles.tagline}>
                                Building things where healthcare meets physics, hardware and
                                software. From signal to decision.
                            </p>
                        </div>
                    </div>

                    <dl className="kv">
                        {FACTS.map(([k, v]) => (
                            <div key={k} className={styles.row}>
                                <dt>{k}:</dt>
                                <dd>{v}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className={styles.cta}>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            onClick={() =>
                                scroller.scrollTo('about-section', {
                                    smooth: true,
                                    duration: 600,
                                    offset: -getNavOffset(),
                                })
                            }
                        >
                            <span aria-hidden="true">❯</span> explore
                        </button>
                        <a href="/blog" className={styles.btn}>
                            read the blog
                        </a>
                        <Social />
                    </div>
                </div>

                {/* The visual lives in its own element so the grid rule below can
                    collapse the hero to a single full-width column if it is ever
                    removed — no further changes needed. */}
                <aside className={styles.vis}>
                    <div className="win win--titled">
                        <span className="win__t">wavelet.py</span>
                        {/* <span className="win__s">
                            <i className="pip" /> live
                        </span> */}
                        <Suspense fallback={<div className={waveStyles.placeholder} />}>
                            <WaveformVisual heroRef={heroRef} />
                        </Suspense>
                        {/* <p className={styles.visMeta}>
                            fs = 500 Hz &nbsp;·&nbsp; bandpass 30–300 Hz
                        </p> */}
                    </div>
                </aside>
            </div>
        </div>
    )
}
