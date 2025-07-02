import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from './customNodes/TextNode';
import NodesPanel from './Panels/NodesPanel';
import SettingsPanel from './Panels/SettingsPanel';
import useFlowValidation from '../../hooks/useFlowValidation';
import { createTextNode, isValidConnection, createEdgeId } from '../../utils/flowHelpers';
import './FlowBuilder.css';

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

// Main Flow Builder Component
const FlowBuilder = () => {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // UI state
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Flow validation
  const { isValid, error } = useFlowValidation(nodes, edges);
  
  // Ref for React Flow instance
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowSettings(true);
  }, []);

  // Handle pane click (deselect nodes)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowSettings(false);
  }, []);

  // Handle edge connection with validation
  const onConnect = useCallback((params) => {
    // Validate connection based on business rules
    if (!isValidConnection(params, edges)) {
      return; // Reject invalid connections
    }

    // Create new edge with unique ID
    const newEdge = {
      ...params,
      id: createEdgeId(params.source, params.target),
      type: 'default',
    };

    setEdges((eds) => addEdge(newEdge, eds));
  }, [edges, setEdges]);

  // Handle drag over event for drop zone
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop event to create new nodes
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is a valid node type
      if (typeof type === 'undefined' || !type || type !== 'textNode') {
        return;
      }

      // Calculate position relative to the flow
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create new node
      const newNode = createTextNode(position);
      
      // Add node to the flow
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Update node data (used by settings panel)
  const onUpdateNode = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Handle back button in settings panel
  const handleBack = useCallback(() => {
    setShowSettings(false);
    setSelectedNode(null);
  }, []);

  // Handle save button click
  const handleSave = useCallback(() => {
    if (isValid) {
      alert('Flow saved successfully!');
      // Here you would typically send the flow data to your backend
      console.log('Saving flow:', { nodes, edges });
    }
  }, [isValid, nodes, edges]);

  return (
    <div className="flow-builder">
      {/* Error message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Save button */}
      <div className="save-button-container">
        <button 
          className="save-button"
          onClick={handleSave}
          disabled={!isValid}
        >
          Save Changes
        </button>
      </div>

      {/* Main content area */}
      <div className="flow-content">
        {/* React Flow */}
        <div className="flow-area" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Right sidebar */}
        <div className="sidebar">
          {showSettings ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onUpdateNode={onUpdateNode}
              onBack={handleBack}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;