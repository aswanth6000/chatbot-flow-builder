import type { TextNodeData } from '@/types/TextNodeData';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';



const TextNode = ({ data }: NodeProps<TextNodeData>) => {
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm w-48 text-sm text-gray-800">
      {/* Target Handle (incoming edge) */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-blue-500"
      />

      {/* Display Node Content */}
      <div className="text-center px-2 py-1">{data.label}</div>

      {/* Source Handle (outgoing edge) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-green-500"
      />
    </div>
  );
};

export default TextNode;
