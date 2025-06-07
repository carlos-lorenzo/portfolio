import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';


import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

import Layout from "@/components/layout"
import Terminal from "@/components/terminal"
import styles from '../styles/home.module.css'

import PortfolioHome from "@/components/PortfolioHome";


export default function Page() {
    const [portfolioInitiated, setPortfolioInitiated] = useState(true);
    const [ init, setInit ] = useState(false);

    const handleInitiate = () => {
        setPortfolioInitiated(true);
    };

     const particlesLoaded = (container?: Container): Promise<void> => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
    <div className={styles.home}>
        
        <Layout>
            <AnimatePresence>
                {!portfolioInitiated ? (
                    <motion.div
                        key="terminal"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 1.5, ease: "easeInOut" } }}
                        className="terminal-container"
                    >
                        <Terminal onInitiate={handleInitiate} />
                    </motion.div>
                ) : (
                    <motion.div
                    key="neural-hub"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } }}
                    className={styles.neuralhub}
                    >
                        <PortfolioHome />
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={{
                            fpsLimit: 60,
                            interactivity: {
                                events: {
                                    onClick: {
                                        enable: true,
                                        mode: "push",
                                    },
                                    onHover: {
                                        enable: true,
                                        mode: "repulse",
                                    },
                                    resize: true,
                                },
                                modes: {
                                    push: {
                                        quantity: 4,
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4,
                                    },
                                },
                            },
                            particles: {
                                color: {
                                    value: "#f1fa8c",
                                },
                                links: {
                                    color: "#f8f8f2",
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.3,
                                    width: 2,
                                },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    random: false,
                                    speed: 2,
                                    straight: false,
                                },
                                number: {
                                    density: {
                                        enable: true,

                                    },
                                    value: 50,
                                },
                                opacity: {
                                    value: 0.5,
                                },
                                shape: {
                                    type: "circle",
                                },
                                size: {
                                    value: { min: 1, max: 5 },
                                },
                            },
                            detectRetina: true,
                        }}
                    />
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    </div>
  );
}