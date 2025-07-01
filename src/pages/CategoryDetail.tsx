
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Users, DollarSign, Eye } from 'lucide-react';
import { useApprovedTools } from '@/hooks/useApprovedTools';

// Données statiques des outils IA par catégorie (conservées pour compléter l'affichage)
const staticToolsByCategory = {
  'assistant-ia': [
    {
      id: 'chatgpt-static',
      name: 'ChatGPT',
      description: 'Assistant IA conversationnel le plus populaire au monde',
      logo: '🤖',
      link: 'https://chatgpt.com',
      price: 'Freemium',
      rating: 4.8,
      users: '100M+',
      tags: ['Conversation', 'Assistance', 'Productivité']
    },
    {
      id: 'claude-static',
      name: 'Claude',
      description: 'Assistant IA d\'Anthropic pour des conversations intelligentes',
      logo: '🧠',
      link: 'https://claude.ai',
      price: 'Freemium',
      rating: 4.7,
      users: '10M+',
      tags: ['Analyse', 'Rédaction', 'Code']
    }
  ],
  'developpement': [
    {
      id: 'github-copilot-static',
      name: 'GitHub Copilot',
      description: 'Assistant IA pour la programmation et le développement',
      logo: '💻',
      link: 'https://github.com/features/copilot',
      price: 'Payant',
      rating: 4.5,
      users: '5M+',
      tags: ['Développement', 'Autocomplétion', 'Productivité']
    }
  ],
  'redaction': [
    {
      id: 'jasper-static',
      name: 'Jasper',
      description: 'IA spécialisée dans la création de contenu marketing',
      logo: '✨',
      link: 'https://jasper.ai',
      price: 'Payant',
      rating: 4.5,
      users: '1M+',
      tags: ['Marketing', 'Copywriting', 'Contenu']
    }
  ],
  'chat-communication': [
    {
      id: 'replika-static',
      name: 'Replika',
      description: 'Compagnon IA pour conversations personnelles et support émotionnel',
      logo: '💭',
      link: 'https://replika.ai',
      price: 'Freemium',
      rating: 4.2,
      users: '10M+',
      tags: ['Compagnon', 'Émotionnel', 'Personnel']
    }
  ],
  'image-design': [
    {
      id: 'midjourney-static',
      name: 'Midjourney',
      description: 'IA artistique pour créer des images impressionnantes',
      logo: '🌟',
      link: 'https://midjourney.com',
      price: 'Payant',
      rating: 4.9,
      users: '15M+',
      tags: ['Art', 'Design', 'Illustration']
    }
  ],
  'audio-musique': [
    {
      id: 'suno-static',
      name: 'Suno',
      description: 'Génération de musique complète avec paroles par IA',
      logo: '🎵',
      link: 'https://suno.com',
      price: 'Freemium',
      rating: 4.6,
      users: '1M+',
      tags: ['Musique', 'Paroles', 'Génération']
    }
  ],
  'video': [
    {
      id: 'runway-static',
      name: 'Runway ML',
      description: 'Suite d\'outils IA pour la création et l\'édition vidéo',
      logo: '🎬',
      link: 'https://runwayml.com',
      price: 'Freemium',
      rating: 4.6,
      users: '2M+',
      tags: ['Montage', 'Effets', 'Génération']
    }
  ],
  'analyse-calcul': [
    {
      id: 'wolfram-static',
      name: 'Wolfram Alpha',
      description: 'Moteur de calcul et d\'analyse de données avancé',
      logo: '🔢',
      link: 'https://wolframalpha.com',
      price: 'Freemium',
      rating: 4.5,
      users: '10M+',
      tags: ['Mathématiques', 'Calcul', 'Analyse']
    }
  ],
  'art-creativite': [
    {
      id: 'adobe-firefly-static',
      name: 'Adobe Firefly',
      description: 'Suite créative IA intégrée aux produits Adobe',
      logo: '🔥',
      link: 'https://firefly.adobe.com',
      price: 'Freemium',
      rating: 4.5,
      users: '5M+',
      tags: ['Adobe', 'Professionnel', 'Intégration']
    }
  ]
};

const categoryNames = {
  'assistant-ia': 'Assistant IA',
  'developpement': 'Développement',
  'redaction': 'Rédaction',
  'chat-communication': 'Chat & Communication',
  'image-design':  'Image & Design',
  'audio-musique': 'Audio & Musique',
  'video': 'Vidéo',
  'analyse-calcul': 'Analyse & Calcul',
  'art-creativite': 'Art & Créativité'
};

const CategoryDetailPage = () => {
  const { categorySlug } = useParams();
  const { getApprovedToolsByCategory } = useApprovedTools();
  
  // Récupérer les outils approuvés pour cette catégorie
  const approvedTools = getApprovedToolsByCategory(categorySlug || '');
  
  // Récupérer les outils statiques pour cette catégorie
  const staticTools = staticToolsByCategory[categorySlug as keyof typeof staticToolsByCategory] || [];
  
  // Combiner les outils approuvés et statiques
  const allTools = [...approvedTools, ...staticTools];
  
  const categoryName = categoryNames[categorySlug as keyof typeof categoryNames] || 'Catégorie';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Outils IA - {categoryName}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Découvrez les meilleurs outils d'intelligence artificielle pour {categoryName.toLowerCase()}.
            </p>
            {approvedTools.length > 0 && (
              <p className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full inline-block">
                {approvedTools.length} outil{approvedTools.length > 1 ? 's' : ''} récemment approuvé{approvedTools.length > 1 ? 's' : ''} par la communauté
              </p>
            )}
          </div>

          {allTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg dark:hover:shadow-gray-700/50 transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative">
                  {/* Badge pour les outils récemment approuvés */}
                  {!tool.id.includes('static') && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full font-medium">
                        Nouveau
                      </span>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{tool.logo}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{tool.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{tool.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{tool.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className={`font-medium ${tool.price === 'Gratuit' ? 'text-green-600 dark:text-green-400' : tool.price === 'Freemium' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {tool.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {tool.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{tool.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link 
                          to={`/outils/${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                          className="flex-1"
                        >
                          <Button 
                            variant="outline"
                            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Découvrir
                            <Eye className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white" 
                          onClick={() => window.open(tool.link, '_blank')}
                        >
                          Visiter
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Aucun outil disponible pour cette catégorie pour le moment.
              </p>
              <Link to="/submit-tool" className="mt-4 inline-block">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Suggérer un outil
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetailPage;
