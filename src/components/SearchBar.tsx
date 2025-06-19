
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'tool' | 'category';
  slug: string;
}

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
}

export const SearchBar = ({ className = "", onClose }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Données de démonstration - dans un vrai projet, cela viendrait d'une API
  const mockData: SearchResult[] = [
    { id: '1', title: 'ChatGPT', description: 'Assistant conversationnel IA', category: 'Chat & Communication', type: 'tool', slug: 'chatgpt' },
    { id: '2', title: 'DALL-E', description: 'Génération d\'images par IA', category: 'Image & Design', type: 'tool', slug: 'dall-e' },
    { id: '3', title: 'Midjourney', description: 'Création artistique par IA', category: 'Image & Design', type: 'tool', slug: 'midjourney' },
    { id: '4', title: 'GitHub Copilot', description: 'Assistant de programmation', category: 'Développement', type: 'tool', slug: 'github-copilot' },
    { id: '5', title: 'Jasper', description: 'Rédaction assistée par IA', category: 'Rédaction', type: 'tool', slug: 'jasper' },
    { id: '6', title: 'Assistant IA', description: 'Assistants intelligents pour vos tâches', category: 'Assistant IA', type: 'category', slug: 'assistant-ia' },
    { id: '7', title: 'Développement', description: 'Outils pour développeurs', category: 'Développement', type: 'category', slug: 'developpement' },
    { id: '8', title: 'Image & Design', description: 'Génération et édition d\'images', category: 'Image & Design', type: 'category', slug: 'image-design' },
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredResults = mockData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'tool') {
      navigate(`/outil/${result.slug}`);
    } else {
      navigate(`/categorie/${result.slug}`);
    }
    setSearchTerm('');
    setIsOpen(false);
    onClose?.();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Rechercher des outils IA..."
          className="pl-10 pr-10 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setIsOpen(true)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="p-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{result.title}</h4>
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {result.type === 'tool' ? 'Outil' : 'Catégorie'}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {isOpen && searchTerm && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50">
          <CardContent className="p-4 text-center text-gray-500">
            Aucun résultat trouvé pour "{searchTerm}"
          </CardContent>
        </Card>
      )}
    </div>
  );
};
