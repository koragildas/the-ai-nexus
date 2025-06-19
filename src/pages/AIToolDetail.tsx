
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Heart, 
  Bookmark,
  Users,
  Calendar,
  Globe,
  Zap
} from 'lucide-react';

const AIToolDetail = () => {
  const { toolSlug } = useParams();

  // Simulation des données d'outil IA
  const toolData = {
    'chatgpt': {
      name: 'ChatGPT',
      category: 'Écriture',
      description: 'ChatGPT est un modèle de langage IA développé par OpenAI qui peut converser, répondre aux questions et aider dans diverses tâches de rédaction.',
      longDescription: 'ChatGPT (Chat Generative Pre-trained Transformer) est un chatbot IA lancé par OpenAI en novembre 2022. Il est basé sur la famille de modèles de langage GPT-3.5 et GPT-4 d\'OpenAI et a été affiné à l\'aide de techniques d\'apprentissage supervisé et par renforcement.',
      rating: 4.8,
      users: '100M+',
      website: 'https://chat.openai.com',
      pricing: 'Freemium',
      features: [
        'Conversations naturelles en temps réel',
        'Génération de contenu créatif',
        'Assistance à la programmation',
        'Traduction multilingue',
        'Analyse et résumé de textes',
        'Aide aux devoirs et recherches'
      ],
      pros: [
        'Interface utilisateur intuitive',
        'Réponses très cohérentes',
        'Large base de connaissances',
        'Gratuit avec limitations'
      ],
      cons: [
        'Informations parfois obsolètes',
        'Peut générer du contenu inexact',
        'Limitations dans la version gratuite'
      ]
    },
    'midjourney': {
      name: 'Midjourney',
      category: 'Image',
      description: 'Midjourney est un programme d\'intelligence artificielle qui génère des images à partir de descriptions textuelles.',
      longDescription: 'Midjourney est un laboratoire de recherche indépendant qui produit un programme d\'intelligence artificielle du même nom qui crée des images à partir de descriptions textuelles, similaire aux DALL-E d\'OpenAI et au Stable Diffusion.',
      rating: 4.9,
      users: '15M+',
      website: 'https://midjourney.com',
      pricing: 'Payant',
      features: [
        'Génération d\'images haute qualité',
        'Styles artistiques variés',
        'Interface Discord intégrée',
        'Modes de rendu avancés',
        'Upscaling et variations',
        'Communauté active'
      ],
      pros: [
        'Qualité d\'image exceptionnelle',
        'Grande créativité artistique',
        'Communauté très active',
        'Mises à jour régulières'
      ],
      cons: [
        'Uniquement via Discord',
        'Pas de version gratuite',
        'Courbe d\'apprentissage'
      ]
    }
  };

  const currentTool = toolData[toolSlug as keyof typeof toolData];

  if (!currentTool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Outil non trouvé</h1>
            <p className="text-gray-600 mb-8">L'outil demandé n'existe pas.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
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
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux outils
            </Link>
          </div>

          {/* En-tête de l'outil */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">
                      {currentTool.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentTool.name}</h1>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-sm">
                        {currentTool.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{currentTool.rating}</span>
                        <span className="text-gray-500 ml-1">(2.5k avis)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">
                  {currentTool.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Essayer {currentTool.name}
                  </Button>
                  <Button variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    Ajouter aux favoris
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                </div>
              </div>

              {/* Statistiques */}
              <div className="lg:ml-8 lg:flex-shrink-0">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-1">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Utilisateurs</span>
                    </div>
                    <div className="font-bold text-xl">{currentTool.users}</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-1">
                      <Globe className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Prix</span>
                    </div>
                    <div className="font-bold text-xl">{currentTool.pricing}</div>
                  </div>
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
                  <CardTitle>À propos de {currentTool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {currentTool.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Fonctionnalités */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Fonctionnalités principales
                  </CardTitle>
                  <CardDescription>
                    Découvrez ce que {currentTool.name} peut faire pour vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentTool.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Avantages et Inconvénients */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Avantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentTool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Inconvénients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentTool.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Barre latérale */}
            <div className="space-y-6">
              {/* Informations de l'outil */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Site web</div>
                    <a 
                      href={currentTool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {currentTool.website}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Catégorie</div>
                    <Badge variant="secondary">{currentTool.category}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tarification</div>
                    <div className="font-medium">{currentTool.pricing}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Partage social */}
              <Card>
                <CardHeader>
                  <CardTitle>Partager</CardTitle>
                </CardHeader>
                <CardContent>
                  <SocialShare
                    url={window.location.href}
                    title={`Découvrez ${currentTool.name}`}
                    description={currentTool.description}
                  />
                </CardContent>
              </Card>

              {/* Outils similaires */}
              <Card>
                <CardHeader>
                  <CardTitle>Outils similaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(toolData)
                      .filter(([slug]) => slug !== toolSlug)
                      .slice(0, 2)
                      .map(([slug, tool]) => (
                        <Link key={slug} to={`/outil/${slug}`} className="block">
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white font-bold text-sm">
                                {tool.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{tool.name}</h4>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                <span className="text-xs text-gray-600">{tool.rating}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
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

export default AIToolDetail;
