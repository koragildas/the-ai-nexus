import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Users, DollarSign, Eye } from 'lucide-react';

// Données complètes d'outils IA par catégorie avec 5 outils chacune
const aiToolsByCategory = {
  'assistant-ia': [
    {
      id: 1,
      name: 'ChatGPT',
      description: 'Assistant IA conversationnel le plus populaire au monde',
      logo: '🤖',
      link: 'https://chatgpt.com',
      price: 'Freemium',
      rating: 4.8,
      users: '100M+',
      tags: ['Conversation', 'Assistance', 'Productivité']
    },
    {
      id: 2,
      name: 'Claude',
      description: 'Assistant IA d\'Anthropic pour des conversations intelligentes',
      logo: '🧠',
      link: 'https://claude.ai',
      price: 'Freemium',
      rating: 4.7,
      users: '10M+',
      tags: ['Analyse', 'Rédaction', 'Code']
    },
    {
      id: 3,
      name: 'Perplexity',
      description: 'Moteur de recherche IA avec citations et sources',
      logo: '🔍',
      link: 'https://perplexity.ai',
      price: 'Freemium',
      rating: 4.6,
      users: '5M+',
      tags: ['Recherche', 'Sources', 'Information']
    },
    {
      id: 4,
      name: 'Bard (Gemini)',
      description: 'Assistant IA de Google basé sur Gemini',
      logo: '⭐',
      link: 'https://bard.google.com',
      price: 'Gratuit',
      rating: 4.4,
      users: '50M+',
      tags: ['Google', 'Multimodal', 'Recherche']
    },
    {
      id: 5,
      name: 'Character.AI',
      description: 'Créez et chattez avec des personnages IA personnalisés',
      logo: '🎭',
      link: 'https://character.ai',
      price: 'Freemium',
      rating: 4.3,
      users: '20M+',
      tags: ['Personnages', 'Roleplay', 'Créativité']
    }
  ],
  'developpement': [
    {
      id: 6,
      name: 'GitHub Copilot',
      description: 'Assistant IA pour la programmation et le développement',
      logo: '💻',
      link: 'https://github.com/features/copilot',
      price: 'Payant',
      rating: 4.5,
      users: '5M+',
      tags: ['Développement', 'Autocomplétion', 'Productivité']
    },
    {
      id: 7,
      name: 'Cursor',
      description: 'Éditeur de code IA pour développeurs',
      logo: '⚡',
      link: 'https://cursor.sh',
      price: 'Freemium',
      rating: 4.7,
      users: '500K+',
      tags: ['IDE', 'IA', 'Développement']
    },
    {
      id: 8,
      name: 'Replit',
      description: 'Plateforme de développement collaborative avec IA',
      logo: '🔧',
      link: 'https://replit.com',
      price: 'Freemium',
      rating: 4.4,
      users: '2M+',
      tags: ['Collaboration', 'Cloud', 'Apprentissage']
    },
    {
      id: 9,
      name: 'Tabnine',
      description: 'Autocomplétion IA pour tous les langages de programmation',
      logo: '🚀',
      link: 'https://tabnine.com',
      price: 'Freemium',
      rating: 4.2,
      users: '1M+',
      tags: ['Autocomplétion', 'Multilingue', 'Productivité']
    },
    {
      id: 10,
      name: 'Codeium',
      description: 'Assistant de codage IA gratuit et rapide',
      logo: '💎',
      link: 'https://codeium.com',
      price: 'Gratuit',
      rating: 4.6,
      users: '800K+',
      tags: ['Gratuit', 'Rapide', 'Assistant']
    }
  ],
  'redaction': [
    {
      id: 11,
      name: 'Jasper',
      description: 'IA spécialisée dans la création de contenu marketing',
      logo: '✨',
      link: 'https://jasper.ai',
      price: 'Payant',
      rating: 4.5,
      users: '1M+',
      tags: ['Marketing', 'Copywriting', 'Contenu']
    },
    {
      id: 12,
      name: 'Copy.ai',
      description: 'Générateur de texte IA pour le marketing et les ventes',
      logo: '📝',
      link: 'https://copy.ai',
      price: 'Freemium',
      rating: 4.3,
      users: '500K+',
      tags: ['Marketing', 'Ventes', 'Automatisation']
    },
    {
      id: 13,
      name: 'Writesonic',
      description: 'Plateforme IA complète pour la création de contenu',
      logo: '🖋️',
      link: 'https://writesonic.com',
      price: 'Freemium',
      rating: 4.4,
      users: '400K+',
      tags: ['Blog', 'Articles', 'SEO']
    },
    {
      id: 14,
      name: 'Grammarly',
      description: 'Assistant d\'écriture IA pour corriger et améliorer vos textes',
      logo: '📚',
      link: 'https://grammarly.com',
      price: 'Freemium',
      rating: 4.6,
      users: '30M+',
      tags: ['Correction', 'Grammaire', 'Style']
    },
    {
      id: 15,
      name: 'Notion AI',
      description: 'IA intégrée dans Notion pour la productivité et l\'écriture',
      logo: '📋',
      link: 'https://notion.so',
      price: 'Freemium',
      rating: 4.5,
      users: '10M+',
      tags: ['Productivité', 'Organisation', 'Collaboration']
    }
  ],
  'chat-communication': [
    {
      id: 16,
      name: 'Replika',
      description: 'Compagnon IA pour conversations personnelles et support émotionnel',
      logo: '💭',
      link: 'https://replika.ai',
      price: 'Freemium',
      rating: 4.2,
      users: '10M+',
      tags: ['Compagnon', 'Émotionnel', 'Personnel']
    },
    {
      id: 17,
      name: 'Chatfuel',
      description: 'Plateforme pour créer des chatbots sans code',
      logo: '🤖',
      link: 'https://chatfuel.com',
      price: 'Freemium',
      rating: 4.3,
      users: '500K+',
      tags: ['Chatbot', 'No-code', 'Business']
    },
    {
      id: 18,
      name: 'ManyChat',
      description: 'Automatisation de conversations pour Instagram et Facebook',
      logo: '💬',
      link: 'https://manychat.com',
      price: 'Freemium',
      rating: 4.4,
      users: '1M+',
      tags: ['Automatisation', 'Social Media', 'Marketing']
    },
    {
      id: 19,
      name: 'Landbot',
      description: 'Créateur de chatbots conversationnels pour sites web',
      logo: '🚀',
      link: 'https://landbot.io',
      price: 'Freemium',
      rating: 4.1,
      users: '200K+',
      tags: ['Web', 'Conversationnel', 'Lead Generation']
    },
    {
      id: 20,
      name: 'Tidio',
      description: 'Chat en direct avec IA pour sites e-commerce',
      logo: '💼',
      link: 'https://tidio.com',
      price: 'Freemium',
      rating: 4.5,
      users: '300K+',
      tags: ['E-commerce', 'Support', 'Live Chat']
    }
  ],
  'image-design': [
    {
      id: 21,
      name: 'DALL-E 3',
      description: 'Générateur d\'images IA de haute qualité par OpenAI',
      logo: '🎨',
      link: 'https://openai.com/dall-e-3',
      price: 'Payant',
      rating: 4.7,
      users: '10M+',
      tags: ['Génération', 'Art', 'Créativité']
    },
    {
      id: 22,
      name: 'Midjourney',
      description: 'IA artistique pour créer des images impressionnantes',
      logo: '🌟',
      link: 'https://midjourney.com',
      price: 'Payant',
      rating: 4.9,
      users: '15M+',
      tags: ['Art', 'Design', 'Illustration']
    },
    {
      id: 23,
      name: 'Stable Diffusion',
      description: 'Modèle IA open-source pour la génération d\'images',
      logo: '🔧',
      link: 'https://stability.ai',
      price: 'Gratuit',
      rating: 4.6,
      users: '5M+',
      tags: ['Open Source', 'Personnalisable', 'Gratuit']
    },
    {
      id: 24,
      name: 'Canva AI',
      description: 'Outils IA intégrés dans Canva pour le design',
      logo: '🎭',
      link: 'https://canva.com',
      price: 'Freemium',
      rating: 4.4,
      users: '75M+',
      tags: ['Design', 'Templates', 'Social Media']
    },
    {
      id: 25,
      name: 'Leonardo AI',
      description: 'Génération d\'images IA avec contrôle créatif avancé',
      logo: '🖼️',
      link: 'https://leonardo.ai',
      price: 'Freemium',
      rating: 4.5,
      users: '2M+',
      tags: ['Contrôle', 'Qualité', 'Créatif']
    }
  ],
  'audio-musique': [
    {
      id: 26,
      name: 'Suno',
      description: 'Génération de musique complète avec paroles par IA',
      logo: '🎵',
      link: 'https://suno.com',
      price: 'Freemium',
      rating: 4.6,
      users: '1M+',
      tags: ['Musique', 'Paroles', 'Génération']
    },
    {
      id: 27,
      name: 'Mubert',
      description: 'Musique de fond IA pour contenus et streaming',
      logo: '🎧',
      link: 'https://mubert.com',
      price: 'Freemium',
      rating: 4.3,
      users: '500K+',
      tags: ['Background', 'Streaming', 'Royalty-free']
    },
    {
      id: 28,
      name: 'ElevenLabs',
      description: 'Synthèse vocale IA ultra-réaliste et clonage de voix',
      logo: '🎤',
      link: 'https://elevenlabs.io',
      price: 'Freemium',
      rating: 4.8,
      users: '3M+',
      tags: ['Voice Cloning', 'TTS', 'Réaliste']
    },
    {
      id: 29,
      name: 'Speechify',
      description: 'Lecteur de texte IA avec voix naturelles',
      logo: '📖',
      link: 'https://speechify.com',
      price: 'Freemium',
      rating: 4.4,
      users: '5M+',
      tags: ['Text-to-Speech', 'Lecture', 'Accessibilité']
    },
    {
      id: 30,
      name: 'AIVA',
      description: 'Compositeur IA pour musique orchestrale et cinématographique',
      logo: '🎼',
      link: 'https://aiva.ai',
      price: 'Freemium',
      rating: 4.2,
      users: '100K+',
      tags: ['Composition', 'Orchestral', 'Cinéma']
    }
  ],
  'video': [
    {
      id: 31,
      name: 'Runway ML',
      description: 'Suite d\'outils IA pour la création et l\'édition vidéo',
      logo: '🎬',
      link: 'https://runwayml.com',
      price: 'Freemium',
      rating: 4.6,
      users: '2M+',
      tags: ['Montage', 'Effets', 'Génération']
    },
    {
      id: 32,
      name: 'Pika Labs',
      description: 'Génération de vidéos courtes à partir de texte',
      logo: '📹',
      link: 'https://pika.art',
      price: 'Freemium',
      rating: 4.5,
      users: '1M+',
      tags: ['Text-to-Video', 'Courts', 'Créatif']
    },
    {
      id: 33,
      name: 'Synthesia',
      description: 'Création de vidéos avec avatars IA parlants',
      logo: '👤',
      link: 'https://synthesia.io',
      price: 'Payant',
      rating: 4.4,
      users: '500K+',
      tags: ['Avatar', 'Présentation', 'Corporate']
    },
    {
      id: 34,
      name: 'Pictory',
      description: 'Création de vidéos marketing à partir de texte',
      logo: '📺',
      link: 'https://pictory.ai',
      price: 'Payant',
      rating: 4.2,
      users: '300K+',
      tags: ['Marketing', 'Text-to-Video', 'Automatisation']
    },
    {
      id: 35,
      name: 'Luma Dream Machine',
      description: 'Génération de vidéos cinématographiques par IA',
      logo: '🌙',
      link: 'https://lumalabs.ai',
      price: 'Freemium',
      rating: 4.7,
      users: '800K+',
      tags: ['Cinématographique', 'Qualité', 'Réaliste']
    }
  ],
  'analyse-calcul': [
    {
      id: 36,
      name: 'Wolfram Alpha',
      description: 'Moteur de calcul et d\'analyse de données avancé',
      logo: '🔢',
      link: 'https://wolframalpha.com',
      price: 'Freemium',
      rating: 4.5,
      users: '10M+',
      tags: ['Mathématiques', 'Calcul', 'Analyse']
    },
    {
      id: 37,
      name: 'DataRobot',
      description: 'Plateforme IA pour l\'analyse prédictive automatisée',
      logo: '📊',
      link: 'https://datarobot.com',
      price: 'Payant',
      rating: 4.3,
      users: '50K+',
      tags: ['Prédictif', 'Business', 'Automatisation']
    },
    {
      id: 38,
      name: 'Julius AI',
      description: 'Analyse de données et visualisation par IA',
      logo: '📈',
      link: 'https://julius.ai',
      price: 'Freemium',
      rating: 4.4,
      users: '200K+',
      tags: ['Visualisation', 'Données', 'Graphiques']
    },
    {
      id: 39,
      name: 'MonkeyLearn',
      description: 'Analyse de texte et sentiment par machine learning',
      logo: '🐵',
      link: 'https://monkeylearn.com',
      price: 'Freemium',
      rating: 4.2,
      users: '100K+',
      tags: ['Text Analysis', 'Sentiment', 'ML']
    },
    {
      id: 40,
      name: 'Obviously AI',
      description: 'Machine learning sans code pour prédictions business',
      logo: '🧮',
      link: 'https://obviously.ai',
      price: 'Payant',
      rating: 4.1,
      users: '30K+',
      tags: ['No-code', 'Business', 'Prédiction']
    }
  ],
  'art-creativite': [
    {
      id: 41,
      name: 'Adobe Firefly',
      description: 'Suite créative IA intégrée aux produits Adobe',
      logo: '🔥',
      link: 'https://firefly.adobe.com',
      price: 'Freemium',
      rating: 4.5,
      users: '5M+',
      tags: ['Adobe', 'Professionnel', 'Intégration']
    },
    {
      id: 42,
      name: 'Artbreeder',
      description: 'Génération et mélange d\'images artistiques par IA',
      logo: '🎨',
      link: 'https://artbreeder.com',
      price: 'Freemium',
      rating: 4.3,
      users: '2M+',
      tags: ['Mélange', 'Artistique', 'Évolution']
    },
    {
      id: 43,
      name: 'DeepArt',
      description: 'Transformation de photos en œuvres d\'art avec styles célèbres',
      logo: '🖼️',
      link: 'https://deepart.io',
      price: 'Freemium',
      rating: 4.2,
      users: '1M+',
      tags: ['Style Transfer', 'Art Classique', 'Photo']
    },
    {
      id: 44,
      name: 'NightCafe',
      description: 'Générateur d\'art IA avec de nombreux algorithmes',
      logo: '☕',
      link: 'https://nightcafe.studio',
      price: 'Freemium',
      rating: 4.4,
      users: '3M+',
      tags: ['Multi-algorithmes', 'Communauté', 'Variété']
    },
    {
      id: 45,
      name: 'Dream by WOMBO',
      description: 'Application mobile pour créer de l\'art IA facilement',
      logo: '🌈',
      link: 'https://dream.ai',
      price: 'Freemium',
      rating: 4.1,
      users: '10M+',
      tags: ['Mobile', 'Simple', 'Rapide']
    }
  ]
};

const categoryNames = {
  'assistant-ia': 'Assistant IA',
  'developpement': 'Développement',
  'redaction': 'Rédaction',
  'chat-communication': 'Chat & Communication',
  'image-design':  'Image & Design',
  'audio-musique': 'Audio & Musique',
  'video': 'Vidéo',
  'analyse-calcul': 'Analyse & Calcul',
  'art-creativite': 'Art & Créativité'
};

const CategoryDetailPage = () => {
  const { categorySlug } = useParams();
  const tools = aiToolsByCategory[categorySlug as keyof typeof aiToolsByCategory] || [];
  const categoryName = categoryNames[categorySlug as keyof typeof categoryNames] || 'Catégorie';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Outils IA - {categoryName}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Découvrez les meilleurs outils d'intelligence artificielle pour {categoryName.toLowerCase()}.
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg dark:hover:shadow-gray-700/50 transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{tool.logo}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{tool.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{tool.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{tool.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className={`font-medium ${tool.price === 'Gratuit' ? 'text-green-600 dark:text-green-400' : tool.price === 'Freemium' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {tool.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link 
                          to={`/outil/${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
                          className="flex-1"
                        >
                          <Button 
                            variant="outline"
                            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Découvrir
                            <Eye className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white" 
                          onClick={() => window.open(tool.link, '_blank')}
                        >
                          Visiter
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Aucun outil disponible pour cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetailPage;
