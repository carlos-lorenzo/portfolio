import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently being read.
 *
 * Drives the rail's spine — the only scroll-spy on the site. An
 * IntersectionObserver with a narrow band near the top of the viewport,
 * rather than a scroll listener recomputing every element's rect on every
 * frame.
 */
export function useActiveSection(ids: string[], fallback = ids[0]): string {
    const [active, setActive] = useState(fallback)

    useEffect(() => {
        const els = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)

        if (els.length === 0) return

        const visible = new Set<string>()

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visible.add(entry.target.id)
                    else visible.delete(entry.target.id)
                }
                // Of everything currently in the band, take the last in document
                // order — that is the one being scrolled into.
                const current = ids.filter((id) => visible.has(id)).pop()
                if (current) setActive(current)
            },
            // A band roughly a tenth to a third of the way down the viewport.
            { rootMargin: '-10% 0px -68% 0px', threshold: 0 },
        )

        els.forEach((el) => observer.observe(el))

        // At the very bottom of the page the last section may never enter the
        // band, so pin it explicitly.
        const onScroll = () => {
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4
            if (atBottom) setActive(ids[ids.length - 1])
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', onScroll)
        }
    }, [ids.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps

    return active
}
