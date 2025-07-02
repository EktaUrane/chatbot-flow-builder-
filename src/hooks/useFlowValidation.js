import { useMemo } from 'react';

// Custom hook for validating the chatbot flow
const useFlowValidation = (nodes, edges) => {
  
  const validation = useMemo(() => {
    // If there's only one node or no nodes, flow is valid
    if (nodes.length <= 1) {
      return { isValid: true, error: null };
    }

    // Check for nodes with empty target handles
    // A node has an empty target handle if no edges connect to it
    const nodesWithEmptyTargets = nodes.filter(node => {
      // Check if any edge has this node as target
      const hasIncomingEdge = edges.some(edge => edge.target === node.id);
      return !hasIncomingEdge;
    });

    // Error condition: More than one node AND more than one node has empty target handles
    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      return {
        isValid: false,
        error: 'Cannot save Flow'
      };
    }

    return { isValid: true, error: null };
  }, [nodes, edges]);

  return validation;
};

export default useFlowValidation;