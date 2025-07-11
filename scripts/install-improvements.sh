#!/bin/bash

echo "🚀 Installation des améliorations de l'application..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé. Veuillez installer Node.js et npm."
    exit 1
fi

print_status "Installation des dépendances de développement..."

# Dépendances de test
npm install -D \
    vitest \
    @vitest/ui \
    @testing-library/react \
    @testing-library/jest-dom \
    @testing-library/user-event \
    jsdom \
    @vitest/coverage-v8

print_success "Dépendances de test installées"

# Outils de qualité de code
npm install -D \
    prettier \
    prettier-plugin-tailwindcss \
    @types/node \
    rimraf

print_success "Outils de qualité installés"

# Dépendances de performance
npm install \
    web-vitals

print_success "Dépendances de performance installées"

# Dépendances de sécurité
npm install \
    dompurify \
    crypto-js

npm install -D \
    @types/dompurify \
    @types/crypto-js

print_success "Dépendances de sécurité installées"

# Outils de monitoring (optionnels)
print_status "Installation des outils de monitoring optionnels..."
npm install -D \
    @lhci/cli \
    vite-bundle-analyzer

print_success "Outils de monitoring installés"

# Animation et UX (optionnels)
print_status "Installation des bibliothèques d'animation..."
npm install \
    framer-motion

print_success "Bibliothèques d'animation installées"

# Créer les dossiers nécessaires
print_status "Création de la structure de dossiers..."

mkdir -p src/test
mkdir -p docs/{architecture,api,deployment,development,user-guides}
mkdir -p .github/workflows

print_success "Structure de dossiers créée"

# Ajouter un test d'exemple
print_status "Création d'un test d'exemple..."

cat > src/test/App.test.tsx << 'EOF'
import { describe, it, expect } from 'vitest'
import { render, screen } from './utils'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('has correct title', () => {
    render(<App />)
    // Ajouter vos assertions spécifiques ici
  })
})
EOF

print_success "Test d'exemple créé"

# Messages finaux
echo ""
print_success "✅ Installation terminée avec succès!"
echo ""
print_status "Prochaines étapes:"
echo "1. Exécutez 'npm run type-check:strict' pour vérifier les types"
echo "2. Exécutez 'npm run test' pour lancer les tests"
echo "3. Exécutez 'npm run lint:fix' pour corriger les erreurs de lint"
echo "4. Exécutez 'npm run format' pour formater le code"
echo ""
print_warning "Note: Certaines erreurs TypeScript peuvent persister jusqu'à la mise à jour du code existant"
echo ""
print_status "Consultez le fichier ANALYSE_AMELIORATIONS.md pour le plan de mise en œuvre complet"