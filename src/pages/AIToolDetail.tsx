
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
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
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  // Mock data - in real app this would come from API
  const toolData = {
    id: toolSlug || 'leonardo-ai',
    name: 'Leonardo AI',
    description: 'Leonardo AI est une plateforme de génération d\'images IA avancée qui permet aux créateurs de produire des œuvres d\'art exceptionnelles avec un contrôle créatif inégalé.',
    longDescription: 'Leonardo AI révolutionne la création d\'images grâce à l\'intelligence artificielle. Cette plateforme offre aux artistes, designers et créateurs de contenu des outils puissants pour générer des images de haute qualité avec un niveau de contrôle sans précédent. Que vous soyez un professionnel du design ou un amateur passionné, Leonardo AI s\'adapte à tous les niveaux de compétence.',
    logo: '🖼️',
    link: 'https://leonardo.ai',
    category: 'Image & Design',
    price: 'Freemium',
    rating: 4.5,
    users: '2M+',
    launchDate: '2022-12-01',
    website: 'https://leonardo.ai',
    tags: ['Génération d\'images', 'Art IA', 'Design', 'Création', 'Art numérique', 'Illustration'],
    features: [
      'Génération d\'images haute résolution',
      'Contrôle créatif avancé',
      'Styles artistiques variés',
      'Édition et retouche IA',
      'Modèles entraînés personnalisés',
      'Interface intuitive et professionnelle'
    ],
    useCases: [
      {
        title: 'Design graphique professionnel',
        description: 'Créez des visuels impressionnants pour vos projets commerciaux'
      },
      {
        title: 'Art conceptuel et illustration',
        description: 'Développez des concepts artistiques uniques pour vos créations'
      },
      {
        title: 'Contenu pour réseaux sociaux',
        description: 'Générez des images accrocheuses pour vos publications'
      },
      {
        title: 'Prototypage créatif',
        description: 'Explorez rapidement différentes idées visuelles'
      }
    ],
    pricing: [
      {
        plan: 'Gratuit',
        price: '0€/mois',
        features: ['150 crédits/mois', 'Résolution standard', 'Modèles de base']
      },
      {
        plan: 'Apprenti',
        price: '10€/mois',
        features: ['8 500 crédits/mois', 'Haute résolution', 'Tous les modèles', 'Support prioritaire']
      },
      {
        plan: 'Artisan',
        price: '24€/mois',
        features: ['25 000 crédits/mois', 'Ultra haute résolution', 'Modèles premium', 'API privée']
      }
    ],
    pros: [
      'Qualité d\'image exceptionnelle',
      'Interface utilisateur intuitive',
      'Large gamme de styles artistiques',
      'Contrôle précis sur la génération'
    ],
    cons: [
      'Crédits limités dans la version gratuite',
      'Temps de génération parfois long',
      'Courbe d\'apprentissage pour les fonctions avancées'
    ],
    alternatives: [
      { name: 'Midjourney', category: 'Image & Design' },
      { name: 'DALL-E 3', category: 'Image & Design' },
      { name: 'Stable Diffusion', category: 'Image & Design' }
    ]
  };

  const handleToggleFavorite = () => {
    toggleFavorite(toolData.id);
    const message = isFavorite(toolData.id) 
      ? `${toolData.name} retiré des favoris` 
      : `${toolData.name} ajouté aux favoris`;
    
    toast({
      title: message,
      duration: 2000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: toolData.name,
        text: toolData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié dans le presse-papiers",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
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
          <div className="bg-background/80 backdrop-blur-sm rounded-lg border p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-6">
                  <div className="text-6xl">{toolData.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <h1 className="text-4xl font-bold text-foreground">{toolData.name}</h1>
                      <Badge variant="outline">
                        {toolData.category}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                      {toolData.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`flex-1 ${isFavorite(toolData.id) ? 'bg-red-50 text-red-600 hover:bg-red-100' : ''}`}
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite(toolData.id) ? 'fill-current' : ''}`} />
                    {isFavorite(toolData.id) ? 'Retiré' : 'Favoris'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">À propos de {toolData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {toolData.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Fonctionnalités principales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {toolData.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Use Cases */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Cas d'usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {toolData.useCases.map((useCase, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mb-2">{useCase.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">Avantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {toolData.pros.map((pro, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm text-muted-foreground">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 dark:text-red-400">Inconvénients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {toolData.cons.map((con, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-sm text-muted-foreground">{con}</span>
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
                  <CardTitle className="text-xl">Tarification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {toolData.pricing.map((plan, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{plan.plan}</h4>
                          <span className="font-bold text-primary">{plan.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-sm text-muted-foreground flex items-center">
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
                  <CardTitle className="text-xl">Informations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Site web
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => window.open(toolData.website, '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
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
                  <CardTitle className="text-xl">Alternatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {toolData.alternatives.map((alt, index) => (
                      <Link
                        key={index}
                        to={`/outil/${alt.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{alt.name}</span>
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
          <div className="mt-12">
            <Link to={`/categorie/${toolData.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Button variant="outline">
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
