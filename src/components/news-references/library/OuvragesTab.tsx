
import React from 'react';
import { BookOpen } from 'lucide-react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';

const ouvrages = [
  {
    id: 1,
    title: "Droit constitutionnel algérien",
    author: "Pr. Ahmed Mahiou",
    publisher: "OPU",
    year: "2023",
    pages: 450,
    category: "Droit public",
    description: "Analyse approfondie du système constitutionnel algérien"
  },
  {
    id: 2,
    title: "Code civil commenté",
    author: "Dr. Fatima Zohra Saidani",
    publisher: "Dar El Houda",
    year: "2022",
    pages: 680,
    category: "Droit civil",
    description: "Commentaires détaillés du code civil algérien"
  }
];

export function OuvragesTab() {
  return (
    <div className="space-y-6">
      <ActionButtons />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ouvrages.map((ouvrage) => (
          <ResourceCard
            key={ouvrage.id}
            {...ouvrage}
            icon={<BookOpen className="w-5 h-5" />}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
        ))}
      </div>
    </div>
  );
}
