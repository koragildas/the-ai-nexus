
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6 sm:space-y-8">
          {/* 404 Illustration */}
          <div className="text-6xl sm:text-8xl lg:text-9xl font-bold text-primary/20 select-none">
            404
          </div>
          
          {/* Error Message */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Page introuvable
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          {/* Robot Emoji */}
          <div className="text-4xl sm:text-5xl lg:text-6xl animate-bounce">
            🤖
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto hover-scale">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover-scale">
                <Search className="mr-2 h-4 w-4" />
                Explorer les outils
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            <p>Vous pouvez également :</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <Link to="/populaires" className="hover:text-foreground transition-colors underline">
                Voir les outils populaires
              </Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-foreground transition-colors underline">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
