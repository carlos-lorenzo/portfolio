import { useState, Fragment } from "react";
import { useAnimate, animate, motion } from "framer-motion";
import styles from "../styles/content.module.css"

import FullScreenContent from "./FullScreenContent";
import NodeC from "./NodeC";


export class SubNode {
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

export class Node {
    id: string;
    title: string;
    description: string;
    
    selectionDuration = 0.2;

    constructor(id: string, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        
        
    }

}



export default function PortfolioHome() {

    const nodeData = [
        new Node("genesis_node", "Node 1", "Description for Node 1"),
        new Node("Skills", "Node 2", "Description for Node 2"),
    ];

    const [expandedNode, setExpandedNode] = useState<Node | null>(null);

    const handleSubNodeClick = (node: Node) => {
        setExpandedNode(node);
    };

    const handleCloseFullScreen = () => {
        setExpandedNode(null);
        

    };



   


    return (
        <div className={styles["nodes-page-container"]}> {/* Changed from motion.div, as layout is handled by individual components */}
            {/* Render the nodes */}
            
            {nodeData.map((node, index) => (
                <Fragment key={node.id}>
                
                {index > 0 && (
                    <motion.div 
                        key={`connector-${index}`}
                        className={styles.connectorLine}
				    />
                )
                }
                <NodeC node={node} onClick={handleSubNodeClick} />
                </Fragment>
            ))}
            {
                expandedNode !== null && (
                    <FullScreenContent 
                        id={expandedNode.id} 
                        onClose={handleCloseFullScreen}>
                        <p>{expandedNode.description}</p>
                    </FullScreenContent>
                )
            }
        </div>
    );
}