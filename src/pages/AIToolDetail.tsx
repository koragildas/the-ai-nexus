import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SocialShare } from '@/components/SocialShare';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import { useApprovedTools } from '@/hooks/useApprovedTools';
import { useTools } from '@/contexts/ToolsContext';
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Heart, 
  Bookmark,
  Users,
  Globe,
  Zap
} from 'lucide-react';

const AIToolDetail = () => {
  const { slug } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite, addToSaved, removeFromSaved, isSaved } = useFavorites();
  const { toast } = useToast();
  const { getApprovedTools } = useApprovedTools();
  const { tools } = useTools();

  // Récupérer les outils approuvés
  const approvedTools = getApprovedTools();
  
  // Base de données complète d'outils IA avec toutes leurs informations détaillées
  const toolData = {
    'chatgpt': {
      name: 'ChatGPT',
      category: 'Assistant IA',
      description: 'ChatGPT est un modèle de langage IA développé par OpenAI qui peut converser, répondre aux questions et aider dans diverses tâches de rédaction.',
      longDescription: 'ChatGPT (Chat Generative Pre-trained Transformer) est un chatbot IA lancé par OpenAI en novembre 2022. Il est basé sur la famille de modèles de langage GPT-3.5 et GPT-4 d\'OpenAI et a été affiné à l\'aide de techniques d\'apprentissage supervisé et par renforcement.',
      rating: 4.8,
      users: '100M+',
      website: 'https://chat.openai.com',
      pricing: 'Freemium',
      image: '/placeholder.svg',
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
    'claude': {
      name: 'Claude',
      category: 'Assistant IA',
      description: 'Assistant IA d\'Anthropic pour des conversations intelligentes et sécurisées.',
      longDescription: 'Claude est un assistant IA développé par Anthropic, conçu pour être utile, inoffensif et honnête. Il excelle dans l\'analyse de textes longs, la programmation et les conversations nuancées.',
      rating: 4.7,
      users: '10M+',
      website: 'https://claude.ai',
      pricing: 'Freemium',
      image: '/placeholder.svg',
      features: [
        'Analyse de documents longs',
        'Programmation avancée',
        'Conversations contextuelles',
        'Sécurité renforcée',
        'Raisonnement logique',
        'Support multilingue'
      ],
      pros: [
        'Excellente sécurité',
        'Analyse de longs textes',
        'Réponses nuancées',
        'Bon pour la programmation'
      ],
      cons: [
        'Moins populaire que ChatGPT',
        'Interface moins intuitive',
        'Limitations géographiques'
      ]
    },
    'midjourney': {
      name: 'Midjourney',
      category: 'Image & Design',
      description: 'Midjourney est un programme d\'intelligence artificielle qui génère des images à partir de descriptions textuelles.',
      longDescription: 'Midjourney est un laboratoire de recherche indépendant qui produit un programme d\'intelligence artificielle du même nom qui crée des images à partir de descriptions textuelles, similaire aux DALL-E d\'OpenAI et au Stable Diffusion.',
      rating: 4.9,
      users: '15M+',
      website: 'https://midjourney.com',
      pricing: 'Payant',
      image: '/placeholder.svg',
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
    },
    'github-copilot': {
      name: 'GitHub Copilot',
      category: 'Développement',
      description: 'Assistant IA pour la programmation et le développement de code.',
      longDescription: 'GitHub Copilot est un assistant de programmation IA qui aide les développeurs à écrire du code plus rapidement en fournissant des suggestions contextuelles directement dans l\'éditeur.',
      rating: 4.5,
      users: '5M+',
      website: 'https://github.com/features/copilot',
      pricing: 'Payant',
      image: '/placeholder.svg',
      features: [
        'Autocomplétion de code intelligente',
        'Support multi-langages',
        'Intégration IDE',
        'Génération de fonctions',
        'Documentation automatique',
        'Refactoring assisté'
      ],
      pros: [
        'Très précis pour le code',
        'Gain de productivité énorme',
        'Support excellent',
        'Intégration native GitHub'
      ],
      cons: [
        'Coût mensuel',
        'Parfois suggestions incorrectes',
        'Dépendance à l\'outil'
      ]
    },
    'jasper': {
      name: 'Jasper',
      category: 'Rédaction',
      description: 'IA spécialisée dans la création de contenu marketing et publicitaire.',
      longDescription: 'Jasper est un assistant d\'écriture IA conçu spécifiquement pour les équipes marketing et les créateurs de contenu, offrant des templates et des outils optimisés pour le marketing.',
      rating: 4.5,
      users: '1M+',
      website: 'https://jasper.ai',
      pricing: 'Payant',
      image: '/placeholder.svg',
      features: [
        'Templates marketing prêts',
        'Optimisation SEO',
        'Ton de marque personnalisé',
        'Génération de campagnes',
        'Collaboration d\'équipe',
        'Intégrations marketing'
      ],
      pros: [
        'Spécialisé marketing',
        'Templates de qualité',
        'Bon pour les équipes',
        'Résultats professionnels'
      ],
      cons: [
        'Prix élevé',
        'Courbe d\'apprentissage',
        'Pas de version gratuite'
      ]
    },
    'dall-e-3': {
      name: 'DALL-E 3',
      category: 'Image & Design',
      description: 'Générateur d\'images IA de haute qualité développé par OpenAI.',
      longDescription: 'DALL-E 3 est la dernière version du générateur d\'images d\'OpenAI, capable de créer des images détaillées et artistiques à partir de descriptions textuelles simples.',
      rating: 4.7,
      users: '10M+',
      website: 'https://openai.com/dall-e-3',
      pricing: 'Payant',
      image: '/placeholder.svg',
      features: [
        'Génération haute résolution',
        'Compréhension contextuelle',
        'Styles artistiques variés',
        'Intégration ChatGPT',
        'Édition d\'images',
        'Respect des prompts'
      ],
      pros: [
        'Qualité exceptionnelle',
        'Facile à utiliser',
        'Intégration OpenAI',
        'Résultats cohérents'
      ],
      cons: [
        'Coût par génération',
        'Limitations de contenu',
        'Pas de version gratuite'
      ]
    },
    'suno': {
      name: 'Suno',
      category: 'Audio & Musique',
      description: 'Générateur de musique IA capable de créer des chansons complètes avec paroles.',
      longDescription: 'Suno est un outil révolutionnaire qui permet de générer des chansons complètes avec musique et paroles à partir de simples descriptions textuelles.',
      rating: 4.6,
      users: '1M+',
      website: 'https://suno.com',
      pricing: 'Freemium',
      image: '/placeholder.svg',
      features: [
        'Génération de chansons complètes',
        'Création de paroles automatique',
        'Styles musicaux variés',
        'Qualité studio',
        'Export haute qualité',
        'Personnalisation avancée'
      ],
      pros: [
        'Résultats impressionnants',
        'Facile à utiliser',
        'Variété de styles',
        'Qualité professionnelle'
      ],
      cons: [
        'Limites version gratuite',
        'Parfois répétitif',
        'Contrôle limité'
      ]
    },
    'runway-ml': {
      name: 'Runway ML',
      category: 'Vidéo',
      description: 'Suite complète d\'outils IA pour la création et l\'édition vidéo.',
      longDescription: 'Runway ML offre une gamme complète d\'outils IA pour les créateurs vidéo, de la génération de vidéos à partir de texte aux effets spéciaux avancés.',
      rating: 4.6,
      users: '2M+',
      website: 'https://runwayml.com',
      pricing: 'Freemium',
      image: '/placeholder.svg',
      features: [
        'Génération vidéo text-to-video',
        'Effets spéciaux IA',
        'Suppression d\'arrière-plan',
        'Upscaling vidéo',
        'Motion tracking',
        'Collaboration en temps réel'
      ],
      pros: [
        'Outils très avancés',
        'Interface professionnelle',
        'Résultats de qualité',
        'Innovation constante'
      ],
      cons: [
        'Coût élevé',
        'Complexité d\'usage',
        'Ressources intensives'
      ]
    },
    'wolfram-alpha': {
      name: 'Wolfram Alpha',
      category: 'Analyse & Calcul',
      description: 'Moteur de calcul et d\'analyse de données computationnel avancé.',
      longDescription: 'Wolfram Alpha est un moteur de réponse computationnel qui répond aux questions en calculant des réponses à partir de données structurées.',
      rating: 4.5,
      users: '10M+',
      website: 'https://wolframalpha.com',
      pricing: 'Freemium',
      image: '/placeholder.svg',
      features: [
        'Calculs mathématiques avancés',
        'Analyse statistique',
        'Résolution d\'équations',
        'Graphiques et visualisations',
        'Base de données factuelles',
        'API développeur'
      ],
      pros: [
        'Précision exceptionnelle',
        'Large gamme de sujets',
        'Visualisations claires',
        'Fiabilité des données'
      ],
      cons: [
        'Interface complexe',
        'Courbe d\'apprentissage',
        'Limites version gratuite'
      ]
    },
    'adobe-firefly': {
      name: 'Adobe Firefly',
      category: 'Art & Créativité',
      description: 'Suite créative IA intégrée aux produits Adobe Creative Cloud.',
      longDescription: 'Adobe Firefly est la famille de modèles d\'IA créative d\'Adobe, intégrée directement dans les applications Creative Cloud pour améliorer les flux de travail créatifs.',
      rating: 4.5,
      users: '5M+',
      website: 'https://firefly.adobe.com',
      pricing: 'Freemium',
      image: '/placeholder.svg',
      features: [
        'Intégration Creative Cloud',
        'Génération d\'images',
        'Effets de texte',
        'Retouche automatique',
        'Génération de motifs',
        'Colorisation automatique'
      ],
      pros: [
        'Intégration parfaite Adobe',
        'Qualité professionnelle',
        'Flux de travail optimisé',
        'Formation commerciale sûre'
      ],
      cons: [
        'Limité à l\'écosystème Adobe',
        'Coût des abonnements',
        'Fonctionnalités en développement'
      ]
    }
  };

  // Chercher d'abord dans les outils approuvés
  const approvedTool = approvedTools.find(tool => 
    tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
  );

  // Si trouvé dans les outils approuvés, récupérer les données complètes depuis le contexte
  let currentTool;
  if (approvedTool) {
    // Rechercher l'outil complet dans le contexte pour récupérer toutes les données du formulaire
    const fullToolData = tools.find(tool => tool.id === approvedTool.id);
    
    currentTool = {
      name: approvedTool.name,
      category: approvedTool.category === 'assistant-ia' ? 'Assistant IA' : 
                approvedTool.category === 'developpement' ? 'Code' :
                approvedTool.category === 'redaction' ? 'Écriture' :
                approvedTool.category === 'image-design' ? 'Image' :
                approvedTool.category === 'video' ? 'Vidéo' :
                approvedTool.category === 'audio-musique' ? 'Audio' : 'Autre',
      description: approvedTool.description,
      longDescription: fullToolData?.longDescription || approvedTool.description,
      rating: approvedTool.rating,
      users: approvedTool.users,
      website: approvedTool.link,
      pricing: approvedTool.price,
      image: approvedTool.image,
      features: fullToolData?.features || approvedTool.tags || [],
      pros: fullToolData?.pros || ['Informations détaillées en cours de mise à jour'],
      cons: fullToolData?.cons || ['Informations détaillées en cours de mise à jour']
    };
  } else {
    // Sinon, utiliser les données statiques
    currentTool = toolData[slug as keyof typeof toolData];
  }

  const handleFavoriteToggle = () => {
    if (!slug) return;
    
    if (isFavorite(slug)) {
      removeFromFavorites(slug);
      toast({
        title: "Retiré des favoris",
        description: `${currentTool?.name} a été retiré de vos favoris.`,
      });
    } else {
      addToFavorites(slug);
      toast({
        title: "Ajouté aux favoris",
        description: `${currentTool?.name} a été ajouté à vos favoris.`,
      });
    }
  };

  const handleSaveToggle = () => {
    if (!slug) return;
    
    if (isSaved(slug)) {
      removeFromSaved(slug);
      toast({
        title: "Retiré des sauvegardés",
        description: `${currentTool?.name} a été retiré de vos éléments sauvegardés.`,
      });
    } else {
      addToSaved(slug);
      toast({
        title: "Sauvegardé",
        description: `${currentTool?.name} a été sauvegardé.`,
      });
    }
  };

  if (!currentTool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Outil non trouvé</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">L'outil demandé n'existe pas.</p>
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

  const isToolFavorite = slug ? isFavorite(slug) : false;
  const isToolSaved = slug ? isSaved(slug) : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux outils
            </Link>
          </div>

          {/* En-tête de l'outil */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {currentTool.image && currentTool.image !== '/placeholder.svg' ? (
                    <img 
                      src={currentTool.image} 
                      alt={currentTool.name}
                      className="w-16 h-16 rounded-xl mr-4 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-xl">
                        {currentTool.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentTool.name}</h1>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-sm">
                        {currentTool.category}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-gray-900 dark:text-white">{currentTool.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">(2.5k avis)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {currentTool.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => window.open(currentTool.website, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Essayer {currentTool.name}
                  </Button>
                  <Button 
                    variant={isToolFavorite ? "default" : "outline"} 
                    className={`transition-all duration-200 hover:scale-105 ${
                      isToolFavorite 
                        ? "bg-red-500 hover:bg-red-600 text-white" 
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    }`}
                    onClick={handleFavoriteToggle}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isToolFavorite ? "fill-current" : ""}`} />
                    {isToolFavorite ? "Retiré des favoris" : "Ajouter aux favoris"}
                  </Button>
                  <Button 
                    variant={isToolSaved ? "default" : "outline"} 
                    className={`transition-all duration-200 hover:scale-105 ${
                      isToolSaved 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                    }`}
                    onClick={handleSaveToggle}
                  >
                    <Bookmark className={`mr-2 h-4 w-4 ${isToolSaved ? "fill-current" : ""}`} />
                    {isToolSaved ? "Sauvegardé" : "Sauvegarder"}
                  </Button>
                </div>
              </div>

              {/* Statistiques */}
              <div className="lg:ml-8 lg:flex-shrink-0">
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-1">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs</span>
                    </div>
                    <div className="font-bold text-xl text-gray-900 dark:text-white">{currentTool.users}</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-1">
                      <Globe className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Prix</span>
                    </div>
                    <div className="font-bold text-xl text-gray-900 dark:text-white">{currentTool.pricing}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description détaillée */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">À propos de {currentTool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentTool.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Fonctionnalités */}
              {currentTool.features && currentTool.features.length > 0 && (
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Zap className="mr-2 h-5 w-5" />
                      Fonctionnalités principales
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Découvrez ce que {currentTool.name} peut faire pour vous
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentTool.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Avantages et Inconvénients */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-green-600 dark:text-green-400">Avantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentTool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">Inconvénients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentTool.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{con}</span>
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
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Site web</div>
                    <a 
                      href={currentTool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                    >
                      {currentTool.website}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Catégorie</div>
                    <Badge variant="secondary">{currentTool.category}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tarification</div>
                    <div className="font-medium text-gray-900 dark:text-white">{currentTool.pricing}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Partage social */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Partager</CardTitle>
                </CardHeader>
                <CardContent>
                  <SocialShare
                    url={window.location.href}
                    title={`Découvrez ${currentTool.name}`}
                    description={currentTool.description}
                  />
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
