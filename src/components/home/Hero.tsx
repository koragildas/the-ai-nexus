
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';

export const Hero = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium animate-bounce-in">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Découvrez les meilleurs outils IA</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight animate-fade-in">
            <span className="gradient-text">AI Nexus</span>
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-muted-foreground mt-2 sm:mt-4 block">
              Votre guide des outils IA
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed animate-slide-up px-4">
            Explorez, comparez et choisissez parmi plus de 500 outils d'intelligence artificielle. 
            Trouvez la solution parfaite pour vos projets créatifs et professionnels.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto animate-slide-up px-4">
            <SearchBar className="w-full" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 animate-slide-up px-4">
            <Link to="/categories">
              <Button size="lg" className="w-full sm:w-auto hover-scale text-sm sm:text-base px-6 sm:px-8">
                Explorer les catégories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/populaires">
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover-scale text-sm sm:text-base px-6 sm:px-8">
                Outils populaires
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-8 sm:pt-12 animate-bounce-in px-4">
            <div className="text-center p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Outils référencés</div>
            </div>
            <div className="text-center p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">15</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Catégories</div>
            </div>
            <div className="text-center p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Gratuit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
