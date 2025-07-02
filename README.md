# Chatbot Flow Builder

A React-based visual flow builder for creating chatbot conversations using drag-and-drop interface.

## 🚀 Live Demo

[View Live Demo](https://chatbot-flow-builder-ektaurane669-4138-ekta-uranes-projects.vercel.app/)

## ✨ Features

- **Visual Flow Builder**: Drag and drop interface for creating chatbot flows
- **Text Nodes**: Send message nodes with customizable text content
- **Connection System**: Connect nodes with validated edge connections
- **Smart Validation**: Prevents invalid connections and validates flow structure
- **Settings Panel**: Edit node properties with an intuitive interface
- **Extensible Design**: Easy to add new node types in the future
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **React Flow** - Flow diagram library
- **UUID** - Unique ID generation
- **CSS3** - Styling and animations

## 📋 Requirements Met

### Core Features
- ✅ Text Node implementation
- ✅ Drag and drop from Nodes Panel
- ✅ Edge connections between nodes
- ✅ Source handle (one outgoing edge only)
- ✅ Target handle (multiple incoming edges)
- ✅ Settings panel for editing nodes
- ✅ Save functionality with validation

### Business Rules
- ✅ Only one edge from source handle
- ✅ Multiple edges to target handle allowed
- ✅ Error shown when: More than one node AND more than one node has empty target handles
- ✅ Settings panel replaces nodes panel when node selected

### Technical Requirements
- ✅ Built with React and React Flow
- ✅ Extensible architecture for new node types
- ✅ Clean, commented code
- ✅ Responsive design

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chatbot-flow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   └── FlowBuilder/
│       ├── FlowBuilder.jsx          # Main flow builder component
│       ├── FlowBuilder.css          # Styles for flow builder
│       ├── CustomNodes/
│       │   └── TextNode.jsx         # Custom text node component
│       └── Panels/
│           ├── NodesPanel.jsx       # Draggable nodes panel
│           └── SettingsPanel.jsx    # Node settings panel
├── hooks/
│   └── useFlowValidation.js         # Flow validation logic
├── utils/
│   └── flowHelpers.js               # Utility functions
├── App.js                           # Main app component
├── App.css                          # Global styles
└── index.js                         # Entry point
```

## 🎯 How to Use

### Creating Nodes
1. Drag the "Message" node from the **Nodes Panel** on the right
2. Drop it anywhere on the canvas to create a new text node
3. Click on a node to select and edit it

### Editing Nodes
1. Click on any node to select it
2. The **Settings Panel** will appear on the right
3. Edit the message text in the text area
4. Use the back arrow to return to the nodes panel

### Connecting Nodes
1. Drag from the **source handle** (right side of node) to the **target handle** (left side of another node)
2. Each source handle can only have **one outgoing connection**
3. Target handles can have **multiple incoming connections**

### Saving Flow
1. Click the **"Save Changes"** button in the top-right corner
2. The save will only work if the flow is valid
3. **Error condition**: More than one node exists AND more than one node has empty target handles

## 🔧 Architecture & Extensibility

### Adding New Node Types

The architecture is designed to be extensible. To add a new node type:

1. **Create the node component** in `CustomNodes/`:
```jsx
// CustomNodes/NewNodeType.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

const NewNodeType = ({ data, selected }) => {
  return (
    <div className={`new-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      {/* Your node content */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default NewNodeType;
```

2. **Register the node type** in `FlowBuilder.jsx`:
```jsx
import NewNodeType from './CustomNodes/NewNodeType';

const nodeTypes = {
  textNode: TextNode,
  newNodeType: NewNodeType,  // Add your new node type
};
```

3. **Add to nodes panel** in `NodesPanel.jsx`:
```jsx
<div
  className="node-item"
  onDragStart={(event) => onDragStart(event, 'newNodeType')}
  draggable
>
  <div className="node-preview">
    <div className="node-icon">🆕</div>
    <span>New Node</span>
  </div>
</div>
```

4. **Update helper functions** in `flowHelpers.js` if needed.

### Key Design Patterns

- **Component Composition**: Each panel and node is a separate component
- **Custom Hooks**: Flow validation logic is extracted into a reusable hook
- **Utility Functions**: Common operations are centralized in helper functions
- **State Management**: Uses React Flow's built-in state management with custom extensions

## 🧪 Validation Rules

The flow builder implements specific validation rules:

### Connection Rules
- **Source handles**: Can only have ONE outgoing edge
- **Target handles**: Can have MULTIPLE incoming edges
- **Self-connection**: Not allowed
- **Duplicate connections**: Not allowed

### Save Validation
The save operation will show an error if:
- There are **more than one nodes** in the flow, AND
- **More than one node** has **empty target handles** (no incoming connections)

### Valid Flow Examples
✅ Single node (always valid)
✅ Multiple nodes where only one has empty target handle
✅ All nodes connected in a sequence


## 🎨 Styling & Theme

The application uses a clean, modern design with:
- **Primary Color**: Blue (#1976d2)
- **Success Color**: Green gradient for message nodes
- **Background**: Light gray (#f5f5f5)
- **Cards**: White with subtle shadows
- **Interactive Elements**: Smooth hover and focus states

## 🚀 Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Netlify Deployment
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Or connect your GitHub repo for automatic deployments

### Other Platforms
The built static files can be deployed to any static hosting service like:
- GitHub Pages
- Firebase Hosting
- AWS S3
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a pull request

## 🔍 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Built with ❤️ using React and React Flow
