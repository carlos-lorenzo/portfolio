import { useState, Fragment } from "react";
import {  motion } from "framer-motion";
import styles from "../styles/content.module.css"

import FullScreenContent from "./FullScreenContent";
import NodeC from "./NodeC";

import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Connect from "./Connect";

export class Node {
    id: string;
    command: string;
    title: string;
    component: React.FC;
    selectionDuration = 0.2;

    constructor(id: string, title: string, command: string, component: React.FC) {
        this.id = id;
        this.title = title;
        this.command = command;
        this.component = component;
    }
}



export default function PortfolioHome() {

    const nodeData = [
        new Node("genesis_node", "Genesis", "profile_scan", About),
        new Node("cognitive_circuits", "Cognitive Circuits", "competencies_analysis", Skills),
        new Node("constructs", "Constructs", "project_extraction", Projects),
        new Node("synaptic_link", "Synaptic Link", "direct_signal", Connect),
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
                        node={expandedNode}
                        onClose={handleCloseFullScreen}>
                        <expandedNode.component />
                    </FullScreenContent>
                )
            }
        </div>
    );
}