
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Brain, Code, MessageSquare, Image, Music, Video, FileText, Calculator, Palette } from 'lucide-react';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données des catégories avec slugs pour la navigation
  const allCategories = [
    {
      id: 1,
      name: 'Assistant IA',
      slug: 'assistant-ia',
      description: 'Assistants intelligents pour vous aider dans vos tâches quotidiennes',
      icon: Brain,
      count: 45,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Développement',
      slug: 'developpement',
      description: 'Outils pour développeurs et programmeurs',
      icon: Code,
      count: 32,
      color: 'green'
    },
    {
      id: 3,
      name: 'Rédaction',
      slug: 'redaction',
      description: 'Génération et amélioration de contenu textuel',
      icon: FileText,
      count: 28,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Chat & Communication',
      slug: 'chat-communication',
      description: 'Chatbots et outils de communication intelligents',
      icon: MessageSquare,
      count: 23,
      color: 'orange'
    },
    {
      id: 5,
      name: 'Image & Design',
      slug: 'image-design',
      description: 'Génération et édition d\'images par IA',
      icon: Image,
      count: 41,
      color: 'pink'
    },
    {
      id: 6,
      name: 'Audio & Musique',
      slug: 'audio-musique',
      description: 'Création et édition audio assistée par IA',
      icon: Music,
      count: 19,
      color: 'indigo'
    },
    {
      id: 7,
      name: 'Vidéo',
      slug: 'video',
      description: 'Production et édition vidéo avec IA',
      icon: Video,
      count: 15,
      color: 'red'
    },
    {
      id: 8,
      name: 'Analyse & Calcul',
      slug: 'analyse-calcul',
      description: 'Outils d\'analyse de données et calculs',
      icon: Calculator,
      count: 22,
      color: 'teal'
    },
    {
      id: 9,
      name: 'Art & Créativité',
      slug: 'art-creativite',
      description: 'Outils créatifs pour artistes et designers',
      icon: Palette,
      count: 31,
      color: 'yellow'
    }
  ];

  // Filtrer les catégories selon le terme de recherche
  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:group-hover:bg-blue-800',
      green: 'bg-green-100 text-green-600 group-hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:group-hover:bg-green-800',
      purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:group-hover:bg-purple-800',
      orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:group-hover:bg-orange-800',
      pink: 'bg-pink-100 text-pink-600 group-hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300 dark:group-hover:bg-pink-800',
      indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:group-hover:bg-indigo-800',
      red: 'bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:group-hover:bg-red-800',
      teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-300 dark:group-hover:bg-teal-800',
      yellow: 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:group-hover:bg-yellow-800'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Toutes les catégories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Explorez nos outils d'IA organisés par catégories pour trouver exactement ce dont vous avez besoin.
            </p>
            
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Rechercher une catégorie..."
                  className="pl-10 pr-4 py-3 w-full text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune catégorie trouvée pour "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link key={category.id} to={`/categories/${category.slug}`}>
                    <Card className="group hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${getColorClasses(category.color)}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {category.count} outils
                          </div>
                        </div>
                        <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-gray-900 dark:text-white">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
