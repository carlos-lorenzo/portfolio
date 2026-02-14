import { Element } from 'react-scroll'
import Hero from './components/Hero'
import Content from './components/Content'
import Sections from './components/Sections'

export default function Home() {
    return (
        <div id='home'>
            <Element name='hero-section'>
                <Hero />
            </Element>
            <Content />
            
            <Sections />

        </div>
    )
}
