import React from 'react';
import { Handle, Position } from 'reactflow';

// Custom Text Node component for the chatbot flow
const TextNode = ({ data, selected }) => {
  return (
    <div className={`text-node ${selected ? 'selected' : ''}`}>
      {/* Target Handle - allows multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="target-handle"
        isConnectable={true}
      />
      
      {/* Node Header */}
      <div className="node-header">
        <div className="node-icon">💬</div>
        <span className="node-title">Send Message</span>
        <div className="whatsapp-icon">📱</div>
      </div>
      
      {/* Node Body - displays the message text */}
      <div className="node-body">
        <div className="message-text">
          {data?.text || 'Enter your message here...'}
        </div>
      </div>
      
      {/* Source Handle - only one outgoing connection allowed */}
      <Handle
        type="source"
        position={Position.Right}
        className="source-handle"
        isConnectable={true}
      />
    </div>
  );
};

export default TextNode;