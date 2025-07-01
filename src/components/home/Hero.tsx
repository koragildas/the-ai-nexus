
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-sm font-medium mb-8 animate-bounce-in">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          <span className="gradient-text">Plus de 1000+ outils IA référencés</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in">
          Découvrez les meilleurs{' '}
          <span className="gradient-text">
            outils d'IA
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
          La plateforme de référence pour explorer, comparer et découvrir 
          les outils d'intelligence artificielle qui transformeront votre workflow.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link to="/categories">
            <Button size="lg" className="btn-primary group">
              <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Explorer les outils
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/soumettre">
            <Button variant="outline" size="lg" className="btn-secondary">
              Soumettre un outil
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
