
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

export function ActionButtons() {
  const handleAddNew = () => {
    console.log('Ajout d\'une nouvelle ressource');
    // Simulation d'ouverture d'un modal d'ajout
    const event = new CustomEvent('open-modal', { 
      detail: { 
        type: 'add-resource',
        title: 'Ajouter une nouvelle ressource',
        data: {}
      }
    });
    window.dispatchEvent(event);
  };

  const handleEnrichment = () => {
    console.log('Enrichissement des ressources');
    // Simulation d'enrichissement automatique
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log('Fichiers sélectionnés pour enrichissement:', Array.from(files).map(f => f.name));
        // Ici on pourrait traiter les fichiers
        alert(`${files.length} fichier(s) sélectionné(s) pour enrichissement`);
      }
    };
    input.click();
  };

  return (
    <div className="flex justify-center gap-3 mb-6">
      <Button className="gap-2" onClick={handleAddNew}>
        <Plus className="w-4 h-4" />
        Ajouter
      </Button>
      <Button variant="outline" className="gap-2" onClick={handleEnrichment}>
        <Upload className="w-4 h-4" />
        Enrichir
      </Button>
    </div>
  );
}
