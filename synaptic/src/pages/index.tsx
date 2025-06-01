import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Layout from "@/components/layout"
import Terminal from "@/components/terminal"
import styles from '../styles/home.module.css'
import NeuralColumn from '@/components/neuralcolumn';


export default function Page() {
    const [portfolioInitiated, setPortfolioInitiated] = useState(true);

    const handleInitiate = () => {
        setPortfolioInitiated(true);
    };

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
                <NeuralColumn />
            </motion.div>
        )}
    </AnimatePresence>
    </Layout>
    </div>
  );
}