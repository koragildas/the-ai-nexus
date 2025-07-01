
import { useMemo } from 'react';
import { useTools } from '@/contexts/ToolsContext';

export const usePublicTools = () => {
  const { tools } = useTools();

  const approvedTools = useMemo(() => {
    return tools.filter(tool => tool.status === 'approved');
  }, [tools]);

  const getToolsByCategory = (category: string) => {
    return approvedTools.filter(tool => tool.category === category);
  };

  const getFeaturedTools = () => {
    return approvedTools
      .filter(tool => parseFloat(tool.rating) >= 4.5)
      .slice(0, 6);
  };

  const getTrendingTools = () => {
    return approvedTools
      .filter(tool => tool.users && parseInt(tool.users.replace(/[^\d]/g, '')) >= 50000)
      .slice(0, 8);
  };

  const getPopularTools = () => {
    return approvedTools
      .sort((a, b) => {
        const aUsers = parseInt(a.users?.replace(/[^\d]/g, '') || '0');
        const bUsers = parseInt(b.users?.replace(/[^\d]/g, '') || '0');
        return bUsers - aUsers;
      })
      .slice(0, 12);
  };

  const searchTools = (query: string) => {
    if (!query.trim()) return approvedTools;
    
    const lowercaseQuery = query.toLowerCase();
    return approvedTools.filter(tool => 
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getToolById = (id: string) => {
    return approvedTools.find(tool => tool.id === id);
  };

  const getToolBySlug = (slug: string) => {
    return approvedTools.find(tool => 
      tool.name.toLowerCase().replace(/\s+/g, '-') === slug
    );
  };

  return {
    approvedTools,
    getToolsByCategory,
    getFeaturedTools,
    getTrendingTools,
    getPopularTools,
    searchTools,
    getToolById,
    getToolBySlug
  };
};
