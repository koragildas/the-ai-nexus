
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Users, DollarSign } from 'lucide-react';

// Données d'exemple d'outils IA par catégorie
const aiToolsByCategory = {
  'ecriture': [
    {
      id: 1,
      name: 'ChatGPT',
      description: 'Assistant IA conversationnel pour l\'écriture et la rédaction',
      logo: '🤖',
      link: 'https://chatgpt.com',
      price: 'Freemium',
      rating: 4.8,
      users: '100M+',
      tags: ['Rédaction', 'Créativité', 'Assistant']
    },
    {
      id: 2,
      name: 'Jasper',
      description: 'IA spécialisée dans la création de contenu marketing et publicitaire',
      logo: '✨',
      link: 'https://jasper.ai',
      price: 'Payant',
      rating: 4.5,
      users: '1M+',
      tags: ['Marketing', 'Copywriting', 'Contenu']
    },
    {
      id: 3,
      name: 'Copy.ai',
      description: 'Générateur de texte IA pour le marketing et les ventes',
      logo: '📝',
      link: 'https://copy.ai',
      price: 'Freemium',
      rating: 4.3,
      users: '500K+',
      tags: ['Marketing', 'Ventes', 'Automatisation']
    }
  ],
  'image': [
    {
      id: 4,
      name: 'DALL-E 3',
      description: 'Générateur d\'images IA de haute qualité par OpenAI',
      logo: '🎨',
      link: 'https://openai.com/dall-e-3',
      price: 'Payant',
      rating: 4.7,
      users: '10M+',
      tags: ['Génération', 'Art', 'Créativité']
    },
    {
      id: 5,
      name: 'Midjourney',
      description: 'IA artistique pour créer des images impressionnantes',
      logo: '🌟',
      link: 'https://midjourney.com',
      price: 'Payant',
      rating: 4.9,
      users: '15M+',
      tags: ['Art', 'Design', 'Illustration']
    },
    {
      id: 6,
      name: 'Canva AI',
      description: 'Outils IA intégrés dans Canva pour le design',
      logo: '🎭',
      link: 'https://canva.com',
      price: 'Freemium',
      rating: 4.4,
      users: '75M+',
      tags: ['Design', 'Templates', 'Social Media']
    }
  ],
  'video': [
    {
      id: 7,
      name: 'Runway ML',
      description: 'Suite d\'outils IA pour la création et l\'édition vidéo',
      logo: '🎬',
      link: 'https://runwayml.com',
      price: 'Freemium',
      rating: 4.6,
      users: '2M+',
      tags: ['Montage', 'Effets', 'Génération']
    },
    {
      id: 8,
      name: 'Pictory',
      description: 'Création de vidéos à partir de texte avec IA',
      logo: '📹',
      link: 'https://pictory.ai',
      price: 'Payant',
      rating: 4.2,
      users: '300K+',
      tags: ['Text-to-Video', 'Marketing', 'Automatisation']
    }
  ],
  'code': [
    {
      id: 9,
      name: 'GitHub Copilot',
      description: 'Assistant IA pour la programmation et le développement',
      logo: '💻',
      link: 'https://github.com/features/copilot',
      price: 'Payant',
      rating: 4.5,
      users: '5M+',
      tags: ['Développement', 'Autocomplétion', 'Productivité']
    },
    {
      id: 10,
      name: 'Cursor',
      description: 'Éditeur de code IA pour développeurs',
      logo: '⚡',
      link: 'https://cursor.sh',
      price: 'Freemium',
      rating: 4.7,
      users: '500K+',
      tags: ['IDE', 'IA', 'Développement']
    }
  ]
};

const categoryNames = {
  'ecriture': 'Écriture',
  'image': 'Image', 
  'video': 'Vidéo',
  'code': 'Code',
  'business': 'Business',
  'education': 'Éducation',
  'audio': 'Audio',
  'chatbots': 'Chatbots'
};

const CategoryDetailPage = () => {
  const { categorySlug } = useParams();
  const tools = aiToolsByCategory[categorySlug as keyof typeof aiToolsByCategory] || [];
  const categoryName = categoryNames[categorySlug as keyof typeof categoryNames] || 'Catégorie';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Outils IA - {categoryName}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez les meilleurs outils d'intelligence artificielle pour {categoryName.toLowerCase()}.
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{tool.logo}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{tool.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{tool.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span className={`font-medium ${tool.price === 'Gratuit' ? 'text-green-600' : tool.price === 'Freemium' ? 'text-blue-600' : 'text-orange-600'}`}>
                            {tool.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => window.open(tool.link, '_blank')}
                      >
                        Visiter le site
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucun outil disponible pour cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetailPage;
