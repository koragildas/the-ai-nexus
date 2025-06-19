
import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SearchBar } from '@/components/SearchBar';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Nexus
                </h1>
              </Link>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">Catégories</Link>
            <Link to="/populaires" className="text-gray-700 hover:text-blue-600 transition-colors">Populaires</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/soumettre" className="text-gray-700 hover:text-blue-600 transition-colors">Soumettre un outil</Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    {user?.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Connexion
                </Button>
              </Link>
            )}
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
          <SearchBar className="w-full" />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Accueil</Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Catégories</Link>
              <Link to="/populaires" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Populaires</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/soumettre" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Soumettre un outil</Link>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Tableau de bord</Link>
                  <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left">
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Connexion</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
