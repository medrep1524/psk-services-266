
import React from 'react';
import { FileText } from 'lucide-react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';

const revues = [
  {
    id: 1,
    title: "Revue Algérienne de Droit",
    issue: "N° 58 - 2024",
    publisher: "Faculté de Droit d'Alger",
    articles: 12,
    category: "Revue académique",
    description: "Articles de recherche en droit algérien"
  },
  {
    id: 2,
    title: "Revue de Jurisprudence",
    issue: "N° 45 - 2024",
    publisher: "Cour Suprême",
    articles: 8,
    category: "Jurisprudence",
    description: "Analyse des décisions de justice récentes"
  }
];

export function RevuesTab() {
  return (
    <div className="space-y-6">
      <ActionButtons />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {revues.map((revue) => (
          <ResourceCard
            key={revue.id}
            id={revue.id}
            title={revue.title}
            date={revue.issue}
            publisher={revue.publisher}
            articles={revue.articles}
            category={revue.category}
            description={revue.description}
            icon={<FileText className="w-5 h-5" />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
        ))}
      </div>
    </div>
  );
}
