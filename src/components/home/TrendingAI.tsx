
import React from 'react';
import { TrendingUp, Star, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const trendingTools = [
  { name: 'Claude 3', category: 'Écriture', rating: 4.8, trend: '+245%', color: 'from-orange-500 to-red-500' },
  { name: 'Runway ML', category: 'Vidéo', rating: 4.6, trend: '+189%', color: 'from-purple-500 to-pink-500' },
  { name: 'ElevenLabs', category: 'Audio', rating: 4.7, trend: '+156%', color: 'from-green-500 to-blue-500' },
  { name: 'Perplexity', category: 'Recherche', rating: 4.5, trend: '+134%', color: 'from-blue-500 to-cyan-500' },
  { name: 'Cursor', category: 'Code', rating: 4.9, trend: '+123%', color: 'from-indigo-500 to-purple-500' }
];

export const TrendingAI = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-700 dark:text-green-400 font-semibold">Tendances</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Outils IA en forte croissance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Les outils qui gagnent en popularité cette semaine
          </p>
        </div>

        <Card className="glass-effect overflow-hidden">
          <CardContent className="p-0">
            {trendingTools.map((tool, index) => (
              <div
                key={tool.name}
                className="flex items-center justify-between p-6 border-b border-border/50 last:border-b-0 hover:bg-accent/50 smooth-transition group"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium text-foreground">{tool.rating}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tool.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
