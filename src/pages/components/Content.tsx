import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { Element } from 'react-scroll'

import About from './About'
import Projects from './Projects'
import Skills from './Skills'
import Footer from './Footer'
import styles from "./Content.module.css"

export default function Content() {
    const contentRef = useRef<HTMLDivElement>(null)
    const [lineCount, setLineCount] = useState(1)

    const updateLineCount = useCallback(() => {
        if (!contentRef.current) return
        const contentHeight = contentRef.current.scrollHeight
        const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight) || 25.6
        setLineCount(Math.max(1, Math.ceil(contentHeight / lineHeight)))
    }, [])

    useEffect(() => {
        const el = contentRef.current
        if (!el) return

        updateLineCount()

        const observer = new ResizeObserver(updateLineCount)
        observer.observe(el)

        const mutationObserver = new MutationObserver(updateLineCount)
        mutationObserver.observe(el, { childList: true, subtree: true, characterData: true })

        return () => {
            observer.disconnect()
            mutationObserver.disconnect()
        }
    }, [updateLineCount])

    return (
        <div id={styles.mainContentParent}>
            <div id={styles.lineNumbers} aria-hidden="true">
                {Array.from({ length: lineCount }, (_, i) => (
                    <motion.span
                        key={i + 1}
                        className={styles.lineNumber}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.2, delay: Math.min(i * 0.005, 0.5) }}
                    >
                        {i + 1}
                    </motion.span>
                ))}
            </div>
            <div id={styles.mainContent} ref={contentRef}>
                <Element name='about-section'>
                    <About />
                </Element>
                <Element name='skills-section'>
                    <Skills />
                </Element>
                <Element name='projects-section'>
                    <Projects />
                </Element>

                <Footer />
            </div>
        </div>
    )
}
