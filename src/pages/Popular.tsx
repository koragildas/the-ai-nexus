
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, Users, ExternalLink, Eye, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const PopularPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const popularTools = [
    {
      id: 1,
      name: 'ChatGPT',
      description: 'Assistant IA conversationnel le plus populaire au monde',
      logo: '🤖',
      link: 'https://chatgpt.com',
      category: 'Assistant IA',
      price: 'Freemium',
      rating: 4.8,
      users: '100M+',
      tags: ['Conversation', 'Assistance', 'Productivité'],
      rank: 1
    },
    {
      id: 2,
      name: 'Midjourney',
      description: 'IA artistique pour créer des images impressionnantes',
      logo: '🎨',
      link: 'https://midjourney.com',
      category: 'Image & Design',
      price: 'Payant',
      rating: 4.9,
      users: '15M+',
      tags: ['Art', 'Design', 'Illustration'],
      rank: 2
    },
    {
      id: 3,
      name: 'GitHub Copilot',
      description: 'Assistant IA pour la programmation et le développement',
      logo: '💻',
      link: 'https://github.com/features/copilot',
      category: 'Développement',
      price: 'Payant',
      rating: 4.5,
      users: '5M+',
      tags: ['Développement', 'Code', 'Productivité'],
      rank: 3
    },
    {
      id: 4,
      name: 'DALL-E 3',
      description: 'Générateur d\'images IA de haute qualité par OpenAI',
      logo: '🖼️',
      link: 'https://openai.com/dall-e-3',
      category: 'Image & Design',
      price: 'Payant',
      rating: 4.7,
      users: '10M+',
      tags: ['Génération', 'Art', 'OpenAI'],
      rank: 4
    },
    {
      id: 5,
      name: 'Claude 3',
      description: 'Assistant IA d\'Anthropic pour des conversations intelligentes',
      logo: '🧠',
      link: 'https://claude.ai',
      category: 'Assistant IA',
      price: 'Freemium',
      rating: 4.7,
      users: '10M+',
      tags: ['Analyse', 'Rédaction', 'Code'],
      rank: 5
    },
    {
      id: 6,
      name: 'Canva AI',
      description: 'Outils IA intégrés dans Canva pour le design',
      logo: '🎭',
      link: 'https://canva.com',
      category: 'Image & Design',
      price: 'Freemium',
      rating: 4.4,
      users: '75M+',
      tags: ['Design', 'Templates', 'Social Media'],
      rank: 6
    }
  ];

  const categories = ['all', 'Assistant IA', 'Image & Design', 'Développement', 'Audio & Musique', 'Vidéo'];

  const filteredTools = popularTools
    .filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'users':
          return parseInt(b.users.replace(/\D/g, '')) - parseInt(a.users.replace(/\D/g, ''));
        case 'rank':
          return a.rank - b.rank;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Les plus populaires</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Outils IA Populaires
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto">
              Découvrez les outils d'IA les plus utilisés et les mieux notés par la communauté.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher des outils populaires..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rank">Classement</SelectItem>
                    <SelectItem value="rating">Note</SelectItem>
                    <SelectItem value="users">Utilisateurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-background/80 backdrop-blur-sm card-hover">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="text-2xl sm:text-3xl">{tool.logo}</div>
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                          #{tool.rank}
                        </Badge>
                      </div>
                      <Badge variant={tool.price === 'Gratuit' ? 'default' : tool.price === 'Freemium' ? 'secondary' : 'outline'} className="text-xs">
                        {tool.price}
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed line-clamp-2">
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
                        <span>{tool.users} utilisateurs</span>
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>

                    <div className="flex flex-wrap gap-1">
                      {tool.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-1">
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
          ) : (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-base sm:text-lg">
                Aucun outil trouvé pour "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PopularPage;
