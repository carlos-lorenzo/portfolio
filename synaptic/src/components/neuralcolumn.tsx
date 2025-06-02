import React, { useEffect, useState, Fragment, use } from 'react';
import { AnimatePresence, motion, number, scale, useAnimationControls, AnimationControls } from 'framer-motion'; // Optional, for animations
import styles from '../styles/neuralcolumn.module.css';
import { sub } from 'framer-motion/client';







const NeuralColumn = () => {
	class SubNode {
		id: string;
		// component
		controller: AnimationControls;
		selected: boolean;

		constructor(id: string) {
			this.id = id;
			this.controller = useAnimationControls();
			this.selected = false;
		}

	}

	class Node {
		id: string;
		title: string;
		description: string;
		children: SubNode[];
		controller: AnimationControls;
		selected: boolean;

		constructor(id: string, title: string, description: string, children: SubNode[]) {
			this.id = id;
			this.title = title;
			this.description = description;
			this.children = children;
			this.controller = useAnimationControls();
			this.selected = false;
		}
	}

	const nodesData = [
		new Node('genesis', 'Genesis Node', 'About Me', [new SubNode('Core'), new SubNode('Problem-Solving'), new SubNode('System Status')]),
		new Node('cognitive', 'Cognitive Circuits', 'Skills', [new SubNode('Skill A'), new SubNode('Skill B')]),
		new Node('constructs', 'Constructs', 'Projects', [new SubNode('Project A'), new SubNode('Project B')]),
		new Node('contact', 'Contact', 'Contact', [new SubNode('Github'), new SubNode('LinkedIn')]),
	];

	const connectorControllers = [useAnimationControls(), useAnimationControls(), useAnimationControls(), useAnimationControls()];
	
	function handleNodeClick(node: Node, index: number) {
		node.selected = !node.selected;
		node.controller.start(node.selected ? "expanded" : "contracted");
		node.children.forEach((subNode) => {
			subNode.selected = node.selected;
			subNode.controller.start(node.selected ? "shown" : "hidden");
		})
		for (let i = 0; i < connectorControllers.length; i++) {
			if (i === index) {
				connectorControllers[i].start(node.selected ? "expanded" : "contracted");
			}
		}
	}

	function handleSubNodeClick(node: Node, subNode: SubNode) {
		subNode.selected = !subNode.selected;
		subNode.controller.start(subNode.selected ? "selected" : "shown");

		node.children.forEach((subNodeLoop) => {
			if (subNodeLoop.id !== subNode.id) {
				if (subNode.selected) {
					subNodeLoop.selected = false;
					subNodeLoop.controller.start("hidden");
				} else {
					subNodeLoop.controller.start("shown");
				}
				
			}
		})



	}

	function displacementByIndex(index: number, number_children: number) {
		if (number_children === 1) {
			return index;
		}
		if (number_children === 2) {
			if (index === 0) {
				return 1;
			}
			if (index === 1) {
				return 0.5;
			}
		}

		if (number_children === 3) {
			if (index === 0) {
				return 1;
			}
			if (index === 1) {
				return 1;
			}
			if (index === 2) {
				return 0.5;
			}
		}
		
		return 0;
	}

	

	return (
		<motion.div className={styles.neuralColumnContainer}>
		{nodesData.map((node, index) => (
			<Fragment key={node.id}>
				{index > 0 && <motion.div 
					className={styles.connectorLine} 
					animate={connectorControllers[index - 1]}
					variants={
						{
							contracted: {
								height: "15dvh",
							},
							expanded: {
								height: "65dvh",
							}
						}}
					/>
				}
			<div className={styles.nodeWrapper}> {/* New wrapper */}
					<motion.div
						className={styles.neuralNode}
						onClick={() => handleNodeClick(node, index)}
						animate={node.controller}
						variants={{
							contracted: {
								scale: 1,
								
							},
							expanded: {
								scale: 1.1,
							
							}
						}}
						>
					{/* Node content */}
					</motion.div>
					
					{true && (
					<motion.div className={styles.neuralChildrenContainer}> {/* New container for children */}
						<AnimatePresence>
						{node.children.map((subNode, subIndex) => (
							<motion.div
								className={styles.neuralSubNode}
								key={subNode.id}
								animate={subNode.controller}
								onClick={() => handleSubNodeClick(node, subNode)}
								initial="hidden"
								variants={{
									hidden: {
										opacity: 0,
										y: "50%",
										
										position: "relative", // Initial position
										// ... (other properties like scale, etc., from previous discussion)
										width: "15dvh", // Keep initial size consistent for 'hidden' if it's the default
										height: "15dvh",
										borderRadius: "50%",
									},
									shown: {
										width: "15dvh",
										height: "15dvh",
										borderRadius: "50%",
										opacity: 1,
										position: "relative",
										y: `${40 + (subIndex) * 5}dvh`, // This y value is specific to its 'shown' position in the column
										
									},
									selected: {
										width: "80vw",  // Your desired width when selected
										height: "50dvh", // Your desired height when selected
										borderRadius: "5px",
										opacity: 1,
										position: "absolute",
										y: `${40 + (displacementByIndex(subIndex, node.children.length)) * 5}dvh`,
								
							
									},
							
							}}
							>
							<p>{subNode.id}</p>
						</motion.div>
						))}
						</AnimatePresence>
					</motion.div>
					)}
					
				</div>
			</Fragment>
		))}
		{true && <motion.div 
			className={styles.connectorLine} 
			animate={connectorControllers[nodesData.length - 1]}
			variants={
				{
					contracted: {
						height: "15dvh",
					},
					expanded: {
						height: "65dvh",
					}
				}}
			/>
		}
		</motion.div>
 	);
};


export default NeuralColumn;