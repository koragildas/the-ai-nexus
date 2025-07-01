import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SubmittedTool } from '@/types/admin';

interface ToolsContextType {
  tools: SubmittedTool[];
  addTool: (tool: Omit<SubmittedTool, 'id' | 'submittedAt' | 'status' | 'submittedBy'>) => void;
  updateToolStatus: (toolId: string, status: 'approved' | 'rejected', reviewData?: { reviewedBy: string; rejectionReason?: string }) => void;
  deleteTool: (toolId: string) => void;
  getToolsByStatus: (status: 'pending' | 'approved' | 'rejected') => SubmittedTool[];
  getToolsByCategory: (category: string) => SubmittedTool[];
  searchTools: (query: string) => SubmittedTool[];
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};

interface ToolsProviderProps {
  children: ReactNode;
}

export const ToolsProvider: React.FC<ToolsProviderProps> = ({ children }) => {
  const [tools, setTools] = useState<SubmittedTool[]>([
    {
      id: '1',
      name: 'Nova AI Writer',
      description: 'Un assistant d\'écriture IA avancé pour la création de contenu',
      longDescription: 'Nova AI Writer utilise les dernières technologies d\'IA pour créer du contenu de haute qualité, corriger la grammaire et traduire dans plusieurs langues.',
      url: 'https://nova-ai-writer.com',
      category: 'writing',
      pricing: 'Freemium',
      rating: '4.5',
      users: '50K+',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      features: ['Génération de contenu', 'Correction grammaticale', 'Traduction'],
      pros: ['Interface intuitive', 'Résultats de qualité'],
      cons: ['Version gratuite limitée'],
      tags: ['écriture', 'contenu', 'IA'],
      status: 'pending',
      submittedBy: 'user@example.com',
      submittedAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      name: 'AI Image Generator Pro',
      description: 'Générateur d\'images IA professionnel',
      longDescription: 'Créez des images époustouflantes avec notre IA de pointe. Styles multiples, haute résolution, génération rapide.',
      url: 'https://ai-image-pro.com',
      category: 'image',
      pricing: 'Payant',
      rating: '4.8',
      users: '100K+',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      features: ['Génération d\'images', 'Styles multiples', 'Haute résolution'],
      pros: ['Qualité exceptionnelle', 'Rapide'],
      cons: ['Prix élevé'],
      tags: ['image', 'génération', 'art'],
      status: 'approved',
      submittedBy: 'admin@example.com',
      submittedAt: '2024-01-19T14:30:00Z',
      reviewedBy: 'superadmin@ainexus.com',
      reviewedAt: '2024-01-19T16:00:00Z'
    },
    {
      id: '3',
      name: 'Voice AI Assistant',
      description: 'Assistant vocal intelligent pour les entreprises',
      longDescription: 'Un assistant vocal IA qui peut gérer les appels clients, reconnaissance vocale avancée et intégration CRM.',
      url: 'https://voice-ai-assistant.com',
      category: 'chatbots',
      pricing: 'Payant',
      rating: '4.2',
      users: '25K+',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop',
      features: ['Reconnaissance vocale', 'Réponses automatiques', 'Intégration CRM'],
      pros: ['Très naturel', 'Facile à intégrer'],
      cons: ['Coût élevé', 'Langues limitées'],
      tags: ['vocal', 'assistant', 'entreprise'],
      status: 'approved',
      submittedBy: 'voice@example.com',
      submittedAt: '2024-01-21T08:30:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-21T10:00:00Z'
    }
  ]);

  useEffect(() => {
    const savedTools = localStorage.getItem('ainexus-tools');
    if (savedTools) {
      try {
        setTools(JSON.parse(savedTools));
      } catch (error) {
        console.error('Erreur lors du chargement des outils:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ainexus-tools', JSON.stringify(tools));
  }, [tools]);

  const addTool = (toolData: Omit<SubmittedTool, 'id' | 'submittedAt' | 'status' | 'submittedBy'>) => {
    const newTool: SubmittedTool = {
      ...toolData,
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      submittedBy: localStorage.getItem('userEmail') || 'utilisateur@example.com'
    };
    
    setTools(prev => [newTool, ...prev]);
  };

  const updateToolStatus = (
    toolId: string, 
    status: 'approved' | 'rejected', 
    reviewData?: { reviewedBy: string; rejectionReason?: string }
  ) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId 
        ? { 
            ...tool, 
            status,
            reviewedBy: reviewData?.reviewedBy || 'admin@ainexus.com',
            reviewedAt: new Date().toISOString(),
            rejectionReason: reviewData?.rejectionReason
          }
        : tool
    ));
  };

  const deleteTool = (toolId: string) => {
    setTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  const getToolsByStatus = (status: 'pending' | 'approved' | 'rejected') => {
    return tools.filter(tool => tool.status === status);
  };

  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category === category && tool.status === 'approved');
  };

  const searchTools = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return tools.filter(tool => 
      tool.status === 'approved' && (
        tool.name.toLowerCase().includes(lowercaseQuery) ||
        tool.description.toLowerCase().includes(lowercaseQuery) ||
        tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    );
  };

  const value = {
    tools,
    addTool,
    updateToolStatus,
    deleteTool,
    getToolsByStatus,
    getToolsByCategory,
    searchTools
  };

  return (
    <ToolsContext.Provider value={value}>
      {children}
    </ToolsContext.Provider>
  );
};
