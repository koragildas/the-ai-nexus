
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, label: 'Utilisateurs actifs', value: '10,000+' },
    { icon: Target, label: 'Outils référencés', value: '500+' },
    { icon: Award, label: 'Partenaires', value: '50+' },
    { icon: Globe, label: 'Pays couverts', value: '25+' }
  ];

  const team = [
    {
      name: 'Alexandre Martin',
      role: 'CEO & Fondateur',
      description: 'Expert en IA avec 10 ans d\'expérience dans le développement de solutions innovantes.'
    },
    {
      name: 'Sarah Dubois',
      role: 'CTO',
      description: 'Ingénieure logiciel passionnée par l\'intelligence artificielle et les nouvelles technologies.'
    },
    {
      name: 'Marc Lefebvre',
      role: 'Head of Product',
      description: 'Spécialiste UX/UI avec une vision claire de l\'expérience utilisateur optimale.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À propos d'AI Nexus
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre mission est de démocratiser l'accès aux outils d'intelligence artificielle 
              en créant la plateforme de référence pour découvrir, comparer et choisir 
              les meilleures solutions IA du marché.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Histoire</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  AI Nexus est né d'un constat simple : dans un monde où l'intelligence artificielle 
                  évolue à une vitesse fulgurante, il devient de plus en plus difficile de s'y retrouver 
                  parmi la multitude d'outils disponibles.
                </p>
                <p className="mb-6">
                  Fondée en 2023 par une équipe d'experts passionnés par l'IA, notre plateforme vise 
                  à simplifier la découverte et l'adoption des technologies d'intelligence artificielle 
                  pour tous, des particuliers aux grandes entreprises.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'être la référence francophone pour la découverte 
                  d'outils IA, avec une communauté grandissante d'utilisateurs qui nous font confiance 
                  pour les guider dans leurs choix technologiques.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <CardTitle className="text-center">{member.name}</CardTitle>
                    <CardDescription className="text-center text-blue-600 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Transparence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nous croyons en la transparence totale. Tous nos avis et comparaisons 
                    sont objectifs et basés sur des critères clairement définis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nous restons à la pointe de l'innovation pour vous présenter 
                    les outils les plus récents et les plus performants du marché.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Accessibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Notre plateforme est conçue pour être accessible à tous, 
                    quel que soit votre niveau de connaissance en IA.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">Communauté</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nous construisons une communauté d'utilisateurs passionnés 
                    qui partagent leurs expériences et s'entraident.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
