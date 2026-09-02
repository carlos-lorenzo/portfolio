import { Element } from 'react-scroll'
import Hero from './components/Hero'
import Content from './components/Content'
import Sections from './components/Sections'

export default function Home() {
    return (
        <>
            <a className="skip-link" href="#about-section">
                Skip to content
            </a>

            <main id="home" role="main">
                <Element
                    name="hero-section"
                    id="hero-section"
                    style={{ scrollMarginTop: 'var(--nav-offset)' }}
                >
                    <Hero />
                </Element>

                <Content />
            </main>

            {/* Mobile-only; hidden above 880px. */}
            <Sections />
        </>
    )
}
