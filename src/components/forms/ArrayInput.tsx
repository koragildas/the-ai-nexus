
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface ArrayInputProps {
  field: string;
  label: string;
  placeholder: string;
  description?: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  field,
  label,
  placeholder,
  description,
  values,
  onChange,
  onAdd,
  onRemove
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {description && <p className="text-sm text-muted-foreground">{description}</p>}
    <div className="space-y-2">
      {values.map((item: string, index: number) => (
        <div key={`${field}-${index}`} className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            className="flex-1"
          />
          {values.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Ajouter {label.toLowerCase()}
      </Button>
    </div>
  </div>
);
