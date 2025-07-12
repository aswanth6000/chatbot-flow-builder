import { NODE_TYPES } from '@/data/NodeRegistry';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { CircleQuestionMark, Plus, SplinePointer } from 'lucide-react';

const NodesPanel = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-72 border-r h-full p-4 bg-background space-y-4 overflow-y-auto">
            <Accordion type="multiple" className="w-full">
                {/* Instructions Accordion */}
                <AccordionItem value="instructions">
                    <AccordionTrigger>
                        <span className="flex items-center gap-2">
                            <CircleQuestionMark className="w-4 h-4" />
                            Instructions
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground space-y-2">
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Drag a node from below to the canvas</li>
                            <li>Click a node to edit its message</li>
                            <li>Connect nodes using handles</li>
                            <li>
                                Select a node or edge and press{' '}
                                <kbd className="px-1 py-0.5 border rounded text-xs">Backspace</kbd> or{' '}
                                <kbd className="px-1 py-0.5 border rounded text-xs">Delete</kbd> to remove
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* Node Types Accordion */}
                <AccordionItem value="nodes">
                    <AccordionTrigger>
                        <span className="flex items-center gap-2">
                            <SplinePointer className="w-4 h-4" />
                            Available Nodes
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        {Object.entries(NODE_TYPES).map(([key, node]) => (
                            <div
                                key={key}
                                draggable
                                onDragStart={(e) => onDragStart(e, key)}
                                className="cursor-move px-3 py-2 bg-card rounded-md shadow-sm hover:bg-accent hover:text-accent-foreground border text-sm flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                {node.label}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default NodesPanel;
