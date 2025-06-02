import React, { useEffect, useState, Fragment } from 'react';
import { AnimatePresence, motion, number, scale, useAnimationControls, AnimationControls } from 'framer-motion'; // Optional, for animations
import styles from '../styles/neuralcolumn.module.css';
import { div, p } from 'framer-motion/client';


class SubNode {
	id: string;
	// component
	controller: AnimationControls;

	constructor(id: string, controller: AnimationControls) {
		this.id = id;
		this.controller = controller;
	}

}

class Node {
	id: string;
	title: string;
	description: string;
	children: SubNode[];
	controller: AnimationControls;

	constructor(id: string, title: string, description: string, children: SubNode[], controller: AnimationControls) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.children = children;
		this.controller = controller;
	}
}




const NeuralColumn = () => {
	const nodesData = [
	new Node('genesis', 'Genesis Node', 'About Me', [new SubNode('Core', useAnimationControls()), new SubNode('Problem-Solving', useAnimationControls()), new SubNode('System Status', useAnimationControls())], useAnimationControls()),
	new Node('cognitive', 'Cognitive Circuits', 'Skills', [new SubNode('Skill A', useAnimationControls()), new SubNode('Skill B', useAnimationControls())], useAnimationControls()),
	new Node('constructs', 'Constructs', 'Projects', [new SubNode('Project A', useAnimationControls()), new SubNode('Project B', useAnimationControls())], useAnimationControls()),
	new Node('contact', 'Contact', 'Contact', [new SubNode('Github', useAnimationControls()), new SubNode('LinkedIn', useAnimationControls())], useAnimationControls()),
];

	const connectorControllers = [useAnimationControls(), useAnimationControls(), useAnimationControls()];

	const [selectedNode, setSelectedNode] = useState<number>(-1);
	const [selectedSubNode, setSelectedSubNode] = useState<number[]>([-1, -1]);

	const handleNodeClick = (e: React.MouseEvent, index: number) => {
		if (selectedNode === index) {
			connectorControllers[index].start('contracted');
			setSelectedNode(-1);
			return;
		}
		setSelectedNode(index);
		connectorControllers[index].start('expanded');
	}


	function handleSubNodeClick(indices: number[]) {
		if (selectedSubNode === indices) {
			setSelectedSubNode([-1, -1]);
			nodesData[indices[0]].children[indices[1]].controller.start('displayed');
			return;
		}
		setSelectedSubNode(indices);
		nodesData[indices[0]].children[indices[1]].controller.start('selected');


	}

	// useEffect(() => {
	// 	controls.forEach((control) => {
	// 		control.start('unselected');
	// 	});
	// })

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
							height: "50dvh",
						}
					}}
				/>
			}
          <div className={styles.nodeWrapper}> {/* New wrapper */}
				<motion.div
					className={styles.neuralNode}
					onClick={(e) => handleNodeClick(e, index)}
					animate={node.controller}
				>
				{/* Node content */}
				</motion.div>
				{selectedNode === index && (
				<motion.div className={styles.neuralChildrenContainer}> {/* New container for children */}
					{node.children.map((subNode, subIndex) => (
					<motion.div
						className={styles.neuralSubNode}
						key={subNode.id}
						onClick={() => handleSubNodeClick([index, subIndex])}
					>
						{/* Sub-node content */}
					</motion.div>
					))}
				</motion.div>
				)}
			</div>
		</Fragment>
      ))}
    </motion.div>
  );
};


export default NeuralColumn;