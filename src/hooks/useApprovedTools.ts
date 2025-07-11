
import { useTools } from '@/contexts/ToolsContext';
import { SubmittedTool } from '@/types/admin';

export interface PublicTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  link: string;
  price: string;
  rating: number;
  users: string;
  tags: string[];
  category: string;
  featured?: boolean;
  trending?: boolean;
  image?: string;
}

// Mapping correct des catégories du formulaire vers les catégories d'affichage
const categoryMapping = {
  'assistant-ia': 'assistant-ia',
  'developpement': 'developpement', 
  'redaction': 'redaction',
  'chat-communication': 'chat-communication',
  'image-design': 'image-design',
  'audio-musique': 'audio-musique',
  'video': 'video',
  'analyse-calcul': 'analyse-calcul',
  'art-creativite': 'art-creativite',
  // Anciens mappings pour compatibilité
  'writing': 'redaction',
  'image': 'image-design',
  'business': 'analyse-calcul',
  'chatbots': 'assistant-ia'
};

export const useApprovedTools = () => {
  const { getToolsByStatus, tools } = useTools();

  const convertToPublicTool = (tool: SubmittedTool): PublicTool => {
    // Mapper la catégorie du formulaire vers la catégorie d'affichage
    const mappedCategory = categoryMapping[tool.category as keyof typeof categoryMapping] || tool.category;
    
    console.log(`Outil ${tool.name} - Catégorie originale: ${tool.category}, Catégorie mappée: ${mappedCategory}`);
    
    return {
      id: tool.id,
      name: tool.name,
      description: tool.description,
      logo: tool.image || tool.name.charAt(0),
      link: tool.url,
      price: tool.pricing === 'free' ? 'Gratuit' : 
             tool.pricing === 'freemium' ? 'Freemium' : 
             tool.pricing === 'paid' ? 'Payant' : tool.pricing,
      rating: parseFloat(tool.rating) || 4.0,
      users: tool.users || '1K+',
      tags: tool.tags,
      category: mappedCategory,
      featured: false,
      trending: false,
      image: tool.image
    };
  };

  const getApprovedTools = (): PublicTool[] => {
    const approvedTools = getToolsByStatus('approved');
    console.log('Outils approuvés trouvés:', approvedTools.length);
    return approvedTools.map(convertToPublicTool);
  };

  const getApprovedToolsByCategory = (categorySlug: string): PublicTool[] => {
    const approvedTools = getApprovedTools();
    console.log('Tous les outils approuvés:', approvedTools.map(t => ({ name: t.name, category: t.category })));
    const filteredTools = approvedTools.filter(tool => tool.category === categorySlug);
    console.log(`Recherche catégorie: ${categorySlug}`);
    console.log(`Outils trouvés pour la catégorie ${categorySlug}:`, filteredTools.length, filteredTools.map(t => t.name));
    return filteredTools;
  };

  const searchApprovedTools = (query: string): PublicTool[] => {
    const approvedTools = getApprovedTools();
    const lowercaseQuery = query.toLowerCase();
    return approvedTools.filter(tool => 
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getFeaturedTools = (): PublicTool[] => {
    const approvedTools = getApprovedTools();
    return approvedTools.slice(0, 3).map(tool => ({
      ...tool,
      featured: true
    }));
  };

  const getTrendingTools = (): PublicTool[] => {
    const approvedTools = getApprovedTools();
    return approvedTools
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
      .map(tool => ({
        ...tool,
        trending: true
      }));
  };

  return {
    getApprovedTools,
    getApprovedToolsByCategory,
    searchApprovedTools,
    getFeaturedTools,
    getTrendingTools
  };
};
