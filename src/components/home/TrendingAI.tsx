
import React from 'react';
import { TrendingUp, Star } from 'lucide-react';

const trendingTools = [
  { name: 'Claude 3', category: 'Écriture', rating: 4.8, trend: '+245%' },
  { name: 'Runway ML', category: 'Vidéo', rating: 4.6, trend: '+189%' },
  { name: 'ElevenLabs', category: 'Audio', rating: 4.7, trend: '+156%' },
  { name: 'Perplexity', category: 'Recherche', rating: 4.5, trend: '+134%' },
  { name: 'Cursor', category: 'Code', rating: 4.9, trend: '+123%' }
];

export const TrendingAI = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tendances
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Outils IA en forte croissance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Les outils qui gagnent en popularité cette semaine
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {trendingTools.map((tool, index) => (
            <div
              key={tool.name}
              className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-4">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-700">{tool.rating}</span>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {tool.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
