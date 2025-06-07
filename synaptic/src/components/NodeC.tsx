// src/components/Node.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from "../styles/nodes.module.css"

import { Node } from './PortfolioHome';

interface NodeProps {
  node: Node;
  onClick: (node: Node) => void;
  
}

const NodeC: React.FC<NodeProps> = ({ node, onClick }) => {
    return (
        <motion.div
			className={styles.node}
			onClick={() => onClick(node)}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			whileHover={{ boxShadow: "0 0 10px rgba(241, 250, 140, 1)" }}
			whileTap={{ scale: 0.95 }}
        >
        	<p>{node.title}</p>
        </motion.div>
    );
};

export default NodeC;