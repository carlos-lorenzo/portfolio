import { Element } from 'react-scroll'
import Hero from './components/Hero'
import Content from './components/Content'
import Sections from './components/Sections'

export default function Home() {
    return (
        <main id='home' role='main'>
            <Element
                name='hero-section'
                id='hero-section'
                style={{ scrollMarginTop: 'var(--nav-offset)' }}
            >
                <Hero />
            </Element>
            <Content />
            
            <Sections />

        </main>
    )
}
