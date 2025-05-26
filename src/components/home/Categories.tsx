
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Image, 
  Video, 
  Code, 
  Briefcase, 
  GraduationCap,
  Music,
  MessageSquare
} from 'lucide-react';

const categories = [
  {
    name: 'Écriture',
    slug: 'ecriture',
    icon: PenTool,
    count: 125,
    color: 'bg-blue-500',
    description: 'Rédaction, copywriting, correction'
  },
  {
    name: 'Image',
    slug: 'image',
    icon: Image,
    count: 89,
    color: 'bg-purple-500',
    description: 'Génération, édition, design'
  },
  {
    name: 'Vidéo',
    slug: 'video',
    icon: Video,
    count: 67,
    color: 'bg-green-500',
    description: 'Montage, génération, animation'
  },
  {
    name: 'Code',
    slug: 'code',
    icon: Code,
    count: 156,
    color: 'bg-orange-500',
    description: 'Programmation, debug, assistance'
  },
  {
    name: 'Business',
    slug: 'business',
    icon: Briefcase,
    count: 78,
    color: 'bg-red-500',
    description: 'Productivité, analyse, stratégie'
  },
  {
    name: 'Éducation',
    slug: 'education',
    icon: GraduationCap,
    count: 45,
    color: 'bg-indigo-500',
    description: 'Apprentissage, formation, tutoriels'
  },
  {
    name: 'Audio',
    slug: 'audio',
    icon: Music,
    count: 34,
    color: 'bg-pink-500',
    description: 'Génération, édition, synthèse vocale'
  },
  {
    name: 'Chatbots',
    slug: 'chatbots',
    icon: MessageSquare,
    count: 92,
    color: 'bg-teal-500',
    description: 'Assistants, conversation, support'
  }
];

export const Categories = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group block"
              >
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {category.description}
                </p>
                <div className="text-sm font-medium text-blue-600">
                  {category.count} outils
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
