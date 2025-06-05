// src/components/FullScreenContent.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/content.module.css';
import { JetBrains_Mono } from 'next/font/google';
import Typewriter from 'typewriter-effect';

interface FullScreenContentProps {
  id: string; // The ID of the expanded node
  onClose: () => void;
  children: React.ReactNode;
}

const jetBrainsMono = JetBrains_Mono({
	 subsets: ['latin'] 
})

const FullScreenContent: React.FC<FullScreenContentProps> = ({ id, onClose, children }) => {
  return (
    <AnimatePresence>
		<motion.div
		
		className={styles["full-screen-overlay"]}
		// Note: initial/animate/exit are typically not needed for the layout-driven parts
		// Framer Motion handles the position/size/border-radius based on layoutId.
		// We'll use them for content fading or specific visual cues if needed.
		initial={{ opacity: 1 }} // Fade in the overlay itself
		animate={{ opacity: 1 }}
		exit={{ opacity: 1 }}
		transition={{ type: "spring", stiffness: 300, damping: 30 }}
		onClick={onClose} // Close when clicking the background
		>
			<div id={styles["content-wrapper"]}>
				<div id={`${styles["directory-info"]}`}>
					<Typewriter
					options={{
						delay: 30,
						deleteSpeed: 0
					}}
					onInit={(typewriter) => {
						typewriter.typeString(`>> <span style="color: #8be9fd;">guest@carloslorenzo.dev</span><b>:~</b><span style="color: #8be9fd;">/${id}</span>$ <span style="color: #50fa7b;">execute</span> profile_scan`)
						.start();
					}}
					/>
				</div>
				<motion.div
					className={styles["content-card"]}
					initial={{ opacity: 0, y: "100%" }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 1, y: "100%" }}
					transition={{ delay: 0.2, duration: 0.3 }} // Delay content animation until overlay is somewhat expanded
					onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
				>
					{children}
				</motion.div>
			</div>
		</motion.div>
    </AnimatePresence>
  );
};

export default FullScreenContent;