
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
      category: 'redaction',
      pricing: 'freemium',
      rating: '4.5',
      users: '50K+',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      features: ['Génération de contenu', 'Correction grammaticale', 'Traduction'],
      pros: ['Interface intuitive', 'Résultats de qualité'],
      cons: ['Version gratuite limitée'],
      tags: ['écriture', 'contenu', 'IA'],
      status: 'approved',
      submittedBy: 'user@example.com',
      submittedAt: '2024-01-20T10:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-20T12:00:00Z'
    },
    {
      id: '2',
      name: 'AI Image Generator Pro',
      description: 'Générateur d\'images IA professionnel',
      longDescription: 'Créez des images époustouflantes avec notre IA de pointe. Styles multiples, haute résolution, génération rapide.',
      url: 'https://ai-image-pro.com',
      category: 'image-design',
      pricing: 'paid',
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
      category: 'assistant-ia',
      pricing: 'paid',
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
    },
    {
      id: '4',
      name: 'Code AI Helper',
      description: 'Assistant IA pour le développement et la programmation',
      longDescription: 'Un outil puissant qui aide les développeurs à écrire du code plus rapidement avec des suggestions intelligentes.',
      url: 'https://code-ai-helper.com',
      category: 'developpement',
      pricing: 'freemium',
      rating: '4.6',
      users: '75K+',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      features: ['Autocomplétion de code', 'Détection d\'erreurs', 'Refactoring'],
      pros: ['Très précis', 'Supporte plusieurs langages'],
      cons: ['Consomme beaucoup de ressources'],
      tags: ['code', 'développement', 'programmation'],
      status: 'approved',
      submittedBy: 'dev@example.com',
      submittedAt: '2024-01-22T09:15:00Z',
      reviewedBy: 'auto-approved',
      reviewedAt: '2024-01-22T09:15:00Z'
    },
        {
      id: '5',
      name: 'ChatBot Smart',
      description: 'Chatbot intelligent pour le service client',
      longDescription: 'Un chatbot avancé qui peut répondre aux questions des clients de manière naturelle et efficace.',
      url: 'https://chatbot-smart.com',
      category: 'chat-communication',
      pricing: 'freemium',
      rating: '4.3',
      users: '30K+',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      features: ['Réponses automatiques', 'Intégration multiplateforme', 'Apprentissage continu'],
      pros: ['Facile à configurer', 'Très réactif'],
      cons: ['Limité en version gratuite'],
      tags: ['chatbot', 'service client', 'automatisation'],
      status: 'approved',
      submittedBy: 'support@example.com',
      submittedAt: '2024-01-23T11:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-23T12:00:00Z'
    },
    {
      id: '6',
      name: 'Music AI Composer',
      description: 'Compositeur de musique alimenté par IA',
      longDescription: 'Créez des compositions musicales originales dans différents styles avec l\'aide de l\'intelligence artificielle.',
      url: 'https://music-ai-composer.com',
      category: 'audio-musique',
      pricing: 'paid',
      rating: '4.5',
      users: '15K+',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      features: ['Composition automatique', 'Styles multiples', 'Export haute qualité'],
      pros: ['Très créatif', 'Qualité professionnelle'],
      cons: ['Prix élevé', 'Courbe d\'apprentissage'],
      tags: ['musique', 'composition', 'créativité'],
      status: 'approved',
      submittedBy: 'music@example.com',
      submittedAt: '2024-01-24T14:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-24T15:00:00Z'
    },
    {
      id: '7',
      name: 'Video AI Editor',
      description: 'Éditeur vidéo assisté par IA',
      longDescription: 'Créez et éditez des vidéos professionnelles avec l\'aide de l\'intelligence artificielle.',
      url: 'https://video-ai-editor.com',
      category: 'video',
      pricing: 'freemium',
      rating: '4.4',
      users: '20K+',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
      features: ['Montage automatique', 'Effets IA', 'Export 4K'],
      pros: ['Interface intuitive', 'Résultats rapides'],
      cons: ['Limité en version gratuite'],
      tags: ['vidéo', 'montage', 'IA'],
      status: 'approved',
      submittedBy: 'video@example.com',
      submittedAt: '2024-01-25T10:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-25T11:00:00Z'
    },
    {
      id: '8',
      name: 'Data AI Analyzer',
      description: 'Analyseur de données intelligent',
      longDescription: 'Analysez vos données avec des algorithmes d\'IA avancés pour obtenir des insights précieux.',
      url: 'https://data-ai-analyzer.com',
      category: 'analyse-calcul',
      pricing: 'paid',
      rating: '4.6',
      users: '12K+',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      features: ['Analyse prédictive', 'Visualisations', 'Rapports automatiques'],
      pros: ['Très précis', 'Interface claire'],
      cons: ['Prix élevé'],
      tags: ['données', 'analyse', 'statistiques'],
      status: 'approved',
      submittedBy: 'data@example.com',
      submittedAt: '2024-01-26T09:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-26T10:00:00Z'
    },
    {
      id: '9',
      name: 'Creative AI Studio',
      description: 'Studio créatif assisté par IA',
      longDescription: 'Créez des œuvres d\'art, logos et designs uniques avec notre suite créative IA.',
      url: 'https://creative-ai-studio.com',
      category: 'art-creativite',
      pricing: 'freemium',
      rating: '4.7',
      users: '35K+',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
      features: ['Génération d\'art', 'Design de logos', 'Styles multiples'],
      pros: ['Très créatif', 'Facile à utiliser'],
      cons: ['Limité en version gratuite'],
      tags: ['art', 'créativité', 'design'],
      status: 'approved',
      submittedBy: 'creative@example.com',
      submittedAt: '2024-01-27T14:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-27T15:00:00Z'
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
      status: 'approved', // Auto-approuver les nouveaux outils
      submittedAt: new Date().toISOString(),
      submittedBy: localStorage.getItem('userEmail') || 'utilisateur@example.com',
      reviewedBy: 'auto-approved',
      reviewedAt: new Date().toISOString()
    };
    
    console.log('Nouvel outil ajouté avec catégorie:', newTool.category, newTool);
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
    const filteredTools = tools.filter(tool => tool.status === status);
    console.log(`Outils avec statut ${status}:`, filteredTools.length);
    return filteredTools;
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
