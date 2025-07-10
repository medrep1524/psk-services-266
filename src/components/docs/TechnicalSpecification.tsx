
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Code, 
  Database, 
  Shield, 
  Globe, 
  Smartphone,
  Settings,
  Users,
  BarChart,
  Search,
  BookOpen,
  Gavel,
  FileCheck,
  Brain,
  Layers
} from 'lucide-react';

export function TechnicalSpecification() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Fiche Technique Détaillée</h1>
        <p className="text-xl text-gray-600">
          Plateforme Juridique Algérienne - Spécifications Complètes
        </p>
        <div className="flex justify-center gap-4">
          <Badge className="bg-emerald-500 text-white">Version 2.0</Badge>
          <Badge variant="outline">Janvier 2025</Badge>
        </div>
      </div>

      {/* Vue d'ensemble */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            Vue d'Ensemble du Système
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Plateforme numérique intégrée pour la gestion, la recherche et l'analyse des textes juridiques 
            et procédures administratives algériennes. Solution complète destinée aux professionnels du 
            droit, administrations publiques et citoyens.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <h4 className="font-semibold text-emerald-800">Utilisateurs Cibles</h4>
              <p className="text-sm text-emerald-700">Juristes, Magistrats, Administrations, Citoyens</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Déploiement</h4>
              <p className="text-sm text-blue-700">Cloud hybride avec accès hors ligne</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">Architecture</h4>
              <p className="text-sm text-purple-700">Microservices, API REST, Progressive Web App</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Fonctionnels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            Modules Fonctionnels Principaux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h4 className="font-semibold">Textes Juridiques</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 ml-7">
                <li>• Catalogue complet des textes</li>
                <li>• Timeline des modifications</li>
                <li>• Comparaison de versions</li>
                <li>• Enrichissement collaboratif</li>
                <li>• Validation et approbation</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">Procédures Administratives</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 ml-7">
                <li>• Catalogue des procédures</li>
                <li>• Timeline des évolutions</li>
                <li>• Analyse de performance</li>
                <li>• Simplification et optimisation</li>
                <li>• Dématérialisation</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold">Recherche Avancée</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 ml-7">
                <li>• Recherche sémantique</li>
                <li>• Interface immersive</li>
                <li>• Filtres intelligents</li>
                <li>• Recherche multimodale</li>
                <li>• Géolocalisation juridique</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold">Intelligence Artificielle</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 ml-7">
                <li>• Assistant juridique IA</li>
                <li>• Analyse prédictive</li>
                <li>• Résumés automatiques</li>
                <li>• Détection de conflits</li>
                <li>• Recommandations contextuelles</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold">Analyse et Rapports</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 ml-7">
                <li>• Tableaux de bord personnalisés</li>
                <li>• Analyses de dépendances</li>
                <li>• Métriques de performance</li>
                <li>• Rapports automatisés</li>
                <li>• Tendances législatives</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h4 className="font-semibold">Collaboration</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600 ml-7">
                <li>• Espaces de travail partagés</li>
                <li>• Annotations collaboratives</li>
                <li>• Forums spécialisés</li>
                <li>• Workflow d'approbation</li>
                <li>• Gestion des versions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Technique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-600" />
            Architecture Technique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Frontend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Framework</span>
                  <Badge variant="outline">React 18.3.1</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Build Tool</span>
                  <Badge variant="outline">Vite</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Styling</span>
                  <Badge variant="outline">Tailwind CSS</Badge>
                </div>
                <div className="flex justify-between">
                  <span>UI Components</span>
                  <Badge variant="outline">Shadcn/ui</Badge>
                </div>
                <div className="flex justify-between">
                  <span>State Management</span>
                  <Badge variant="outline">Zustand</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Data Fetching</span>
                  <Badge variant="outline">TanStack Query</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Backend & Services</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Database</span>
                  <Badge variant="outline">Supabase</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Authentication</span>
                  <Badge variant="outline">Supabase Auth</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Storage</span>
                  <Badge variant="outline">Supabase Storage</Badge>
                </div>
                <div className="flex justify-between">
                  <span>OCR Engine</span>
                  <Badge variant="outline">Tesseract.js</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Charts</span>
                  <Badge variant="outline">Recharts</Badge>
                </div>
                <div className="flex justify-between">
                  <span>i18n</span>
                  <Badge variant="outline">react-i18next</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités de Sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" />
            Sécurité et Conformité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Authentification</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Authentification multi-facteurs</li>
                <li>• Single Sign-On (SSO)</li>
                <li>• Gestion des sessions</li>
                <li>• Politique de mots de passe</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Chiffrement</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Chiffrement en transit (TLS 1.3)</li>
                <li>• Chiffrement au repos (AES-256)</li>
                <li>• Signature numérique</li>
                <li>• Horodatage sécurisé</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Conformité</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• RGPD compliant</li>
                <li>• Standards algériens</li>
                <li>• Audit trail complet</li>
                <li>• Sauvegarde sécurisée</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance et Scalabilité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-600" />
            Performance et Scalabilité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Optimisations Frontend</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Lazy loading des composants</li>
                <li>• Virtualisation des listes</li>
                <li>• Cache intelligent</li>
                <li>• Compression d'images</li>
                <li>• Progressive Web App</li>
                <li>• Service Workers</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Infrastructure</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• CDN global</li>
                <li>• Load balancing</li>
                <li>• Auto-scaling</li>
                <li>• Base de données distribuée</li>
                <li>• Cache Redis</li>
                <li>• Monitoring en temps réel</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibilité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-green-600" />
            Accessibilité et Internationalisation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Standards d'Accessibilité</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• WCAG 2.1 AA compliant</li>
                <li>• Navigation clavier</li>
                <li>• Lecteurs d'écran</li>
                <li>• Contraste élevé</li>
                <li>• Texte ajustable</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Langues Supportées</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Arabe (principal)</li>
                <li>• Français</li>
                <li>• Anglais</li>
                <li>• Tamazight (prévu)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Adaptation Mobile</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Design responsive</li>
                <li>• Touch optimized</li>
                <li>• Offline capability</li>
                <li>• App native (prévu)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métriques de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-purple-600" />
            Métriques de Performance Cibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">&lt; 2s</div>
              <div className="text-sm text-green-700">Temps de chargement initial</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">&lt; 500ms</div>
              <div className="text-sm text-blue-700">Temps de réponse API</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-purple-700">Disponibilité du service</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">10k+</div>
              <div className="text-sm text-orange-700">Utilisateurs concurrents</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="w-6 h-6 text-emerald-600" />
            Roadmap de Développement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Badge className="bg-green-500 text-white">Q1 2025</Badge>
              <div>
                <h4 className="font-semibold">Phase 1 - Base</h4>
                <p className="text-sm text-gray-600">Modules core, recherche basique, interface utilisateur</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge className="bg-blue-500 text-white">Q2 2025</Badge>
              <div>
                <h4 className="font-semibold">Phase 2 - IA & Avancé</h4>
                <p className="text-sm text-gray-600">Assistant IA, recherche sémantique, analyses prédictives</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge className="bg-purple-500 text-white">Q3 2025</Badge>
              <div>
                <h4 className="font-semibold">Phase 3 - Collaboration</h4>
                <p className="text-sm text-gray-600">Outils collaboratifs, workflow avancés, intégrations</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="outline">Q4 2025</Badge>
              <div>
                <h4 className="font-semibold">Phase 4 - Mobile & Extensions</h4>
                <p className="text-sm text-gray-600">Application mobile native, API publique, extensions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-8 border-t">
        <p>Document généré automatiquement - Version 2.0 - Janvier 2025</p>
        <p>Plateforme Juridique Algérienne © 2025</p>
      </div>
    </div>
  );
}
