import { Element } from 'react-scroll'
import Hero from './components/Hero'
import Content from './components/Content'
import Sections from './components/Sections'
import { NAV_OFFSET_PX } from './components/scrollConfig'

export default function Home() {
    return (
        <div id='home'>
            <Element
                name='hero-section'
                id='hero-section'
                style={{ scrollMarginTop: NAV_OFFSET_PX }}
            >
                <Hero />
            </Element>
            <Content />
            
            <Sections />

        </div>
    )
}
