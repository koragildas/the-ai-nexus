
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Sélection de la rédaction
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Outils IA incontournables
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les outils d'IA les plus populaires et les plus performants du moment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredTools.map((tool, index) => (
            <Card key={tool.id} className={`group hover:shadow-xl transition-all duration-300 ${index === 0 ? 'lg:col-span-1 lg:row-span-2' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl lg:text-4xl">{tool.logo}</div>
                  <Badge variant={tool.price === 'Gratuit' ? 'default' : tool.price === 'Freemium' ? 'secondary' : 'outline'}>
                    {tool.price}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{tool.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{tool.users}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Link to={`/outil/${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Découvrir
                    </Button>
                  </Link>
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open(tool.link, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visiter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/populaires">
            <Button variant="outline" size="lg" className="hover-scale">
              Voir tous les outils populaires
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
