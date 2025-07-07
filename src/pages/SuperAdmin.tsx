
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Settings, 
  Database, 
  BarChart, 
  FileText,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User, SubmittedTool, AdminStats } from '@/types/admin';
import { SuperAdminStats } from '@/components/admin/SuperAdminStats';
import { UserManagement } from '@/components/admin/UserManagement';
import { ToolSubmissions } from '@/components/admin/ToolSubmissions';
import { SystemSettings } from '@/components/admin/SystemSettings';
import { PermissionManager } from '@/components/admin/PermissionManager';
import { AdvancedSettings } from '@/components/admin/AdvancedSettings';

const SuperAdminPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1250,
    totalTools: 89,
    pendingSubmissions: 12,
    activeAdmins: 5,
    monthlyGrowth: 15.2
  });

  useEffect(() => {
    // Vérification des permissions super admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (!isAuthenticated || user.role !== 'superadmin') {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les autorisations nécessaires pour accéder à cette page.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    toast({
      title: "Bienvenue Super Admin",
      description: "Interface d'administration chargée avec succès.",
    });
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Shield className="h-8 w-8 mr-3 text-red-600" />
                  Super Administration
                </h1>
                <p className="text-gray-600 mt-2">
                  Contrôle total de la plateforme AI Nexus
                </p>
              </div>
              <Badge variant="destructive" className="text-sm px-3 py-1">
                SUPER ADMIN
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Tableau de bord</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Utilisateurs</span>
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Soumissions</span>
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Permissions</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Système</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Paramètres</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <SuperAdminStats stats={stats} />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="submissions" className="space-y-6">
              <ToolSubmissions />
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <PermissionManager />
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <SystemSettings />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <AdvancedSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuperAdminPage;
