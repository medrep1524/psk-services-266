
import { useState } from 'react';

export function useGlobalActions() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePDFView = (title: string, url?: string) => {
    console.log('Ouverture PDF:', title, url);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'pdf-viewer',
        title: `Consultation: ${title}`,
        data: { url: url || `/sample-${title.toLowerCase().replace(/\s+/g, '-')}.pdf` }
      }
    });
    window.dispatchEvent(event);
  };

  const handleShare = (title: string, url?: string) => {
    console.log('Partage:', title, url);
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url || window.location.href
      });
    } else {
      navigator.clipboard.writeText(url || window.location.href);
      alert('Lien copié dans le presse-papiers');
    }
  };

  const handleFilter = (type: string) => {
    console.log('Filtre appliqué:', type);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'filter',
        title: 'Filtres avancés',
        data: { filterType: type }
      }
    });
    window.dispatchEvent(event);
  };

  const handleDownload = (filename: string, url?: string) => {
    console.log('Téléchargement:', filename, url);
    const link = document.createElement('a');
    link.href = url || `data:application/pdf;base64,JVBERi0xLjQKJdPr6eEK`;
    link.download = filename;
    link.click();
  };

  const handleComparison = (items: any[]) => {
    console.log('Comparaison des éléments:', items);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'comparison',
        title: 'Comparaison d\'éléments',
        data: { items }
      }
    });
    window.dispatchEvent(event);
  };

  const handleFeedback = (type: 'error' | 'feedback' | 'testimonial', context?: string) => {
    console.log('Feedback:', type, context);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'feedback',
        title: type === 'error' ? 'Signaler une erreur' : 
              type === 'feedback' ? 'Donner un avis' : 'Laisser un témoignage',
        data: { feedbackType: type, context }
      }
    });
    window.dispatchEvent(event);
  };

  const handleImport = (acceptedTypes?: string[]) => {
    console.log('Import de fichiers:', acceptedTypes);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedTypes?.join(',') || '*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log('Fichiers importés:', Array.from(files).map(f => f.name));
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          alert(`${files.length} fichier(s) importé(s) avec succès`);
        }, 2000);
      }
    };
    input.click();
  };

  const handleExport = (data: any[], filename: string) => {
    console.log('Export des données:', data, filename);
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExamine = (itemId: string, itemTitle: string) => {
    console.log('Examen de l\'élément:', itemId, itemTitle);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'examine',
        title: `Examen: ${itemTitle}`,
        data: { itemId, itemTitle }
      }
    });
    window.dispatchEvent(event);
  };

  const handleApprove = (itemId: string, itemTitle: string) => {
    console.log('Approbation:', itemId, itemTitle);
    if (confirm(`Approuver "${itemTitle}" ?`)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert(`"${itemTitle}" approuvé avec succès`);
      }, 1000);
    }
  };

  const handleReject = (itemId: string, itemTitle: string) => {
    console.log('Rejet:', itemId, itemTitle);
    const reason = prompt(`Raison du rejet de "${itemTitle}" :`);
    if (reason) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert(`"${itemTitle}" rejeté: ${reason}`);
      }, 1000);
    }
  };

  const handleLike = (itemId: string, itemTitle: string) => {
    console.log('Like/Favoris:', itemId, itemTitle);
    const liked = localStorage.getItem(`liked_${itemId}`) === 'true';
    localStorage.setItem(`liked_${itemId}`, (!liked).toString());
    alert(liked ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  const handleAnalysis = (type: string, data: any[]) => {
    console.log('Analyse déclenchée:', type, data);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'analysis',
        title: `Analyse ${type}`,
        data: { analysisType: type, data }
      }
    });
    window.dispatchEvent(event);
  };

  const handleManagement = (entityType: string) => {
    console.log('Gestion d\'entité:', entityType);
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'management',
        title: `Gestion des ${entityType}s`,
        data: { entityType }
      }
    });
    window.dispatchEvent(event);
  };

  return {
    handlePDFView,
    handleShare,
    handleFilter,
    handleDownload,
    handleComparison,
    handleFeedback,
    handleImport,
    handleExport,
    handleExamine,
    handleApprove,
    handleReject,
    handleLike,
    handleAnalysis,
    handleManagement,
    isProcessing
  };
}
