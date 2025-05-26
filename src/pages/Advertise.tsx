
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, TrendingUp, Users, Mail, Phone } from 'lucide-react';

const AdvertisePage = () => {
  const features = [
    "Audience qualifiée de professionnels et passionnés d'IA",
    "Formats publicitaires variés et non-intrusifs",
    "Ciblage par catégorie et centre d'intérêt",
    "Statistiques détaillées en temps réel",
    "Support client dédié",
    "Facturation flexible"
  ];

  const packages = [
    {
      name: "Starter",
      price: "299€",
      period: "/mois",
      description: "Parfait pour les startups",
      features: [
        "Banner 728x90 sur toutes les pages",
        "Listing sponsorisé (3 outils max)",
        "10 000 impressions garanties",
        "Rapport mensuel",
        "Support par email"
      ]
    },
    {
      name: "Professional",
      price: "599€",
      period: "/mois",
      description: "Le plus populaire",
      popular: true,
      features: [
        "Banner 728x90 + 300x250",
        "Listing sponsorisé (10 outils max)",
        "25 000 impressions garanties",
        "Newsletter sponsorisée",
        "Rapport hebdomadaire",
        "Support prioritaire"
      ]
    },
    {
      name: "Enterprise",
      price: "1299€",
      period: "/mois",
      description: "Pour les grandes entreprises",
      features: [
        "Tous les formats publicitaires",
        "Listing sponsorisé illimité",
        "50 000 impressions garanties",
        "Article sponsorisé mensuel",
        "Rapport quotidien",
        "Support téléphonique dédié"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-8">
              <Target className="h-4 w-4 mr-2" />
              Publicité sur AI Nexus
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Touchez votre audience{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                d'experts IA
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Promouvoez vos outils et services d'IA auprès de milliers de professionnels, 
              développeurs et passionnés d'intelligence artificielle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Commencer maintenant
                <Mail className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Télécharger le media kit
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Visiteurs mensuels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1K+</div>
                <div className="text-gray-600">Outils référencés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-gray-600">Professionnels IT</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Advertise */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pourquoi choisir AI Nexus ?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Une plateforme spécialisée qui attire une audience qualifiée et engagée
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Audience ciblée</h3>
                <p className="text-gray-600">Développeurs, entrepreneurs et passionnés d'IA</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Croissance rapide</h3>
                <p className="text-gray-600">+200% de visiteurs ces 6 derniers mois</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ROI optimisé</h3>
                <p className="text-gray-600">Formats publicitaires non-intrusifs et efficaces</p>
              </div>
            </div>

            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ce que vous obtenez :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos formules publicitaires
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choisissez la formule qui correspond le mieux à vos objectifs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                      Plus populaire
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-gray-600">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={pkg.popular ? "default" : "outline"}>
                      Choisir cette formule
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prêt à démarrer ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contactez notre équipe commerciale pour discuter de vos besoins
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">publicite@ainexus.fr</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Téléphone</h3>
                <p className="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Planifier un appel
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdvertisePage;
