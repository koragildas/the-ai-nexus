
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredTools = [
  {
    id: 1,
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'Assistant IA conversationnel polyvalent pour l\'écriture, l\'analyse et la résolution de problèmes.',
    category: 'Écriture',
    rating: 4.8,
    reviews: 15240,
    price: 'Freemium',
    image: '/placeholder.svg',
    featured: true
  },
  {
    id: 2,
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'Générateur d\'images IA de haute qualité à partir de descriptions textuelles.',
    category: 'Image',
    rating: 4.9,
    reviews: 8950,
    price: 'Payant',
    image: '/placeholder.svg',
    featured: true
  },
  {
    id: 3,
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'Assistant de programmation IA qui aide les développeurs à écrire du code plus rapidement.',
    category: 'Code',
    rating: 4.7,
    reviews: 12340,
    price: 'Payant',
    image: '/placeholder.svg',
    featured: true
  }
];

export const FeaturedAI = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
            <Crown className="h-4 w-4 mr-2" />
            Outils en vedette
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Les outils IA les plus populaires
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les outils d'IA les plus appréciés par notre communauté
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {tool.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {tool.name}
                    </h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tool.price === 'Gratuit' 
                      ? 'bg-green-100 text-green-800'
                      : tool.price === 'Freemium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tool.price}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(tool.rating) ? 'fill-current' : ''
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {tool.rating} ({tool.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>

                <Link to={`/outil/${tool.slug}`}>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    Découvrir
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
