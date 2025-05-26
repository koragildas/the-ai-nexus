
import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Nexus
              </h1>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Rechercher des outils IA..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Catégories</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Populaires</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Soumettre un outil</a>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Rechercher des outils IA..."
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Catégories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Populaires</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Soumettre un outil</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
