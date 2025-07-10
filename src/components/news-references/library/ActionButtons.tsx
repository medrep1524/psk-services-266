
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="flex justify-center gap-3 mb-6">
      <Button className="gap-2">
        <Plus className="w-4 h-4" />
        Ajouter
      </Button>
      <Button variant="outline" className="gap-2">
        <Upload className="w-4 h-4" />
        Enrichir
      </Button>
    </div>
  );
}
