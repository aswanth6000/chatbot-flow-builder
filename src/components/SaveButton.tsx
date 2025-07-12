/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

type Props = {
  nodes: any[];
  edges: any[];
  onSave: () => void;
};

const SaveButton = ({ nodes, edges, onSave }: Props) => {
  const validateFlow = () => {
    const invalidNodes = nodes.filter(
      (node) => !edges.some((e) => e.target === node.id)
    );

    if (nodes.length > 1 && invalidNodes.length > 1) {
      toast.error('Error: More than one node has no incoming edges.');
      return false;
    }

    return true;
  };

  return (
    <Button
      onClick={() => {
        if (validateFlow()) onSave();
      }}
      className="p-2 rounded "
    >
      <Save /> Save Flow
    </Button>
  );
};

export default SaveButton;
