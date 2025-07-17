
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Settings, Save, Wand2, ClipboardList, Scan, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SmartOCRProcessor } from '@/components/common/SmartOCRProcessor';
import { ProcedureFormOCRSection } from '@/components/procedures/ProcedureFormOCRSection';
import { DynamicFormRenderer } from '@/components/forms/DynamicFormRenderer';
import { useFormLibrary } from '@/hooks/useFormLibrary';
import { useNomenclatureData } from '@/hooks/useNomenclatureData';

interface ProcedureFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

// Ces données seront maintenant récupérées via useNomenclatureData

export function ProcedureForm({ onClose, onSubmit }: ProcedureFormProps) {
  const { toast } = useToast();
  const { nomenclatureData, mapOCRDataToForm } = useNomenclatureData();
  const { getProcedureFormForCategory, templates } = useFormLibrary();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>('manual');
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Listen for OCR tab activation events
  useEffect(() => {
    const handleActivateOCRTab = () => {
      setInputMethod('ocr');
    };

    window.addEventListener('activate-ocr-tab', handleActivateOCRTab);
    return () => {
      window.removeEventListener('activate-ocr-tab', handleActivateOCRTab);
    };
  }, []);

  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOCRFormDataExtracted = (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => {
    console.log('🎯 [ProcedureForm] Réception des données OCR:', data);
    console.log('📋 [ProcedureForm] Nombre de champs reçus:', Object.keys(data.formData).length);
    
    // Mapper TOUS les champs OCR vers le formulaire de procédure
    const mappedData: any = mapOCRDataToForm(data.formData, 'procedure');
    
    // Informations de base
    if (data.formData.name || data.formData.nom_procedure) {
      mappedData.name = data.formData.name || data.formData.nom_procedure;
    }
    if (data.formData.contenu || data.formData.content || data.formData.description) {
      const content = data.formData.contenu || data.formData.content || data.formData.description;
      mappedData.description = content.length > 500 ? content.substring(0, 500) + '...' : content;
    }
    
    // Catégorie et organisation
    if (data.formData.sector || data.formData.procedureCategory) {
      mappedData.procedureCategory = data.formData.sector || data.formData.procedureCategory;
    }
    if (data.formData.sectorAdministration || data.formData.organisation || data.formData.ministere) {
      mappedData.sectorAdministration = data.formData.sectorAdministration || data.formData.organisation || data.formData.ministere;
    }
    
    // Documents et conditions
    if (data.formData.documents_requis) {
      mappedData.requiredDocuments = data.formData.documents_requis.split(/[,;|]/).map(doc => doc.trim()).filter(doc => doc.length > 0);
    }
    if (data.formData.conditions) {
      mappedData.conditions = data.formData.conditions.split(/[,;|]/).map(cond => cond.trim()).filter(cond => cond.length > 0);
    }
    if (data.formData.etapes) {
      mappedData.steps = data.formData.etapes.split(/[,;|]/).map(step => step.trim()).filter(step => step.length > 0);
    }
    
    // Modalités
    if (data.formData.lieu_depot) mappedData.submissionLocation = data.formData.lieu_depot;
    if (data.formData.delai_traitement) mappedData.processingDuration = data.formData.delai_traitement;
    if (data.formData.reference) mappedData.reference = data.formData.reference;
    
    // Coûts
    if (data.formData.cout) {
      mappedData.feeType = 'payant';
      mappedData.feeAmount = data.formData.cout;
    } else {
      mappedData.feeType = 'gratuit';
    }
    
    // Observations et autres champs
    if (data.formData.observations) mappedData.faq = data.formData.observations;
    
    // Auto-détecter la catégorie et sélectionner le formulaire approprié
    const content = (data.formData.contenu || data.formData.content || data.formData.description || '').toLowerCase();
    let detectedCategory = '';
    
    if (!mappedData.procedureCategory) {
      if (content.includes('commerce') || content.includes('entreprise') || content.includes('société')) {
        detectedCategory = 'Commerce';
        mappedData.procedureCategory = 'Commerce';
      } else if (content.includes('urbanisme') || content.includes('construction') || content.includes('permis')) {
        detectedCategory = 'Urbanisme';
        mappedData.procedureCategory = 'Urbanisme';
      } else if (content.includes('état civil') || content.includes('naissance') || content.includes('mariage')) {
        detectedCategory = 'État civil';
        mappedData.procedureCategory = 'État civil';
      } else if (content.includes('fiscalité') || content.includes('impôt') || content.includes('taxe')) {
        detectedCategory = 'Fiscal';
        mappedData.procedureCategory = 'Fiscal';
      } else if (content.includes('santé') || content.includes('médical') || content.includes('hôpital')) {
        detectedCategory = 'Social';
        mappedData.procedureCategory = 'Social';
      } else if (content.includes('éducation') || content.includes('école') || content.includes('université')) {
        detectedCategory = 'Social';
        mappedData.procedureCategory = 'Social';
      } else if (content.includes('transport') || content.includes('permis de conduire') || content.includes('véhicule')) {
        detectedCategory = 'Urbanisme';
        mappedData.procedureCategory = 'Urbanisme';
      } else if (content.includes('environnement') || content.includes('écologie') || content.includes('pollution')) {
        detectedCategory = 'Environnement';
        mappedData.procedureCategory = 'Environnement';
      } else if (content.includes('agriculture') || content.includes('agricole') || content.includes('exploitation')) {
        detectedCategory = 'Environnement';
        mappedData.procedureCategory = 'Environnement';
      }
    }
    
    // Auto-détecter l'organisation si pas encore définie
    if (!mappedData.sectorAdministration) {
      if (content.includes('intérieur') || content.includes('wilaya') || content.includes('commune')) {
        mappedData.sectorAdministration = 'Ministère de l\'Intérieur';
      } else if (content.includes('finance') || content.includes('impôt') || content.includes('fiscal')) {
        mappedData.sectorAdministration = 'Ministère des Finances';
      } else if (content.includes('justice') || content.includes('tribunal') || content.includes('juridique')) {
        mappedData.sectorAdministration = 'Ministère de la Justice';
      } else if (content.includes('santé') || content.includes('médical') || content.includes('hôpital')) {
        mappedData.sectorAdministration = 'Ministère de la Santé';
      } else if (content.includes('éducation') || content.includes('école') || content.includes('université')) {
        mappedData.sectorAdministration = 'Ministère de l\'Éducation';
      } else if (content.includes('commerce') || content.includes('entreprise') || content.includes('commercial')) {
        mappedData.sectorAdministration = 'Ministère du Commerce';
      } else if (content.includes('agriculture') || content.includes('agricole') || content.includes('exploitation')) {
        mappedData.sectorAdministration = 'Ministère de l\'Agriculture';
      } else if (content.includes('transport') || content.includes('véhicule') || content.includes('route')) {
        mappedData.sectorAdministration = 'Ministère des Transports';
      }
    }
    
    // Déterminer la catégorie ciblée
    if (content.includes('citoyen') || content.includes('individu') || content.includes('personne physique')) {
      mappedData.targetCategory = 'citoyen';
    } else if (content.includes('entreprise') || content.includes('société') || content.includes('commercial')) {
      mappedData.targetCategory = 'entreprises';
    } else if (content.includes('investisseur') || content.includes('investissement')) {
      mappedData.targetCategory = 'investisseur';
    } else if (content.includes('association') || content.includes('ong')) {
      mappedData.targetCategory = 'associations';
    } else if (content.includes('administration') || content.includes('service public')) {
      mappedData.targetCategory = 'administration';
    }
    
    console.log('🔄 [ProcedureForm] Données mappées finales:', mappedData);
    
    // CRITICAL: Mise à jour immédiate et synchrone des états
    setShowOCRScanner(false);
    setInputMethod('manual');
    setSelectedCategory(detectedCategory || '');
    setTimeout(() => {
      setFormData(prev => ({ ...prev, ...mappedData }));
    }, 50);
    
    // Afficher la notification de succès
    toast({
      title: "Formulaire automatiquement rempli ✓",
      description: `Le formulaire de procédure a été rempli avec ${Object.keys(mappedData).length} champs identifiés.`,
    });
  };

  const handleAutoFill = () => {
    // Ouvrir la modal d'auto-remplissage IA
    const event = new CustomEvent('open-ai-autofill', {
      detail: { context: 'procedure' }
    });
    window.dispatchEvent(event);
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, procedureCategory: selectedCategory };
    console.log('Données de la procédure:', finalData);
    onSubmit(finalData);
    toast({
      title: "Procédure ajoutée",
      description: `La procédure "${finalData.name || 'nouvelle procédure'}" a été ajoutée avec succès.`,
    });
  };

  const selectedTemplate = selectedCategory ? getProcedureFormForCategory(selectedCategory) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-600" />
                Ajouter une nouvelle procédure administrative
              </h1>
              <p className="text-gray-600 mt-1">Configuration complète d'une procédure administrative</p>
            </div>
          </div>
          <Button onClick={handleAutoFill} variant="outline" className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100">
            <Wand2 className="w-4 h-4 text-purple-600" />
            Auto-remplissage IA
          </Button>
        </div>

        {/* Méthode de saisie */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Méthode de Saisie
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant={inputMethod === 'manual' ? 'default' : 'outline'}
                onClick={() => setInputMethod('manual')}
                className="h-20 flex flex-col gap-2"
              >
                <ClipboardList className="w-6 h-6" />
                <span>Insertion Manuelle</span>
                <span className="text-xs opacity-80">Saisie via le formulaire</span>
              </Button>
              
              <Button
                type="button"
                variant={inputMethod === 'ocr' ? 'default' : 'outline'}
                onClick={() => setInputMethod('ocr')}
                className="h-20 flex flex-col gap-2"
              >
                <Scan className="w-6 h-6" />
                <span>Insertion OCR</span>
                <span className="text-xs opacity-80">Scan de document</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section OCR */}
        {inputMethod === 'ocr' && (
          <ProcedureFormOCRSection
            showOCRScanner={showOCRScanner}
            onShowOCRScanner={setShowOCRScanner}
            onOCRFormDataExtracted={handleOCRFormDataExtracted}
          />
        )}

        {/* Formulaire manuel */}
        {inputMethod === 'manual' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Sélection de la catégorie de procédure */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Catégorie de Procédure
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Label htmlFor="procedure-category" className="text-sm font-medium text-gray-700">
                    Sélectionnez la catégorie de procédure *
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Choisir une catégorie de procédure" />
                    </SelectTrigger>
                    <SelectContent>
                      {nomenclatureData?.procedureCategories.map((category) => (
                        <SelectItem key={category.code} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Formulaire dynamique adapté à la catégorie */}
            {selectedTemplate && (
              <DynamicFormRenderer
                template={selectedTemplate}
                formData={formData}
                onFieldChange={handleFieldChange}
                className="mb-6"
              />
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="px-8">
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="px-8 bg-blue-600 hover:bg-blue-700 gap-2"
                disabled={!selectedCategory}
              >
                <Save className="w-4 h-4" />
                Enregistrer la procédure
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
