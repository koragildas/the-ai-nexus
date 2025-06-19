
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              AI Nexus
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              La plateforme de référence pour découvrir et comparer les meilleurs outils d'intelligence artificielle.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Catégories</Link></li>
              <li><Link to="/populaires" className="hover:text-white transition-colors">Populaires</Link></li>
              <li><Link to="/soumettre" className="hover:text-white transition-colors">Soumettre un outil</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link to="/publicite" className="hover:text-white transition-colors">Publicité</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AI Nexus. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
