
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Star, 
  Users, 
  Calendar, 
  Globe, 
  Shield, 
  Zap,
  ArrowLeft,
  Heart,
  Share2,
  MessageSquare
} from 'lucide-react';

const AIToolDetailPage = () => {
  const { toolSlug } = useParams();

  // Mock data - in real app this would come from API
  const toolData = {
    id: 1,
    name: 'ChatGPT',
    description: 'ChatGPT est un assistant IA conversationnel développé par OpenAI. Il peut vous aider dans une multitude de tâches, de la rédaction à la programmation, en passant par l\'analyse de données et la résolution de problèmes créatifs.',
    longDescription: 'ChatGPT représente une révolution dans le domaine de l\'intelligence artificielle conversationnelle. Basé sur l\'architecture GPT (Generative Pre-trained Transformer), cet outil peut comprendre le contexte, maintenir des conversations cohérentes et fournir des réponses détaillées sur une vaste gamme de sujets. Que vous soyez étudiant, professionnel, créateur de contenu ou simplement curieux, ChatGPT s\'adapte à vos besoins spécifiques.',
    logo: '🤖',
    link: 'https://chatgpt.com',
    category: 'Assistant IA',
    price: 'Freemium',
    rating: 4.8,
    users: '100M+',
    launchDate: '2022-11-30',
    website: 'https://openai.com',
    tags: ['Conversation', 'Assistance', 'Productivité', 'Rédaction', 'Code', 'Analyse'],
    features: [
      'Conversations naturelles et contextuelles',
      'Aide à la rédaction et correction',
      'Assistance à la programmation',
      'Analyse et synthèse de documents',
      'Traduction multilingue',
      'Résolution de problèmes mathématiques'
    ],
    useCases: [
      {
        title: 'Rédaction professionnelle',
        description: 'Créez des emails, rapports et présentations efficaces'
      },
      {
        title: 'Apprentissage et formation',
        description: 'Obtenez des explications détaillées sur n\'importe quel sujet'
      },
      {
        title: 'Développement logiciel',
        description: 'Assistance au code, débogage et explication d\'algorithmes'
      },
      {
        title: 'Créativité',
        description: 'Brainstorming, écriture créative et génération d\'idées'
      }
    ],
    pricing: [
      {
        plan: 'Gratuit',
        price: '0€/mois',
        features: ['Accès limité', 'Modèle GPT-3.5', 'Support communautaire']
      },
      {
        plan: 'Plus',
        price: '20€/mois',
        features: ['Accès prioritaire', 'GPT-4', 'Support par email', 'Plugins']
      },
      {
        plan: 'Équipe',
        price: '25€/mois/utilisateur',
        features: ['Tout Plus', 'Gestion d\'équipe', 'Analytiques', 'Support prioritaire']
      }
    ],
    pros: [
      'Interface intuitive et facile à utiliser',
      'Réponses de haute qualité et contextuelles',
      'Large éventail de cas d\'usage',
      'Mises à jour régulières et améliorations'
    ],
    cons: [
      'Limitations dans la version gratuite',
      'Peut parfois générer des informations incorrectes',
      'Dépendant d\'une connexion internet'
    ],
    alternatives: [
      { name: 'Claude', category: 'Assistant IA' },
      { name: 'Bard', category: 'Assistant IA' },
      { name: 'Perplexity', category: 'Recherche IA' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 sm:mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-foreground transition-colors">Catégories</Link>
            <span>/</span>
            <Link to={`/categorie/${toolData.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground transition-colors">
              {toolData.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{toolData.name}</span>
          </div>

          {/* Header */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="flex-1">
                <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-5xl lg:text-6xl flex-shrink-0">{toolData.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{toolData.name}</h1>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {toolData.category}
                      </Badge>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                      {toolData.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{toolData.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{toolData.users} utilisateurs</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Lancé en {new Date(toolData.launchDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {toolData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="lg:w-80 flex flex-col gap-3">
                <Button size="lg" className="w-full" onClick={() => window.open(toolData.link, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Essayer {toolData.name}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Favoris
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </Button>
                </div>
                <div className="text-center">
                  <Badge variant={toolData.price === 'Gratuit' ? 'default' : toolData.price === 'Freemium' ? 'secondary' : 'outline'}>
                    {toolData.price}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">À propos de {toolData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {toolData.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Fonctionnalités principales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {toolData.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Use Cases */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Cas d'usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    {toolData.useCases.map((useCase, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-sm sm:text-base mb-2">{useCase.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-green-600 dark:text-green-400">Avantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {toolData.pros.map((pro, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-xs sm:text-sm text-muted-foreground">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg text-red-600 dark:text-red-400">Inconvénients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {toolData.cons.map((con, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-xs sm:text-sm text-muted-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Tarification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {toolData.pricing.map((plan, index) => (
                      <div key={index} className="border border-border rounded-lg p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-sm sm:text-base">{plan.plan}</h4>
                          <span className="font-bold text-sm sm:text-base text-primary">{plan.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-xs sm:text-sm text-muted-foreground flex items-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Informations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Site web
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => window.open(toolData.website, '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Sécurité
                      </span>
                      <Badge variant="outline" className="text-xs">Certifiée</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alternatives */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Alternatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {toolData.alternatives.map((alt, index) => (
                      <Link
                        key={index}
                        to={`/outil/${alt.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-2 sm:p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">{alt.name}</span>
                          <Badge variant="outline" className="text-xs">{alt.category}</Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 sm:mt-12">
            <Link to={`/categorie/${toolData.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button variant="outline" className="text-sm sm:text-base">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux outils {toolData.category}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIToolDetailPage;
