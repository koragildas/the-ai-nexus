
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';

export const Hero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-bounce-in">
            <Sparkles className="h-4 w-4" />
            <span>Découvrez les meilleurs outils IA</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-in">
            <span className="gradient-text">AI Nexus</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-normal text-muted-foreground mt-4 block">
              Votre guide des outils IA
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Explorez, comparez et choisissez parmi plus de 500 outils d'intelligence artificielle. 
            Trouvez la solution parfaite pour vos projets créatifs et professionnels.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto animate-slide-up">
            <SearchBar className="w-full" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
            <Link to="/categories">
              <Button size="lg" className="hover-scale">
                Explorer les catégories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/populaires">
              <Button variant="outline" size="lg" className="hover-scale">
                Outils populaires
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-bounce-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Outils référencés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Gratuit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
