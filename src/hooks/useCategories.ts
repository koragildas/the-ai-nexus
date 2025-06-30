
import { useQuery } from '@tanstack/react-query';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  toolCount: number;
  color: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Conversation & Assistants',
    slug: 'conversation',
    description: 'Assistants IA et chatbots conversationnels',
    icon: 'MessageSquare',
    toolCount: 45,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Génération d\'Images',
    slug: 'image',
    description: 'Outils de création et édition d\'images par IA',
    icon: 'Image',
    toolCount: 32,
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Écriture & Contenu',
    slug: 'writing',
    description: 'Rédaction, correction et optimisation de contenu',
    icon: 'PenTool',
    toolCount: 28,
    color: 'bg-green-500'
  },
  {
    id: '4',
    name: 'Analyse de Données',
    slug: 'analytics',
    description: 'Analyse et visualisation de données avec IA',
    icon: 'BarChart3',
    toolCount: 19,
    color: 'bg-orange-500'
  },
  {
    id: '5',
    name: 'Programmation',
    slug: 'coding',
    description: 'Assistants de code et outils de développement',
    icon: 'Code',
    toolCount: 24,
    color: 'bg-red-500'
  },
  {
    id: '6',
    name: 'Audio & Voix',
    slug: 'audio',
    description: 'Synthèse vocale, transcription et traitement audio',
    icon: 'Mic',
    toolCount: 16,
    color: 'bg-pink-500'
  }
];

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCategories;
    },
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCategories.find(cat => cat.slug === slug) || null;
    },
    enabled: !!slug,
  });
};
