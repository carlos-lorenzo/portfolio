import { useRef, useState, useEffect, useCallback } from 'react'
import { Element } from 'react-scroll'

import About from './About'
import Experience from './Experience'
import Projects from './Projects'
import Skills from './Skills'
import Footer from './Footer'
import { useActiveSection } from './useActiveSection'
import styles from './Content.module.css'

/**
 * Each section owns an accent. It tints that section's heading rule, its tree
 * spines and its span of the rail — and nothing else. Body text never changes
 * colour, which is what keeps five hues from becoming a mess.
 */
const SECTIONS = [
    { id: 'about-section', accent: 'var(--purple)', el: About },
    { id: 'experience-section', accent: 'var(--green)', el: Experience },
    { id: 'skills-section', accent: 'var(--yellow)', el: Skills },
    { id: 'projects-section', accent: 'var(--cyan)', el: Projects },
] as const

const SECTION_IDS = SECTIONS.map((s) => s.id)

/** Fallback if the CSS custom property cannot be read. --rail-line-h in
 *  _variables.css is the single source of truth for the row height. */
const FALLBACK_LINE_H = 24
/** Sanity guard only — the rail clips overflow, so this never truncates a
 *  realistic page. */
const MAX_LINES = 4000

export default function Content() {
    const contentRef = useRef<HTMLDivElement>(null)
    const [lineCount, setLineCount] = useState(0)
    const active = useActiveSection(SECTION_IDS)

    // Line numbers are derived from the real rendered height of the content
    // column divided by the real line height, both read at measure time. The
    // previous version hard-coded a 22.5px divisor that had to be kept in sync
    // with the stylesheet by hand.
    //
    // The rail is absolutely positioned (see Content.module.css) so it cannot
    // feed its own height back into this measurement.
    const measure = useCallback(() => {
        const el = contentRef.current
        if (!el) return
        // Re-read the row height every time: it is a custom property and may
        // differ across breakpoints.
        const lh =
            parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue('--rail-line-h'),
            ) || FALLBACK_LINE_H
        const h = el.getBoundingClientRect().height
        setLineCount(Math.min(MAX_LINES, Math.max(1, Math.ceil(h / lh))))
    }, [])

    useEffect(() => {
        const el = contentRef.current
        if (!el) return

        measure()

        // ResizeObserver covers everything that changes the column's height:
        // viewport reflow, images finishing, sections expanding, MDX islands
        // hydrating. The MutationObserver that used to sit alongside it was
        // redundant and fired on every text node change.
        const ro = new ResizeObserver(measure)
        ro.observe(el)

        // Web fonts land after first paint and reflow the whole column.
        document.fonts?.ready.then(measure).catch(() => {})

        // Crossing a breakpoint can change --rail-line-h itself, which
        // ResizeObserver would not report if the height happened not to move.
        window.addEventListener('resize', measure)

        return () => {
            ro.disconnect()
            window.removeEventListener('resize', measure)
        }
    }, [measure])

    return (
        <div className={styles.shell}>
            <div className="rail" aria-hidden="true">
                {Array.from({ length: lineCount }, (_, i) => (
                    <span key={i} className="rail__n">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                ))}
            </div>

            <div className={styles.col} ref={contentRef}>
                {SECTIONS.map(({ id, accent, el: SectionBody }) => (
                    <Element
                        key={id}
                        name={id}
                        id={id}
                        className="spine"
                        data-active={active === id}
                        style={
                            {
                                '--accent': accent,
                                scrollMarginTop: 'var(--nav-offset)',
                            } as React.CSSProperties
                        }
                    >
                        <SectionBody />
                    </Element>
                ))}

                <div className="spine" style={{ '--accent': 'var(--pink)' } as React.CSSProperties}>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
