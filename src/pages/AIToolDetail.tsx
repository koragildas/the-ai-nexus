
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/SocialShare';
import { 
  Star, 
  ExternalLink, 
  Users, 
  DollarSign, 
  Globe, 
  Shield, 
  Zap, 
  Heart,
  ArrowLeft,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Données détaillées des outils IA
const aiToolsData = {
  'chatgpt': {
    id: 1,
    name: 'ChatGPT',
    description: 'Assistant IA conversationnel polyvalent développé par OpenAI, capable de comprendre et générer du texte dans de nombreuses langues.',
    longDescription: 'ChatGPT est un modèle de langage conversationnel qui utilise l\'apprentissage automatique pour produire du texte semblable à celui d\'un humain. Il peut aider avec l\'écriture, l\'analyse, la programmation, la traduction, et bien plus encore.',
    category: 'Écriture',
    rating: 4.8,
    reviews: 15240,
    price: 'Freemium',
    website: 'https://chatgpt.com',
    languages: ['Français', 'Anglais', 'Espagnol', 'Plus de 50 langues'],
    features: [
      'Conversation naturelle',
      'Génération de contenu',
      'Assistance à la programmation',
      'Traduction de langues',
      'Analyse de documents',
      'Résolution de problèmes mathématiques'
    ],
    pros: [
      'Interface intuitive et facile à utiliser',
      'Réponses de haute qualité',
      'Support multilingue excellent',
      'Mise à jour régulière du modèle',
      'API disponible pour les développeurs'
    ],
    cons: [
      'Limitations dans la version gratuite',
      'Peut générer des informations incorrectes',
      'Connaissance limitée aux données d\'entraînement',
      'Coût élevé pour un usage intensif'
    ],
    useCases: [
      'Rédaction d\'articles et blogs',
      'Assistance au développement',
      'Traduction de documents',
      'Génération d\'idées créatives',
      'Support client automatisé',
      'Aide aux devoirs et recherches'
    ],
    pricing: {
      free: 'Accès limité avec GPT-3.5',
      paid: '20€/mois pour ChatGPT Plus (GPT-4)'
    },
    company: 'OpenAI',
    founded: '2022',
    users: '100M+'
  },
  'midjourney': {
    id: 2,
    name: 'Midjourney',
    description: 'Générateur d\'images IA révolutionnaire qui crée des œuvres d\'art à partir de descriptions textuelles.',
    longDescription: 'Midjourney est un programme d\'intelligence artificielle qui génère des images à partir de descriptions textuelles. Il est particulièrement reconnu pour sa capacité à créer des œuvres d\'art de style artistique et fantastique.',
    category: 'Image',
    rating: 4.9,
    reviews: 8950,
    price: 'Payant',
    website: 'https://midjourney.com',
    languages: ['Anglais', 'Français (partiel)'],
    features: [
      'Génération d\'images haute résolution',
      'Styles artistiques variés',
      'Commandes Discord intégrées',
      'Modes de qualité ajustables',
      'Variations d\'images',
      'Outpainting et inpainting'
    ],
    pros: [
      'Qualité artistique exceptionnelle',
      'Interface Discord familière',
      'Communauté active et créative',
      'Mises à jour fréquentes',
      'Résultats impressionnants'
    ],
    cons: [
      'Pas de version gratuite',
      'Interface uniquement sur Discord',
      'Temps d\'attente en heures de pointe',
      'Contrôle limité sur le résultat final'
    ],
    useCases: [
      'Création d\'illustrations',
      'Concept art pour jeux vidéo',
      'Designs pour réseaux sociaux',
      'Art numérique personnel',
      'Prototypage visuel',
      'Inspiration créative'
    ],
    pricing: {
      basic: '10$/mois - Plan Basic',
      standard: '30$/mois - Plan Standard',
      pro: '60$/mois - Plan Pro'
    },
    company: 'Midjourney Inc.',
    founded: '2021',
    users: '15M+'
  },
  'github-copilot': {
    id: 3,
    name: 'GitHub Copilot',
    description: 'Assistant de programmation IA qui aide les développeurs à écrire du code plus rapidement et efficacement.',
    longDescription: 'GitHub Copilot est un assistant de programmation alimenté par l\'IA qui suggère du code et des fonctions entières en temps réel, directement depuis votre éditeur.',
    category: 'Code',
    rating: 4.7,
    reviews: 12340,
    price: 'Payant',
    website: 'https://github.com/features/copilot',
    languages: ['Tous les langages de programmation'],
    features: [
      'Autocomplétion de code intelligente',
      'Génération de fonctions complètes',
      'Support multi-langages',
      'Intégration IDE native',
      'Suggestions contextuelles',
      'Documentation automatique'
    ],
    pros: [
      'Intégration parfaite avec VS Code',
      'Améliore significativement la productivité',
      'Suggestions de haute qualité',
      'Apprentissage continu',
      'Support excellent des frameworks populaires'
    ],
    cons: [
      'Abonnement payant requis',
      'Peut générer du code sous-optimal',
      'Dépendance potentielle',
      'Problèmes de confidentialité du code'
    ],
    useCases: [
      'Développement web frontend/backend',
      'Scripts d\'automatisation',
      'Prototypage rapide',
      'Apprentissage de nouveaux langages',
      'Refactoring de code',
      'Génération de tests unitaires'
    ],
    pricing: {
      individual: '10$/mois - Usage individuel',
      business: '19$/mois/utilisateur - Équipes'
    },
    company: 'GitHub (Microsoft)',
    founded: '2021',
    users: '5M+'
  }
};

const AIToolDetailPage = () => {
  const { toolSlug } = useParams();
  const tool = aiToolsData[toolSlug as keyof typeof aiToolsData];

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Outil non trouvé</h1>
            <p className="text-gray-600 mb-8">L'outil demandé n'existe pas.</p>
            <Link to="/">
              <Button>Retour à l'accueil</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </div>

          {/* En-tête de l'outil */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl">
                  {tool.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {tool.name}
                  </h1>
                  <Badge variant="secondary">{tool.category}</Badge>
                  <Badge variant={tool.price === 'Gratuit' ? 'default' : 'outline'}>
                    {tool.price}
                  </Badge>
                </div>
                
                <p className="text-xl text-gray-600 mb-4">{tool.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(tool.rating) ? 'fill-current' : ''
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{tool.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({tool.reviews.toLocaleString()} avis)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{tool.users} utilisateurs</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    onClick={() => window.open(tool.website, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Visiter le site officiel
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Ajouter aux favoris
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description détaillée */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    Description détaillée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{tool.longDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Fonctionnalités principales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Avantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">Inconvénients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cas d'usage populaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.useCases.map((useCase, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-800 font-medium">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informations clés */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Informations clés
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Entreprise</h4>
                    <p className="text-gray-600">{tool.company}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lancé en</h4>
                    <p className="text-gray-600">{tool.founded}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Langues supportées</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tool.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Tarification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(tool.pricing).map(([plan, price]) => (
                    <div key={plan} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-900">{price}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Partage social */}
              <Card>
                <CardHeader>
                  <CardTitle>Partager cet outil</CardTitle>
                </CardHeader>
                <CardContent>
                  <SocialShare
                    url={window.location.href}
                    title={tool.name}
                    description={tool.description}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(tool.website, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Essayer maintenant
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Sauvegarder
                    </Button>
                  </div>
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

export default AIToolDetailPage;
