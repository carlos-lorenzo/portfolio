import { useEffect } from "react"
import { animate, motion } from "framer-motion"
import { Node, SubNode } from "./PortfolioHome"

import styles from "../styles/neuralcolumn.module.css"

import NodeC from "./NodeC"
import { init } from "next/dist/compiled/webpack/webpack"




type ILargeNode = {
    node: Node,
    handleSubNodeClick: (node: SubNode) => void,
    initializeNodeAnims: (node: Node) => void,
    initializeSubNodeAnims: (subNode: SubNode) => void
}

export default function LargeNode({ node, handleSubNodeClick, initializeNodeAnims, initializeSubNodeAnims }: ILargeNode) {
    
    
  

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
    

    return (
        <>
            <div className={styles.nodeWrapper}> 
                <motion.div
                    className={styles.neuralNode}
                    ref={node.nodeScope}
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    >
                    <p>{node.title}</p>
                </motion.div>
                <motion.div
                    className={styles.neuralChildrenContainer}>
                    {
                    node.children.map((subNode, subIndex) => (
                        <NodeC 
                            key={subNode.id}
                            subnode={subNode}
                            onClick={handleSubNodeClick}
                            
                        />
                    ))
                }
                </motion.div>
                
            </div>
            <motion.div 
                key={`connector-${node.id}`}
                className={styles.connectorLine}
                ref={node.connectorScope}
            />
        </>
    )
}