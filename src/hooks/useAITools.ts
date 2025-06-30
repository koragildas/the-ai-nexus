
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  website: string;
  logo: string;
  pricing: 'free' | 'freemium' | 'paid';
  rating: number;
  reviewCount: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
  createdAt: string;
  status: 'active' | 'pending' | 'rejected';
}

const mockAITools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'IA conversationnelle avancée pour le dialogue et la génération de texte',
    category: 'conversation',
    website: 'https://chat.openai.com',
    logo: '/placeholder.svg',
    pricing: 'freemium',
    rating: 4.8,
    reviewCount: 15420,
    featured: true,
    trending: true,
    tags: ['conversation', 'texte', 'assistant'],
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'Génération d\'images par IA à partir de descriptions textuelles',
    category: 'image',
    website: 'https://midjourney.com',
    logo: '/placeholder.svg',
    pricing: 'paid',
    rating: 4.6,
    reviewCount: 8932,
    featured: true,
    trending: false,
    tags: ['image', 'art', 'créativité'],
    createdAt: '2024-01-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Claude',
    description: 'Assistant IA pour l\'analyse, l\'écriture et le codage',
    category: 'conversation',
    website: 'https://claude.ai',
    logo: '/placeholder.svg',
    pricing: 'freemium',
    rating: 4.7,
    reviewCount: 6543,
    featured: false,
    trending: true,
    tags: ['assistant', 'analyse', 'code'],
    createdAt: '2024-01-12',
    status: 'active'
  }
];

export const useAITools = () => {
  return useQuery({
    queryKey: ['aiTools'],
    queryFn: async () => {
      // Simulation d'un délai API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockAITools;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAITool = (id: string) => {
  return useQuery({
    queryKey: ['aiTool', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAITools.find(tool => tool.id === id) || null;
    },
    enabled: !!id,
  });
};

export const useFeaturedTools = () => {
  return useQuery({
    queryKey: ['featuredTools'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockAITools.filter(tool => tool.featured);
    },
  });
};

export const useTrendingTools = () => {
  return useQuery({
    queryKey: ['trendingTools'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockAITools.filter(tool => tool.trending);
    },
  });
};

export const useToolsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['toolsByCategory', category],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockAITools.filter(tool => tool.category === category);
    },
    enabled: !!category,
  });
};
