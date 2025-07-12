/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Background,
    Controls,
} from '@xyflow/react';
import { NODE_TYPES } from '@/data/NodeRegistry';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import '@xyflow/react/dist/style.css';
import type { Edge, Node, OnConnect, NodeMouseHandler } from '@xyflow/react';
import { toast } from 'sonner';
import Navbar from './Navbar';

// Custom data structure for each node
type CustomNodeData = {
    label: string;
    [key: string]: any;
};

// Properly typed edge with correct data constraint
type CustomEdge = Edge<Record<string, unknown>>;

// Properly typed node using custom node data
type CustomNode = Node<CustomNodeData>;

// Convert NODE_TYPES to react-flow compatible node types
const nodeTypes = Object.fromEntries(
    Object.entries(NODE_TYPES).map(([key, val]) => [key, val.component])
);

const FlowBuilder = () => {
    // === State Management ===
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge>([]);
    const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);

    // === Delete Selected Nodes/Edges on Keyboard Press ===
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Delete') return;

            // Delete selected nodes
            setNodes((prevNodes) => {
                const selectedIds = prevNodes.filter((n) => n.selected).map((n) => n.id);

                if (selectedNode && selectedIds.includes(selectedNode.id)) {
                    setSelectedNode(null);
                }

                return prevNodes.filter((n) => !selectedIds.includes(n.id));
            });

            // Delete selected edges
            setEdges((prevEdges) => {
                const selectedEdgeIds = prevEdges.filter((e) => e.selected).map((e) => e.id);
                return prevEdges.filter((e) => !selectedEdgeIds.includes(e.id));
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNode, setNodes, setEdges]);

    // === Handle Connection Between Nodes ===
    const onConnect: OnConnect = useCallback(
        (params) => {
            const alreadyConnected = edges.some((e) => e.source === params.source);
            if (alreadyConnected) return;

            setEdges((prevEdges) => addEdge(params, prevEdges));
        },
        [edges, setEdges]
    );

    // === Handle Drop from Side Panel ===
    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (!type) return;

            const position = {
                x: event.clientX - 300, // Adjust for left panel width
                y: event.clientY - 80,  // Adjust for top header height
            };

            const nodeConfig = NODE_TYPES[type as keyof typeof NODE_TYPES];
            if (!nodeConfig) return;

            const newNode: CustomNode = {
                id: uuid(),
                type,
                position,
                data: { ...nodeConfig.defaultData },
            };

            setNodes((prevNodes) => [...prevNodes, newNode]);
        },
        [setNodes]
    );

    // === Handle Drag Over ===
    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    // === Handle Node Click ===
    const onNodeClick: NodeMouseHandler<CustomNode> = useCallback((_, node) => {
        setSelectedNode(node);
    }, []);

    // === Handle Node Label Change ===
    const handleLabelChange = useCallback((label: string) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === selectedNode?.id
                    ? { ...node, data: { ...node.data, label } }
                    : node
            )
        );

        setSelectedNode((prev) =>
            prev ? { ...prev, data: { ...prev.data, label } } : prev
        );
    }, [selectedNode, setNodes]);

    // === Handle Settings Panel Close ===
    const handleSettingsPanelClose = useCallback(() => {
        setSelectedNode(null);
    }, []);

    //save flow if falidated
    const saveFlow = ()=>{
        toast.success("Saved")
    }

    return (
        <div className="flex w-full h-screen">
            {/* === Left Sidebar (Nodes Panel or Settings Panel) === */}
            {!selectedNode ? (
                <NodesPanel />
            ) : (
                <SettingsPanel
                    label={selectedNode.data.label}
                    onChange={handleLabelChange}
                    onClose={handleSettingsPanelClose}
                />
            )}

            {/* === Main Canvas === */}
            <div
                className="flex-1 relative"
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                {/* Header */}
                <Navbar/>

                {/* Flow Canvas */}
                <ReactFlow<CustomNode, CustomEdge>
                    nodes={nodes}
                    edges={edges}
                    snapToGrid={true}
                    snapGrid={[16, 16]}
                    nodeTypes={nodeTypes as any}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>

                {/* Save Button */}
                <div className="absolute bottom-4 right-4">
                    <SaveButton
                        nodes={nodes}
                        edges={edges}
                        onSave={saveFlow}
                    />
                </div>
            </div>
        </div>
    );
};

export default FlowBuilder;