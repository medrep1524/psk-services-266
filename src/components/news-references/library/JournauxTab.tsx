
import React from 'react';
import { Newspaper } from 'lucide-react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';

const journaux = [
  {
    id: 1,
    title: "Journal Officiel de la République Algérienne",
    date: "15 Janvier 2024",
    number: "N° 03",
    pages: 24,
    category: "Officiel",
    description: "Textes législatifs et réglementaires"
  },
  {
    id: 2,
    title: "El Moudjahid - Supplément Juridique",
    date: "10 Janvier 2024",
    number: "N° 18456",
    pages: 8,
    category: "Presse",
    description: "Actualités juridiques et analyses"
  }
];

export function JournauxTab() {
  return (
    <div className="space-y-6">
      <ActionButtons />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journaux.map((journal) => (
          <ResourceCard
            key={journal.id}
            id={journal.id}
            title={journal.title}
            date={journal.date}
            number={journal.number}
            pages={journal.pages}
            category={journal.category}
            description={journal.description}
            icon={<Newspaper className="w-5 h-5" />}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        ))}
      </div>
    </div>
  );
}
