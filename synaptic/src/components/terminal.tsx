import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Typewriter from 'typewriter-effect';
import { JetBrains_Mono } from 'next/font/google';
import styles from '../styles/terminal.module.css'
import { on } from 'events';


const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'] 
})

export default function Terminal({ onInitiate }: { onInitiate: () => void }) {
    const [cueShown, setCueShown] = useState(false);
    
    function startApp() {
        setCueShown(false);
        onInitiate();
    }

    

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                setCueShown(false);
                onInitiate();
            }
        })
    }, [onInitiate]);

    return (
        
        <>
        <p className={styles.skip} onClick={() => startApp()} style={{ display: !cueShown ? 'block' : 'none' }}>Skip ▶</p>
        
        
        <div id='terminal' className={jetBrainsMono.className + ' ' + styles.terminal} onClick={() => startApp()}>
            <span className={styles.Typewriter}>
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
                    .deleteAll()
                    typewriter.typeString('<span style="color: #ff5555;">System</span> Ready.')
                    .pauseFor(1000)
                    .deleteAll()
                    typewriter.pasteString('>> <span style="color: #8be9fd;">guest@carloslorenzo.dev</span> :~$ ', null)
                    .pauseFor(1000)
                    typewriter.changeDelay(100)
                    typewriter.typeString('<span style="color: #6272a4;">initiate_portfolio</span>')
                    .pauseFor(3000)
                    .callFunction(() => setCueShown(true))                 
                    .start();
                }}
            />
            </span>
            
            <AnimatePresence>
               
            {cueShown && 
                <motion.p key="modal"  
                id={styles.textCue}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.75 }}
                transition={{ duration: 1 }}
                exit={{ y: 0, opacity: 0 }} >
                    (Press ENTER or click to initiate)
                </motion.p>
            }       
            </AnimatePresence>
        </div>
        </>
    )
}