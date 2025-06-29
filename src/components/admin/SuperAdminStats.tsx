
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Database, 
  FileText, 
  UserPlus, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { AdminStats } from '@/types/admin';

interface SuperAdminStatsProps {
  stats: AdminStats;
}

export const SuperAdminStats: React.FC<SuperAdminStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Utilisateurs totaux',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: `+${stats.monthlyGrowth}%`,
      changeType: 'positive' as const,
      description: 'Croissance mensuelle'
    },
    {
      title: 'Outils IA',
      value: stats.totalTools.toString(),
      icon: Database,
      change: '+5',
      changeType: 'positive' as const,
      description: 'Nouveaux ce mois'
    },
    {
      title: 'Soumissions en attente',
      value: stats.pendingSubmissions.toString(),
      icon: Clock,
      change: 'Urgent',
      changeType: 'warning' as const,
      description: 'À réviser'
    },
    {
      title: 'Administrateurs actifs',
      value: stats.activeAdmins.toString(),
      icon: UserPlus,
      change: 'Stable',
      changeType: 'neutral' as const,
      description: 'Équipe admin'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'approval',
      message: 'ChatGPT approuvé par admin@ainexus.com',
      time: '2 minutes',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    {
      id: 2,
      type: 'user',
      message: 'Nouvel utilisateur inscrit: user@example.com',
      time: '5 minutes',
      icon: UserPlus,
      iconColor: 'text-blue-500'
    },
    {
      id: 3,
      type: 'submission',
      message: '3 nouvelles soumissions d\'outils IA',
      time: '15 minutes',
      icon: FileText,
      iconColor: 'text-orange-500'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Tentative de connexion suspecte détectée',
      time: '1 heure',
      icon: AlertTriangle,
      iconColor: 'text-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="flex items-center text-xs">
                <Badge
                  variant={
                    stat.changeType === 'positive' 
                      ? 'default' 
                      : stat.changeType === 'warning' 
                      ? 'destructive' 
                      : 'secondary'
                  }
                  className="mr-2"
                >
                  {stat.change}
                </Badge>
                <span className="text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Activité récente
          </CardTitle>
          <CardDescription>
            Événements et actions récents sur la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <activity.icon className={`h-5 w-5 mt-0.5 ${activity.iconColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    il y a {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
