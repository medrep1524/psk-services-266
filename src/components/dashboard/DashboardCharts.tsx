import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, PieChart } from 'lucide-react';

interface ChartData {
  month: string;
  consultations: number;
  procedures: number;
  textes: number;
}

interface ContentData {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

interface DashboardChartsProps {
  consultationsData: ChartData[];
  contentData: ContentData[];
}

export function DashboardCharts({ consultationsData, contentData }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique d'évolution des consultations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            Évolution des consultations
          </CardTitle>
          <CardDescription>Graphique des consultations (derniers 6 mois)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-4">
            <div className="h-full relative">
              {/* Axes */}
              <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-gray-300">
                {/* Lignes de grille horizontales */}
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div
                    key={percent}
                    className="absolute w-full border-t border-gray-200"
                    style={{ bottom: `${percent}%` }}
                  >
                    <span className="absolute -left-8 text-xs text-gray-500 -translate-y-1/2">
                      {Math.round((percent / 100) * 2500)}
                    </span>
                  </div>
                ))}
                
                {/* Points et lignes de données */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Ligne des consultations totales */}
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    points={consultationsData
                      .map((data, index) => {
                        const x = (index / (consultationsData.length - 1)) * 100;
                        const y = 100 - (data.consultations / 2500) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(' ')}
                  />
                  
                  {/* Points sur la ligne */}
                  {consultationsData.map((data, index) => {
                    const x = (index / (consultationsData.length - 1)) * 100;
                    const y = 100 - (data.consultations / 2500) * 100;
                    return (
                      <circle
                        key={index}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="4"
                        fill="#3B82F6"
                        className="hover:r-6 transition-all cursor-pointer"
                      />
                    );
                  })}
                </svg>
                
                {/* Labels des mois */}
                <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-500">
                  {consultationsData.map((data, index) => (
                    <span key={index}>{data.month}</span>
                  ))}
                </div>
              </div>
              
              {/* Légende */}
              <div className="absolute top-0 right-0 text-xs">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Consultations totales</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique de répartition du contenu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-600" />
            Répartition par type de contenu
          </CardTitle>
          <CardDescription>Graphique en secteurs des contenus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contentData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="text-sm font-medium">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total des contenus: <span className="font-semibold">{contentData.reduce((acc, item) => acc + item.count, 0)}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}