
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UserSettings } from '@/components/UserSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Star, 
  Heart, 
  PlusCircle, 
  BarChart3, 
  ExternalLink,
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    favoriteTools: 12,
    submittedTools: 3,
    reviews: 8,
    views: 156
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const favoriteTools = [
    { name: 'ChatGPT', category: 'Écriture', rating: 4.8, slug: 'chatgpt' },
    { name: 'Midjourney', category: 'Image', rating: 4.9, slug: 'midjourney' },
    { name: 'GitHub Copilot', category: 'Code', rating: 4.7, slug: 'github-copilot' },
  ];

  const recentActivity = [
    { action: 'A ajouté aux favoris', tool: 'ChatGPT', date: '2 heures' },
    { action: 'A soumis un outil', tool: 'New AI Tool', date: '1 jour' },
    { action: 'A laissé un avis sur', tool: 'Midjourney', date: '3 jours' },
  ];

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête du dashboard */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Bienvenue, {user.name} !
                    </h1>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link to="/soumettre">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Soumettre un outil
                    </Button>
                  </Link>
                  <UserSettings user={user} onUserUpdate={handleUserUpdate} />
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outils favoris</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.favoriteTools}</div>
                <p className="text-xs text-muted-foreground">+2 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outils soumis</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.submittedTools}</div>
                <p className="text-xs text-muted-foreground">+1 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avis donnés</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.reviews}</div>
                <p className="text-xs text-muted-foreground">+3 ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vues profil</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.views}</div>
                <p className="text-xs text-muted-foreground">+12% ce mois</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Outils favoris */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Mes outils favoris
                </CardTitle>
                <CardDescription>
                  Les outils IA que vous utilisez le plus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favoriteTools.map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {tool.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{tool.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {tool.category}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600 ml-1">{tool.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to={`/outil/${tool.slug}`}>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activité récente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Activité récente
                </CardTitle>
                <CardDescription>
                  Vos dernières actions sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>{' '}
                          <span className="text-blue-600">{activity.tool}</span>
                        </p>
                        <p className="text-xs text-gray-500">Il y a {activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
