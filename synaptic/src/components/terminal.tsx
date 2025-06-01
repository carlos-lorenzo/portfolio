import { useState } from 'react';


import Typewriter from 'typewriter-effect';
import { JetBrains_Mono } from 'next/font/google';
import styles from '../styles/terminal.module.css'

const jetBrainsMono = JetBrains_Mono({
     subsets: ['latin'] 
})

export default function Terminal({ onInitiate }: { onInitiate: () => void }) {
    const [cueShown, setCueShown] = useState(false);

    return (
        <div id='terminal' className={jetBrainsMono.className + ' ' + styles.terminal}>
            <Typewriter
                options={{
                    delay: 30,
                    deleteSpeed: 0
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('<span style="color: #50fa7b;">Initializing</span> cognitive_matrix...')
                    .pauseFor(500)
                    .deleteAll()
                    typewriter.typeString('<span style="color: #50fa7b;">Compiling</span> experiential_data...')
                    .pauseFor(500)
                    .deleteAll()
                    typewriter.typeString('<span style="color: #50fa7b;">Calibrating</span> problem_solving_algorithms...')
                    .pauseFor(500)
                    .deleteAll()
                    typewriter.typeString('<span style="color: #50fa7b;">Establishing</span> neural_link_to <span style="color: #8be9fd;"><b>Carlos Lorenzo-Zúñiga Marí</b></span>...')
                    .pauseFor(500)
                    .deleteAll(0)
                    typewriter.typeString('<span style="color: #ff5555;">System</span> Ready.')
                    .pauseFor(1000)
                    .deleteAll()
                    typewriter.pasteString('>> <span style="color: #8be9fd;">guest@carloslorenzo.dev</span> :~$ ')
                    .pauseFor(1000)
                    typewriter.changeDelay(50)
                    typewriter.typeString('<span style="color: #6272a4;">initiate_portfolio</span>')
                    .pauseFor(1000)
                    .callFunction(() => onInitiate())                 
                    .start();
                }}
            />
            <p id={styles.cue} style={{ display: cueShown ? 'block' : 'none' }}>(Press ENTER to continue)</p>
        </div>
    )
}