
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Code, 
  FileText, 
  MessageSquare,
  Image,
  Music,
  Video,
  Calculator,
  Palette
} from 'lucide-react';

const categories = [
  {
    name: 'Assistant IA',
    slug: 'assistant-ia',
    icon: Brain,
    count: 45,
    color: 'bg-blue-500',
    description: 'Assistants intelligents pour vos tâches'
  },
  {
    name: 'Développement',
    slug: 'developpement',
    icon: Code,
    count: 32,
    color: 'bg-green-500',
    description: 'Outils pour développeurs'
  },
  {
    name: 'Rédaction',
    slug: 'redaction',
    icon: FileText,
    count: 28,
    color: 'bg-purple-500',
    description: 'Génération de contenu textuel'
  },
  {
    name: 'Chat & Communication',
    slug: 'chat-communication',
    icon: MessageSquare,
    count: 23,
    color: 'bg-orange-500',
    description: 'Chatbots et communication'
  },
  {
    name: 'Image & Design',
    slug: 'image-design',
    icon: Image,
    count: 41,
    color: 'bg-pink-500',
    description: 'Génération et édition d\'images'
  },
  {
    name: 'Audio & Musique',
    slug: 'audio-musique',
    icon: Music,
    count: 19,
    color: 'bg-indigo-500',
    description: 'Création audio assistée par IA'
  },
  {
    name: 'Vidéo',
    slug: 'video',
    icon: Video,
    count: 15,
    color: 'bg-red-500',
    description: 'Production vidéo avec IA'
  },
  {
    name: 'Analyse & Calcul',
    slug: 'analyse-calcul',
    icon: Calculator,
    count: 22,
    color: 'bg-teal-500',
    description: 'Analyse de données et calculs'
  }
];

export const Categories = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trouvez rapidement les outils IA adaptés à vos besoins spécifiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                to={`/categorie/${category.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group block"
              >
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {category.description}
                </p>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {category.count} outils
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
          >
            Voir toutes les catégories
          </Link>
        </div>
      </div>
    </section>
  );
};
