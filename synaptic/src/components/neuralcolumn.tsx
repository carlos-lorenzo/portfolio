import React, { useEffect, useState, Fragment, use } from 'react';
import { useAnimate, motion, animate, easeIn, easeInOut, scale } from 'framer-motion';
import styles from '../styles/neuralcolumn.module.css';
import { sub } from 'framer-motion/client';


const NeuralColumn = () => {
	class SubNode {
		id: string;
		selected: boolean;
		scope: React.RefObject<HTMLDivElement>;
		subNodeAnimate: typeof animate
		selectionDuration = 0.2;

		constructor(id: string) {
			this.id = id;
			this.selected = false;
			[this.scope, this.subNodeAnimate] = useAnimate();
		}

	}

	class Node {
		id: string;
		title: string;
		description: string;
		children: SubNode[];
		selected: boolean;

		nodeScope: React.RefObject<HTMLDivElement>;
		nodeAnimate: typeof animate;

		connectorScope: React.RefObject<HTMLDivElement>;
		connectorAnimate: typeof animate;
		
		selectionDuration = 0.2;

		constructor(id: string, title: string, description: string, children: SubNode[]) {
			this.id = id;
			this.title = title;
			this.description = description;
			this.children = children;
			this.selected = false;
			[this.nodeScope, this.nodeAnimate] = useAnimate();
			[this.connectorScope, this.connectorAnimate] = useAnimate();
			
		}

	}


	let nodeData = [
		new Node('genesis', 'Genesis Node', 'About Me', [new SubNode('Core'), new SubNode('Problem-Solving'), new SubNode('System Status')]),
		new Node('cognitive', 'Cognitive Circuits', 'Skills', [new SubNode('Skill A'), new SubNode('Skill B')]),
		new Node('constructs', 'Constructs', 'Projects', [new SubNode('Project A'), new SubNode('Project B')]),
		new Node('contact', 'Contact', 'Contact', [new SubNode('Github'), new SubNode('LinkedIn')]),
	];

	function initializeNodeAnims(node: Node) {
		node.nodeAnimate(node.nodeScope.current, 
				{scale: 1}, 
				{ duration: node.selectionDuration, ease: "easeInOut" },
			);
		node.connectorAnimate(node.connectorScope.current, 
			{ height: '25dvh', opacity: 0.5 }, 
			{ duration: node.selectionDuration, ease: "easeInOut" },
		);

		node.children.forEach((subNodeLoop, index) => {	
			initializeSubNodeAnims(subNodeLoop);
		})
	}


	function initializeSubNodeAnims(subNode: SubNode) {
		subNode.selected = false;
		subNode.subNodeAnimate(subNode.scope.current, 
			{ opacity: 0, y: `100%`, scale: 1 },
			{ duration: subNode.selectionDuration, ease: "easeInOut" }
		);
	}


	function handleNodeClick(node: Node) {
		node.selected = !node.selected;
		if (node.selected) {
			node.nodeAnimate(node.nodeScope.current, 
				{ scale: 1.1 }, 
				{ duration: node.selectionDuration, ease: "easeInOut" },
			);
			node.connectorAnimate(node.connectorScope.current, 
				{ height: '70dvh', opacity: 1 }, 
				{ duration: node.selectionDuration, ease: "easeInOut" },
			);
			node.children.forEach((subNodeLoop, index) => {
				subNodeLoop.selected = false;
				subNodeLoop.subNodeAnimate(subNodeLoop.scope.current, 
					{ opacity: 1, y: `${40 + index * 5}dvh`, scale: 1 },
					{ duration: node.selectionDuration, ease: "easeInOut" },);
				
			})
			
			
			

		} else {
			initializeNodeAnims(node);
		}
	}

	async function handleSubNodeClick(node: Node, subNode: SubNode, subIndex: number) {
		subNode.selected = !subNode.selected;

		if (subNode.selected) {
			subNode.subNodeAnimate(subNode.scope.current,
				{ opacity: 1, y: "45dvh", scale: 1.1 },
				{ duration: node.selectionDuration, ease: "easeInOut" },
			)
			node.children.forEach((subNodeLoop, index) => {
				if (index !== subIndex) {
					subNodeLoop.subNodeAnimate(subNodeLoop.scope.current,
						{ opacity: 0, y: 0, scale: 1 },
						{ duration: node.selectionDuration, ease: "easeInOut" },
					)
				}
			})
		} else {
			node.children.forEach((subNodeLoop, index) => {
				subNodeLoop.selected = false;
				subNodeLoop.subNodeAnimate(subNodeLoop.scope.current, 
					{ opacity: 1, y: `${40 + index * 5}dvh`, scale: 1 },
					{ duration: node.selectionDuration, ease: "easeInOut" },);
				
			})
		}
		
	}

	useEffect(() => {
		nodeData.forEach((node) => {
			initializeNodeAnims(node);
		})
	}, []);


	return (
		<motion.div className={styles.neuralColumnContainer}>
		{nodeData.map((node, index) => (
			<>
				<div className={styles.nodeWrapper}> 
					<motion.div
						className={styles.neuralNode}
						
						ref={node.nodeScope}
						key={`node-${index}`}
						onClick={() => handleNodeClick(node)}
						>
						<p>{node.title}</p>
					</motion.div>
					<motion.div
						className={styles.neuralChildrenContainer}>
						{
						node.children.map((subNode, subIndex) => (
							<motion.div
								className={styles.neuralSubNode}
								ref={subNode.scope}
								key={`subnode-${index}`}
								onClick={() => handleSubNodeClick(node, subNode, subIndex)}
								>
								<p>{subNode.id}</p>
							</motion.div>
						))
					}
					</motion.div>
					
				</div>
				<motion.div 
					key={`connector-${index}`}
					className={styles.connectorLine}
					ref={node.connectorScope}
				/>
			</>
		))}
		</motion.div>
 	);
};


export default NeuralColumn;