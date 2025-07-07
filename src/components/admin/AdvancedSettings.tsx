import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Mail, 
  Globe, 
  FileText, 
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  UserPlus,
  Key,
  Database,
  Palette,
  Bell,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
  createdAt: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'notification' | 'admin';
}

export const AdvancedSettings = () => {
  const { toast } = useToast();
  
  // États pour la gestion des rôles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: ['all'],
      color: 'red',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Gestion des utilisateurs et outils',
      permissions: ['user_management', 'tool_management', 'moderate_content'],
      color: 'blue',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Modérateur',
      description: 'Modération du contenu',
      permissions: ['moderate_content', 'view_reports'],
      color: 'green',
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Utilisateur',
      description: 'Accès de base à la plateforme',
      permissions: ['view_tools', 'submit_tools'],
      color: 'gray',
      createdAt: '2024-01-01'
    }
  ]);

  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: [],
    color: 'blue'
  });

  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

  // États pour les templates email
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Email de bienvenue',
      subject: 'Bienvenue sur AI Nexus !',
      content: 'Bonjour {{name}}, bienvenue sur notre plateforme...',
      type: 'welcome'
    },
    {
      id: '2',
      name: 'Notification d\'approbation',
      subject: 'Votre outil a été approuvé',
      content: 'Félicitations ! Votre outil {{tool_name}} a été approuvé...',
      type: 'notification'
    }
  ]);

  // États pour les paramètres généraux
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'AI Nexus',
    platformDescription: 'La plateforme de référence pour les outils IA',
    allowPublicRegistration: true,
    requireEmailVerification: true,
    maxToolsPerUser: 10,
    autoApproveTools: false,
    enableComments: true,
    enableRatings: true,
    maintenanceMode: false,
    maxFileUploadSize: 10,
    sessionTimeout: 24
  });

  const availablePermissions = [
    { id: 'all', label: 'Tous les droits', description: 'Accès complet au système' },
    { id: 'user_management', label: 'Gestion utilisateurs', description: 'Créer, modifier, supprimer des utilisateurs' },
    { id: 'tool_management', label: 'Gestion outils', description: 'Approuver, rejeter, modifier des outils' },
    { id: 'moderate_content', label: 'Modération', description: 'Modérer le contenu de la plateforme' },
    { id: 'view_reports', label: 'Voir les rapports', description: 'Accès aux rapports et statistiques' },
    { id: 'view_tools', label: 'Voir les outils', description: 'Consulter les outils disponibles' },
    { id: 'submit_tools', label: 'Soumettre des outils', description: 'Proposer de nouveaux outils' },
    { id: 'edit_profile', label: 'Modifier le profil', description: 'Modifier ses informations personnelles' }
  ];

  const roleColors = [
    { value: 'red', label: 'Rouge' },
    { value: 'blue', label: 'Bleu' },
    { value: 'green', label: 'Vert' },
    { value: 'yellow', label: 'Jaune' },
    { value: 'purple', label: 'Violet' },
    { value: 'gray', label: 'Gris' }
  ];

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions || [],
      color: newRole.color || 'blue',
      createdAt: new Date().toISOString()
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: '', description: '', permissions: [], color: 'blue' });
    setIsCreateRoleOpen(false);

    toast({
      title: "Rôle créé",
      description: `Le rôle "${role.name}" a été créé avec succès.`,
    });
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.name === 'Super Admin' || role?.name === 'Utilisateur') {
      toast({
        title: "Erreur",
        description: "Ce rôle ne peut pas être supprimé.",
        variant: "destructive"
      });
      return;
    }

    setRoles(prev => prev.filter(r => r.id !== roleId));
    toast({
      title: "Rôle supprimé",
      description: "Le rôle a été supprimé avec succès.",
    });
  };

  const handleUpdateRole = (roleId: string, updates: Partial<Role>) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, ...updates } : role
    ));
    setEditingRole(null);
    
    toast({
      title: "Rôle mis à jour",
      description: "Les modifications ont été sauvegardées.",
    });
  };

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres généraux ont été mis à jour avec succès.",
    });
  };

  const getColorClass = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres avancés</h2>
          <p className="text-gray-600">Gestion complète de la plateforme</p>
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Rôles
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        {/* Gestion des rôles */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Gestion des rôles
                  </CardTitle>
                  <CardDescription>
                    Créer et gérer les rôles et permissions des utilisateurs
                  </CardDescription>
                </div>
                <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau rôle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau rôle</DialogTitle>
                      <DialogDescription>
                        Définissez les caractéristiques du nouveau rôle
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="roleName">Nom du rôle</Label>
                          <Input
                            id="roleName"
                            value={newRole.name}
                            onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Ex: Modérateur"
                          />
                        </div>
                        <div>
                          <Label htmlFor="roleColor">Couleur</Label>
                          <Select
                            value={newRole.color}
                            onValueChange={(value) => setNewRole(prev => ({ ...prev, color: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roleColors.map(color => (
                                <SelectItem key={color.value} value={color.value}>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${getColorClass(color.value)}`} />
                                    {color.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="roleDescription">Description</Label>
                        <Textarea
                          id="roleDescription"
                          value={newRole.description}
                          onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Décrivez les responsabilités de ce rôle..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {availablePermissions.map(permission => (
                            <div key={permission.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <input
                                type="checkbox"
                                id={permission.id}
                                checked={newRole.permissions?.includes(permission.id)}
                                onChange={(e) => {
                                  const permissions = newRole.permissions || [];
                                  if (e.target.checked) {
                                    setNewRole(prev => ({ 
                                      ...prev, 
                                      permissions: [...permissions, permission.id] 
                                    }));
                                  } else {
                                    setNewRole(prev => ({ 
                                      ...prev, 
                                      permissions: permissions.filter(p => p !== permission.id) 
                                    }));
                                  }
                                }}
                                className="rounded"
                              />
                              <div>
                                <Label htmlFor={permission.id} className="font-medium cursor-pointer">
                                  {permission.label}
                                </Label>
                                <p className="text-sm text-gray-500">{permission.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleCreateRole}>
                          Créer le rôle
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map(role => (
                  <div key={role.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getColorClass(role.color)}>{role.name}</Badge>
                        <div>
                          <p className="font-medium">{role.description}</p>
                          <p className="text-sm text-gray-500">
                            {role.permissions.length} permission(s) • Créé le {new Date(role.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingRole(editingRole === role.id ? null : role.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {role.name !== 'Super Admin' && role.name !== 'Utilisateur' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {editingRole === role.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                        <div>
                          <Label>Permissions actuelles</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {role.permissions.map(permId => {
                              const perm = availablePermissions.find(p => p.id === permId);
                              return perm ? (
                                <Badge key={permId} variant="outline">{perm.label}</Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingRole(null)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Fermer
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres généraux */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Paramètres généraux
              </CardTitle>
              <CardDescription>
                Configuration de base de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platformName">Nom de la plateforme</Label>
                  <Input
                    id="platformName"
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, platformName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxToolsPerUser">Outils max par utilisateur</Label>
                  <Input
                    id="maxToolsPerUser"
                    type="number"
                    value={generalSettings.maxToolsPerUser}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, maxToolsPerUser: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="platformDescription">Description de la plateforme</Label>
                <Textarea
                  id="platformDescription"
                  value={generalSettings.platformDescription}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, platformDescription: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Inscriptions publiques</Label>
                    <p className="text-sm text-gray-500">Autoriser les nouvelles inscriptions</p>
                  </div>
                  <Switch
                    checked={generalSettings.allowPublicRegistration}
                    onCheckedChange={(value) => setGeneralSettings(prev => ({ ...prev, allowPublicRegistration: value }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Vérification email requise</Label>
                    <p className="text-sm text-gray-500">Obliger la vérification d'email</p>
                  </div>
                  <Switch
                    checked={generalSettings.requireEmailVerification}
                    onCheckedChange={(value) => setGeneralSettings(prev => ({ ...prev, requireEmailVerification: value }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Auto-approbation des outils</Label>
                    <p className="text-sm text-gray-500">Approuver automatiquement les nouveaux outils</p>
                  </div>
                  <Switch
                    checked={generalSettings.autoApproveTools}
                    onCheckedChange={(value) => setGeneralSettings(prev => ({ ...prev, autoApproveTools: value }))}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Mode maintenance</Label>
                    <p className="text-sm text-gray-500">Désactiver l'accès public temporairement</p>
                  </div>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(value) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: value }))}
                  />
                </div>
              </div>

              <Button onClick={handleSaveGeneralSettings} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder les paramètres
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Gestion des notifications
              </CardTitle>
              <CardDescription>
                Configurer les notifications et templates d'email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interface de gestion des notifications en cours de développement...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sécurité */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Paramètres de sécurité
              </CardTitle>
              <CardDescription>
                Configuration de la sécurité et des accès
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interface de sécurité en cours de développement...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};