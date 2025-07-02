import React, { useState, useEffect } from 'react';

// Settings panel for editing selected node properties
const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  const [text, setText] = useState('');

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode?.data?.text) {
      setText(selectedNode.data.text);
    } else {
      setText('');
    }
  }, [selectedNode]);

  // Handle text input changes
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    
    // Update the node data in real-time
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { text: newText });
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <button className="back-button" onClick={onBack}>
          ← 
        </button>
        <h3>Message</h3>
      </div>
      
      <div className="settings-content">
        <div className="form-group">
          <label htmlFor="message-text">Text</label>
          <textarea
            id="message-text"
            className="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your message here..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;   