
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

export const useApprovedTools = () => {
  const { getToolsByStatus, tools } = useTools();

  const convertToPublicTool = (tool: SubmittedTool): PublicTool => ({
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
    category: tool.category,
    featured: false,
    trending: false,
    image: tool.image
  });

  const getApprovedTools = (): PublicTool[] => {
    const approvedTools = getToolsByStatus('approved');
    return approvedTools.map(convertToPublicTool);
  };

  const getApprovedToolsByCategory = (category: string): PublicTool[] => {
    const approvedTools = tools.filter(tool => 
      tool.status === 'approved' && tool.category === category
    );
    return approvedTools.map(convertToPublicTool);
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
