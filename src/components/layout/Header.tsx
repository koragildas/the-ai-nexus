
import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDashboardPath = () => {
    if (user?.role === 'superadmin') return '/super-admin';
    return '/dashboard';
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="hover-scale">
                <h1 className="text-2xl font-bold gradient-text">
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
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-foreground/80 hover:text-foreground smooth-transition">
              Accueil
            </Link>
            <Link to="/categories" className="text-foreground/80 hover:text-foreground smooth-transition">
              Catégories
            </Link>
            <Link to="/populaires" className="text-foreground/80 hover:text-foreground smooth-transition">
              Populaires
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/soumettre" className="text-foreground/80 hover:text-foreground smooth-transition">
                  Soumettre un outil
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials(user?.name || 'U')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-sm" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardPath()}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Tableau de bord</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="hover-scale">
                  <User className="mr-2 h-4 w-4" />
                  Connexion
                </Button>
              </Link>
            )}
            
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/80"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar className="w-full" />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-foreground/80 hover:text-foreground smooth-transition py-2" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
              <Link to="/categories" className="text-foreground/80 hover:text-foreground smooth-transition py-2" onClick={() => setIsMenuOpen(false)}>
                Catégories
              </Link>
              <Link to="/populaires" className="text-foreground/80 hover:text-foreground smooth-transition py-2" onClick={() => setIsMenuOpen(false)}>
                Populaires
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/soumettre" className="text-foreground/80 hover:text-foreground smooth-transition py-2" onClick={() => setIsMenuOpen(false)}>
                    Soumettre un outil
                  </Link>
                  <Link to={getDashboardPath()} className="text-foreground/80 hover:text-foreground smooth-transition py-2" onClick={() => setIsMenuOpen(false)}>
                    Tableau de bord
                  </Link>
                  <button onClick={handleLogout} className="text-foreground/80 hover:text-foreground smooth-transition py-2 text-left">
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-foreground/80 hover:text-foreground smooth-transition py-2" onClick={() => setIsMenuOpen(false)}>
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
