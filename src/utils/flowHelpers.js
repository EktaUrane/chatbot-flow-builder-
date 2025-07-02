import { v4 as uuidv4 } from 'uuid';

// Utility functions for flow management

// Create a new text node with default properties
export const createTextNode = (position) => {
  const id = uuidv4();
  return {
    id,
    type: 'textNode',
    position,
    data: {
      text: `test message ${Math.floor(Math.random() * 100)}`
    }
  };
};

// Check if a connection is valid based on business rules
export const isValidConnection = (connection, edges) => {
  const { source, sourceHandle, target, targetHandle } = connection;
  
  // Prevent self-connection
  if (source === target) {
    return false;
  }
  
  // Check if source handle already has an outgoing connection
  // Source handles can only have ONE outgoing edge
  const sourceHasConnection = edges.some(
    edge => edge.source === source && edge.sourceHandle === sourceHandle
  );
  
  if (sourceHasConnection) {
    return false;
  }
  
  // Target handles can have multiple incoming connections, so always allow
  return true;
};

// Get edges connected to a specific node
export const getConnectedEdges = (nodeId, edges) => {
  return edges.filter(edge => edge.source === nodeId || edge.target === nodeId);
};

// Remove edges when a node is deleted
export const removeConnectedEdges = (nodeId, edges) => {
  return edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
};

// Generate a unique edge ID
export const createEdgeId = (source, target) => {
  return `${source}-${target}`;
};