
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface SettingsPanelProps {
    label: string;
    onChange: (val: string) => void;
    onClose: () => void;
}

export default function SettingsPanel({ label, onChange, onClose }: SettingsPanelProps) {
    return (
        <div className="w-72 border-l border-muted bg-background p-4 shadow-sm">
            <Button
                variant="link"
                onClick={onClose}
                className="px-0 text-sm text-primary mb-2"
            >
                ← Back
            </Button>

            <h3 className="text-md font-medium mb-2">Message</h3>
            <Textarea
                id="message-text"
                value={label}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>
                ) => onChange(e.target.value)}
                className="text-sm"
                rows={3}
            />

            <Button onClick={onClose} className="mt-4 w-full">
                Save Changes
            </Button>
        </div>
    );
}
