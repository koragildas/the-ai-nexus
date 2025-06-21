
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { FeaturedAI } from '@/components/home/FeaturedAI';
import { Categories } from '@/components/home/Categories';
import { TrendingAI } from '@/components/home/TrendingAI';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main>
        <Hero />
        <FeaturedAI />
        <Categories />
        <TrendingAI />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
