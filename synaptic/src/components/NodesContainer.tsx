// src/components/NodesContainer.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Still motion.div for container, but no layout prop needed here
import TestNode from './TestNode';
import FullScreenContent from './FullScreenContent';
import Node from './Node';

const nodeData = [
  { id: '1', color: '#ff6b6b', content: 'Content for Node 1' },
  { id: '2', color: '#4ecdc4', content: 'Content for Node 2' },
  { id: '3', color: '#45b7d1', content: 'Content for Node 3' },
  { id: '4', color: '#f7ee70', content: 'Content for Node 4' },
];

const NodesContainer: React.FC = () => {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setExpandedNodeId(id);
  };

  const handleCloseFullScreen = () => {
    setExpandedNodeId(null);
  };

  const selectedNode = expandedNodeId
    ? nodeData.find(node => node.id === expandedNodeId)
    : null;

  return (
    <div className="nodes-page-container"> {/* Changed from motion.div, as layout is handled by individual components */}
      {/* Render the nodes */}
      <div className="nodes-grid">
        {nodeData.map((node) => (
          <Node
            key={node.id}
            id={node.id}   
            onClick={handleNodeClick}
          />
        ))}
      </div>

      {/* Render FullScreenContent if a node is expanded */}
      {selectedNode && (
        <FullScreenContent
          id={selectedNode.id}
          onClose={handleCloseFullScreen}
        >
          <h2>{`Details for Node ${selectedNode.id}`}</h2>
          <p>{selectedNode.content}</p>
          {/* Add more detailed content here */}
        </FullScreenContent>
      )}
    </div>
  );
};

export default NodesContainer;