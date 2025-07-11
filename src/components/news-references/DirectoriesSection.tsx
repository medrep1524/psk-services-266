
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabFormField } from '@/components/common/TabFormField';
import { Building, Users, Scale, FileText, Gavel } from 'lucide-react';
import { useGlobalActions } from '@/hooks/useGlobalActions';

export function DirectoriesSection() {
  const actions = useGlobalActions();

  const handleAdd = () => {
    console.log('Opening add legal text form from directories...');
    actions.handleAddLegalText();
  };

  const handleEnrich = () => {
    console.log('Opening enrichment with file import from directories...');
    actions.handleImport(['.pdf', '.doc', '.docx', '.txt']);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="institutions" className="gap-2">
            <Building className="w-4 h-4" />
            Institutions Juridiques
          </TabsTrigger>
          <TabsTrigger value="professionnels" className="gap-2">
            <Users className="w-4 h-4" />
            Professionnels du Droit
          </TabsTrigger>
          <TabsTrigger value="tribunaux" className="gap-2">
            <Scale className="w-4 h-4" />
            Tribunaux et Cours
          </TabsTrigger>
        </TabsList>

        <TabsContent value="institutions" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Building className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher une institution juridique..."
            onSearch={(query) => console.log('Recherche institutions:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  Institutions Gouvernementales
                </CardTitle>
                <p className="text-sm text-gray-600">Ministères et organismes publics</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="font-medium text-sm">Ministère de la Justice</div>
                    <p className="text-xs text-gray-600">Administration centrale de la justice en Algérie</p>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="font-medium text-sm">Conseil d'État</div>
                    <p className="text-xs text-gray-600">Juridiction administrative suprême</p>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50">
                    <div className="font-medium text-sm">Cour Suprême</div>
                    <p className="text-xs text-gray-600">Plus haute juridiction judiciaire</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Organismes Spécialisés</CardTitle>
                <p className="text-sm text-gray-600">Institutions juridiques spécialisées</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium text-sm">Conseil National des Droits de l'Homme</div>
                    <p className="text-xs text-gray-600">Protection et promotion des droits humains</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium text-sm">Ordre National des Avocats</div>
                    <p className="text-xs text-gray-600">Organisation professionnelle des avocats</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium text-sm">Chambre Nationale des Notaires</div>
                    <p className="text-xs text-gray-600">Profession notariale algérienne</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="professionnels" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Users className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher un professionnel du droit..."
            onSearch={(query) => console.log('Recherche professionnels:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Professions Juridiques
                </CardTitle>
                <p className="text-sm text-gray-600">Annuaire des professionnels du droit</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Avocats</span>
                      <span className="text-xs text-blue-600">2,450 inscrits</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Notaires</span>
                      <span className="text-xs text-green-600">180 offices</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Huissiers de Justice</span>
                      <span className="text-xs text-orange-600">95 études</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Experts Judiciaires</span>
                      <span className="text-xs text-purple-600">340 experts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Recherche par Spécialité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm font-medium text-blue-700">Droit des Affaires</div>
                      <div className="text-xs text-blue-600">Avocats spécialisés en droit commercial</div>
                    </div>
                    <div className="p-2 bg-red-50 rounded">
                      <div className="text-sm font-medium text-red-700">Droit Pénal</div>
                      <div className="text-xs text-red-600">Défense pénale et criminelle</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <div className="text-sm font-medium text-green-700">Droit de la Famille</div>
                      <div className="text-xs text-green-600">Divorce, succession, filiation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Recherche géographique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Par wilaya
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Par commune
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Proche de moi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tribunaux" className="mt-6 space-y-6">
          {/* Boutons d'action connectés */}
          <div className="flex gap-3 justify-center mb-6">
            <Button className="gap-2" onClick={handleAdd}>
              <Scale className="w-4 h-4" />
              Ajouter
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleEnrich}>
              <FileText className="w-4 h-4" />
              Enrichir
            </Button>
          </div>

          <TabFormField
            placeholder="Rechercher un tribunal ou une cour..."
            onSearch={(query) => console.log('Recherche tribunaux:', query)}
            showActions={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-purple-600" />
                  Juridictions par Degré
                </CardTitle>
                <p className="text-sm text-gray-600">Organisation judiciaire algérienne</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Cour Suprême</span>
                      <span className="text-xs text-red-600">1 juridiction</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Cours d'Appel</span>
                      <span className="text-xs text-orange-600">12 cours</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Tribunaux</span>
                      <span className="text-xs text-blue-600">187 tribunaux</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Juridictions Spécialisées</span>
                      <span className="text-xs text-green-600">45 juridictions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Types de Tribunaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-2 bg-blue-50 rounded">
                      <div className="text-sm font-medium text-blue-700">Tribunaux de Première Instance</div>
                      <div className="text-xs text-blue-600">Compétence générale civile et pénale</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <div className="text-sm font-medium text-green-700">Tribunaux Administratifs</div>
                      <div className="text-xs text-green-600">Contentieux administratif</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded">
                      <div className="text-sm font-medium text-orange-700">Tribunaux Commerciaux</div>
                      <div className="text-xs text-orange-600">Litiges commerciaux et économiques</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Informations Pratiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Horaires d'ouverture
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Coordonnées
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Procédures et formalités
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
