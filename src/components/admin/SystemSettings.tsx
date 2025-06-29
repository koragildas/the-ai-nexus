
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Shield, 
  Mail, 
  Globe, 
  FileText, 
  Download,
  Upload,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'AI Nexus',
    siteDescription: 'Découvrez les meilleurs outils d\'intelligence artificielle',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    backupEnabled: true,
    maxFileSize: '10',
    sessionTimeout: '24'
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres système ont été mis à jour avec succès.",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Sauvegarde en cours",
      description: "La sauvegarde de la base de données a été initiée.",
    });
  };

  const handleRestore = () => {
    toast({
      title: "Restauration en cours",
      description: "La restauration de la base de données a été initiée.",
      variant: "destructive"
    });
  };

  const systemStats = [
    { label: 'Version', value: '2.1.0', icon: Globe },
    { label: 'Base de données', value: 'Connectée', icon: Database, status: 'success' },
    { label: 'Dernière sauvegarde', value: '2024-01-20 14:30', icon: Download },
    { label: 'Espace disque', value: '2.3 GB / 10 GB', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques système */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-bold">{stat.value}</p>
                      {stat.status === 'success' && (
                        <Badge variant="default" className="text-xs">OK</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Paramètres généraux */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Paramètres généraux
          </CardTitle>
          <CardDescription>
            Configuration de base de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Timeout de session (heures)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="siteDescription">Description du site</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label className="font-medium">Mode maintenance</Label>
                <p className="text-sm text-gray-500">Désactive l'accès public au site</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(value) => handleSettingChange('maintenanceMode', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label className="font-medium">Inscriptions ouvertes</Label>
                <p className="text-sm text-gray-500">Autoriser les nouvelles inscriptions</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(value) => handleSettingChange('registrationEnabled', value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label className="font-medium">Notifications email</Label>
                <p className="text-sm text-gray-500">Envoyer des notifications par email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
              />
            </div>
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            Sauvegarder les paramètres
          </Button>
        </CardContent>
      </Card>

      {/* Sécurité et sauvegardes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Sécurité
            </CardTitle>
            <CardDescription>
              Paramètres de sécurité et authentification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxFileSize">Taille max des fichiers (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label className="font-medium">Sauvegardes automatiques</Label>
                <p className="text-sm text-gray-500">Sauvegardes quotidiennes</p>
              </div>
              <Switch
                checked={settings.backupEnabled}
                onCheckedChange={(value) => handleSettingChange('backupEnabled', value)}
              />
            </div>

            <div className="space-y-2">
              <Button onClick={handleBackup} className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Créer une sauvegarde
              </Button>
              <Button onClick={handleRestore} className="w-full" variant="destructive">
                <Upload className="h-4 w-4 mr-2" />
                Restaurer une sauvegarde
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Maintenance système
            </CardTitle>
            <CardDescription>
              Outils de maintenance et optimisation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-yellow-800">Attention</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Les opérations de maintenance peuvent affecter les performances du site.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Vider le cache
              </Button>
              <Button variant="outline" className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Optimiser la base de données
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Nettoyer les logs
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Dernière maintenance: 2024-01-19 03:00
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
