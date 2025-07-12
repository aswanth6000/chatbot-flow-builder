// src/components/FlowBuilder.tsx
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NODE_TYPES } from '@/data/NodeRegistry';
import type { Node, Edge } from '@xyflow/react';
import type { TextNodeData } from '@/types/TextNodeData';


const initialNodes: Node<TextNodeData>[] = [
    { id: 'n1', type: 'text', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', type: 'text', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges: Edge[] = [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
];

const FlowBuilder = () => {
    const nodeTypes = Object.fromEntries(
        Object.entries(NODE_TYPES).map(([key, config]) => [key, config.component])
    );
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div className="w-full h-screen">
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
            {/* <Background />
            <MiniMap />
            <Controls /> */}
        </div>
    );
};

export default FlowBuilder;
