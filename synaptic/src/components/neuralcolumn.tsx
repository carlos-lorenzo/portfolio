import React, { useEffect, useState } from 'react';
import { motion, number, scale, useAnimationControls } from 'framer-motion'; // Optional, for animations
import styles from '../styles/neuralcolumn.module.css';

const nodesData = [
  { id: 'genesis', title: 'Genesis Node', description: 'About Me' },
  { id: 'cognitive', title: 'Cognitive Circuits', description: 'Skills' },
  { id: 'constructs', title: 'Constructs', description: 'Projects' },
  { id: 'contact', title: 'Contact / Network', description: 'Reach Out' },
];

const NeuralColumn = () => {
	const [selectedNode, setSelectedNode] = useState<number>(-1);
	const controls = [useAnimationControls(), useAnimationControls(), useAnimationControls(), useAnimationControls()];

	const handleNodeClick = (index: number) => {
		
		if (selectedNode === index) {
			controls[index].start('unselected');
			return;
		}
		controls[index].start('selected');
		setSelectedNode(index);
	}
	// useEffect(() => {
	// 	controls.forEach((control) => {
	// 		control.start('unselected');
	// 	});
	// })

	return (
		<div className={styles.neuralColumnContainer}>
			{nodesData.map((node, index) => (
			<React.Fragment key={node.id}>
				{/* Render the vertical line connector */}
				{index > 0 && (
				<motion.div
					className={styles.connectorLine}
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 0.5, delay: index * 0.2 }}
				></motion.div>
				)}
				{/* Render the circle node */}
				<motion.div
				className={styles.neuralNode}
				animate={controls[index]}
				transition={{ duration: 0.1, }}
				variants={{
					unselected: {
						borderRadius: '50%',
						opacity: 1,
						y: 0,
					},
					selected: {
						borderRadius: '10px',				
					},
				}}
				onClick={() => handleNodeClick(index)}
				>
					<div className={styles.nodeIcon}>{/* Icon for the node */}</div>
					<h3 className={styles.nodeTitle}>{node.title}</h3>
					<p className={styles.nodeDescription}>{node.description}</p>
				</motion.div>
			</React.Fragment>
			))}
		</div>
	);
};

export default NeuralColumn;