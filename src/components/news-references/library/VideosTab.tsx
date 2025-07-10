
import React from 'react';
import { Video } from 'lucide-react';
import { ActionButtons } from './ActionButtons';
import { ResourceCard } from './ResourceCard';

const videos = [
  {
    id: 1,
    title: "Conférence sur la Constitution algérienne",
    speaker: "Pr. Mohamed Bedjaoui",
    duration: "1h 45min",
    date: "12 Décembre 2023",
    category: "Conférence",
    description: "Analyse constitutionnelle approfondie"
  },
  {
    id: 2,
    title: "Formation en droit commercial",
    speaker: "Dr. Sarah Hamdi",
    duration: "2h 30min",
    date: "08 Novembre 2023",
    category: "Formation",
    description: "Aspects pratiques du droit commercial"
  }
];

export function VideosTab() {
  return (
    <div className="space-y-6">
      <ActionButtons />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <ResourceCard
            key={video.id}
            id={video.id}
            title={video.title}
            speaker={video.speaker}
            duration={video.duration}
            date={video.date}
            category={video.category}
            description={video.description}
            icon={<Video className="w-5 h-5" />}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            actionLabel="Regarder"
          />
        ))}
      </div>
    </div>
  );
}
