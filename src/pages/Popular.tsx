
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FeaturedAI } from '@/components/home/FeaturedAI';
import { TrendingAI } from '@/components/home/TrendingAI';
import { TrendingUp } from 'lucide-react';

const PopularPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Outils populaires
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Les outils IA les plus populaires
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez les outils d'intelligence artificielle les plus appréciés et utilisés par notre communauté.
            </p>
          </div>
        </div>
        
        <FeaturedAI />
        <TrendingAI />
      </main>
      <Footer />
    </div>
  );
};

export default PopularPage;
