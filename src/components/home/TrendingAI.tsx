
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trendingTools = [
  {
    id: 1,
    name: 'Suno AI',
    description: 'Générez de la musique complète avec paroles grâce à l\'IA',
    logo: '🎵',
    category: 'Audio & Musique',
    rating: 4.6,
    users: '1M+',
    trend: '+250%',
    isNew: true
  },
  {
    id: 2,
    name: 'Claude 3',
    description: 'Le nouvel assistant IA d\'Anthropic aux capacités avancées',
    logo: '🧠',
    category: 'Assistant IA',
    rating: 4.7,
    users: '10M+',
    trend: '+180%',
    isNew: false
  },
  {
    id: 3,
    name: 'Leonardo AI',
    description: 'Génération d\'images avec contrôle créatif avancé',
    logo: '🖼️',
    category: 'Image & Design',
    rating: 4.5,
    users: '2M+',
    trend: '+300%',
    isNew: true
  },
  {
    id: 4,
    name: 'Cursor',
    description: 'Éditeur de code IA pour développeurs modernes',
    logo: '⚡',
    category: 'Développement',
    rating: 4.7,
    users: '500K+',
    trend: '+400%',
    isNew: true
  }
];

export const TrendingAI = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Tendances du moment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Outils IA en pleine croissance
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Les nouveaux outils qui font sensation dans la communauté IA
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingTools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-background/80 backdrop-blur-sm card-hover">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl sm:text-3xl">{tool.logo}</div>
                  <div className="flex flex-col items-end space-y-1">
                    {tool.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1">
                        Nouveau
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400 font-medium">
                      <TrendingUp className="h-3 w-3" />
                      <span>{tool.trend}</span>
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <Badge variant="outline" className="text-xs">
                  {tool.category}
                </Badge>
                
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{tool.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{tool.users}</span>
                  </div>
                </div>

                <Link to={`/outil/${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}>
                  <Button variant="outline" className="w-full text-xs sm:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Découvrir
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link to="/tendances">
            <Button size="lg" className="hover-scale text-sm sm:text-base">
              Voir toutes les tendances
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
