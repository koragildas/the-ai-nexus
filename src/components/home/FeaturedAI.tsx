
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredTools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'L\'assistant IA conversationnel le plus populaire au monde pour tous vos besoins de communication et de créativité.',
    logo: '🤖',
    link: 'https://chatgpt.com',
    category: 'Assistant IA',
    price: 'Freemium',
    rating: 4.8,
    users: '100M+',
    tags: ['Conversation', 'Assistance', 'Productivité'],
    featured: true
  },
  {
    id: 2,
    name: 'Midjourney',
    description: 'Créez des images artistiques époustouflantes avec cette IA de génération d\'images de pointe.',
    logo: '🎨',
    link: 'https://midjourney.com',
    category: 'Image & Design',
    price: 'Payant',
    rating: 4.9,
    users: '15M+',
    tags: ['Art', 'Design', 'Illustration'],
    featured: true
  },
  {
    id: 3,
    name: 'GitHub Copilot',
    description: 'Votre partenaire de programmation IA qui vous aide à écrire du code plus rapidement et efficacement.',
    logo: '💻',
    link: 'https://github.com/features/copilot',
    category: 'Développement',
    price: 'Payant',
    rating: 4.5,
    users: '5M+',
    tags: ['Développement', 'Code', 'Productivité'],
    featured: true
  }
];

export const FeaturedAI = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-4 text-xs sm:text-sm">
            Sélection de la rédaction
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Outils IA incontournables
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les outils d'IA les plus populaires et les plus performants du moment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredTools.map((tool, index) => (
            <Card key={tool.id} className={`group hover:shadow-xl transition-all duration-300 border-border/50 bg-background/80 backdrop-blur-sm ${index === 0 ? 'lg:col-span-1 lg:row-span-2' : ''}`}>
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="text-2xl sm:text-3xl lg:text-4xl">{tool.logo}</div>
                  <Badge variant={tool.price === 'Gratuit' ? 'default' : tool.price === 'Freemium' ? 'secondary' : 'outline'} className="text-xs">
                    {tool.price}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3 sm:space-y-4">
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

                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Link to={`/outil/${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`} className="flex-1">
                    <Button variant="outline" className="w-full text-xs sm:text-sm">
                      <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Découvrir
                    </Button>
                  </Link>
                  <Button 
                    className="flex-1 text-xs sm:text-sm" 
                    onClick={() => window.open(tool.link, '_blank')}
                  >
                    <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Visiter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link to="/populaires">
            <Button variant="outline" size="lg" className="hover-scale text-sm sm:text-base">
              Voir tous les outils populaires
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
