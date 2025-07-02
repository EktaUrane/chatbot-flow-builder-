import React from 'react';

// Panel containing all available node types for drag and drop
const NodesPanel = () => {
  
  // Handle drag start event to enable drag and drop functionality
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes Panel</h3>
      </div>
      
      <div className="nodes-list">
        {/* Message Node - Draggable */}
        <div
          className="node-item"
          onDragStart={(event) => onDragStart(event, 'textNode')}
          draggable
        >
          <div className="node-preview">
            <div className="node-icon">💬</div>
            <span>Message</span>
          </div>
          <div className="drag-hint">Drag to add</div>
        </div>
        
        {/* Future node types can be added here */}
        {/* This design makes it extensible for new node types */}
      </div>
    </div>
  );
};

export default NodesPanel;