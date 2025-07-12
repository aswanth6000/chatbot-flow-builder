import type { TextNodeData } from '@/types/TextNodeData';
import { Handle, Position } from '@xyflow/react';



const TextNode = ({ data }: TextNodeData) => {
    return (
        <div className="rounded-lg shadow-md border border-gray-300 bg-white w-64 text-sm">
            <div className="bg-teal-100 text-teal-800 font-semibold px-3 py-2 rounded-t-lg">
                <span>💬 Send Message</span>
            </div>

            <div className="px-3 py-2 text-gray-700">
                {data.label || 'Empty message'}
            </div>

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-4 h-4 bg-gray-500 rounded-full border-2 border-white"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            />
        </div>
    );
};

export default TextNode;
