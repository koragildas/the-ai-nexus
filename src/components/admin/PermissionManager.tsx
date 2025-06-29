
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Shield, Users, Settings, Database, FileText, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type RoleType = 'admin' | 'user';

interface PermissionSet {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve?: boolean;
  backup?: boolean;
  restore?: boolean;
  logs?: boolean;
  moderate?: boolean;
}

interface RolePermissions {
  users: PermissionSet;
  tools: PermissionSet;
  system: PermissionSet;
  content: PermissionSet;
}

type AllPermissions = Record<RoleType, RolePermissions>;

const defaultPermissions: AllPermissions = {
  admin: {
    users: {
      view: true,
      create: true,
      edit: true,
      delete: false
    },
    tools: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      approve: true
    },
    system: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      backup: false,
      restore: false,
      logs: true
    },
    content: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      moderate: true
    }
  },
  user: {
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false
    },
    tools: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false
    },
    system: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      backup: false,
      restore: false,
      logs: false
    },
    content: {
      view: true,
      create: true,
      edit: false,
      delete: false,
      moderate: false
    }
  }
};

export const PermissionManager = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<RoleType>('admin');
  const [permissions, setPermissions] = useState<AllPermissions>(defaultPermissions);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const permissionCategories = [
    {
      id: 'users' as keyof RolePermissions,
      name: 'Gestion des utilisateurs',
      icon: Users,
      description: 'Permissions liées à la gestion des comptes utilisateurs',
      permissions: [
        { id: 'view', label: 'Voir les utilisateurs', description: 'Consulter la liste des utilisateurs' },
        { id: 'create', label: 'Créer des utilisateurs', description: 'Créer de nouveaux comptes' },
        { id: 'edit', label: 'Modifier les utilisateurs', description: 'Éditer les profils utilisateurs' },
        { id: 'delete', label: 'Supprimer les utilisateurs', description: 'Supprimer des comptes' }
      ]
    },
    {
      id: 'tools' as keyof RolePermissions,
      name: 'Gestion des outils IA',
      icon: Database,
      description: 'Permissions pour la gestion des outils IA',
      permissions: [
        { id: 'view', label: 'Voir les outils', description: 'Consulter la liste des outils' },
        { id: 'create', label: 'Ajouter des outils', description: 'Ajouter de nouveaux outils' },
        { id: 'edit', label: 'Modifier les outils', description: 'Éditer les fiches outils' },
        { id: 'delete', label: 'Supprimer les outils', description: 'Supprimer des outils' },
        { id: 'approve', label: 'Approuver les soumissions', description: 'Valider les nouvelles soumissions' }
      ]
    },
    {
      id: 'system' as keyof RolePermissions,
      name: 'Administration système',
      icon: Settings,
      description: 'Permissions système avancées',
      permissions: [
        { id: 'view', label: 'Voir les paramètres', description: 'Consulter la configuration système' },
        { id: 'backup', label: 'Sauvegardes', description: 'Créer des sauvegardes' },
        { id: 'restore', label: 'Restaurations', description: 'Restaurer depuis une sauvegarde' },
        { id: 'logs', label: 'Journaux système', description: 'Consulter les logs' }
      ]
    },
    {
      id: 'content' as keyof RolePermissions,
      name: 'Gestion du contenu',
      icon: FileText,
      description: 'Permissions liées au contenu du site',
      permissions: [
        { id: 'view', label: 'Voir le contenu', description: 'Consulter le contenu du site' },
        { id: 'create', label: 'Créer du contenu', description: 'Créer de nouveaux contenus' },
        { id: 'edit', label: 'Modifier le contenu', description: 'Éditer le contenu existant' },
        { id: 'delete', label: 'Supprimer le contenu', description: 'Supprimer du contenu' },
        { id: 'moderate', label: 'Modérer', description: 'Modérer les contenus utilisateurs' }
      ]
    }
  ];

  const handlePermissionChange = (category: keyof RolePermissions, permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [category]: {
          ...prev[selectedRole][category],
          [permission]: value
        }
      }
    }));

    setHasUnsavedChanges(true);

    toast({
      title: "Permission modifiée",
      description: `Permission ${permission} ${value ? 'accordée' : 'révoquée'} pour le rôle ${selectedRole}.`,
    });
  };

  const resetPermissions = () => {
    setPermissions(defaultPermissions);
    setHasUnsavedChanges(false);
    
    toast({
      title: "Permissions réinitialisées",
      description: "Les permissions ont été restaurées aux valeurs par défaut.",
    });
  };

  const savePermissions = () => {
    // Ici, vous pourriez envoyer les permissions vers un backend
    console.log('Sauvegarde des permissions:', permissions);
    
    setHasUnsavedChanges(false);
    
    toast({
      title: "Permissions sauvegardées",
      description: "Toutes les modifications ont été enregistrées avec succès.",
    });
  };

  const toggleAllPermissions = (category: keyof RolePermissions, enable: boolean) => {
    const categoryPermissions = permissions[selectedRole][category];
    const updatedPermissions = Object.keys(categoryPermissions).reduce((acc, key) => {
      acc[key] = enable;
      return acc;
    }, {} as any);

    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [category]: updatedPermissions
      }
    }));

    setHasUnsavedChanges(true);

    toast({
      title: enable ? "Permissions activées" : "Permissions désactivées",
      description: `Toutes les permissions de ${permissionCategories.find(c => c.id === category)?.name} ont été ${enable ? 'activées' : 'désactivées'}.`,
    });
  };

  const getActivePermissionsCount = (category: keyof RolePermissions) => {
    const categoryPermissions = permissions[selectedRole][category];
    return Object.values(categoryPermissions).filter(Boolean).length;
  };

  const getTotalPermissionsCount = (category: keyof RolePermissions) => {
    return Object.keys(permissions[selectedRole][category]).length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Gestionnaire de permissions
                {hasUnsavedChanges && (
                  <Badge variant="secondary" className="ml-2">
                    Modifications non sauvegardées
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Configurez les permissions et autorisations par rôle utilisateur
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Réinitialiser les permissions</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir restaurer toutes les permissions aux valeurs par défaut ? 
                      Cette action effacera toutes vos modifications actuelles.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={resetPermissions}>
                      Réinitialiser
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button onClick={savePermissions} disabled={!hasUnsavedChanges}>
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="role-select" className="text-base font-medium">
              Sélectionner un rôle:
            </Label>
            <Select value={selectedRole} onValueChange={(value: RoleType) => setSelectedRole(value)}>
              <SelectTrigger className="w-60 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">Utilisateur</Badge>
                    Permissions de base
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center">
                    <Badge variant="default" className="mr-2">Admin</Badge>
                    Permissions avancées
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {permissionCategories.map((category) => {
              const IconComponent = category.icon;
              const rolePermissions = permissions[selectedRole];
              const categoryPermissions = rolePermissions[category.id];
              const activeCount = getActivePermissionsCount(category.id);
              const totalCount = getTotalPermissionsCount(category.id);

              return (
                <Card key={category.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center text-lg">
                          <IconComponent className="h-5 w-5 mr-2" />
                          {category.name}
                          <Badge variant="outline" className="ml-2">
                            {activeCount}/{totalCount}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {category.description}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAllPermissions(category.id, true)}
                        >
                          Tout activer
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAllPermissions(category.id, false)}
                        >
                          Tout désactiver
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`${category.id}-${permission.id}`} className="font-medium cursor-pointer">
                                {permission.label}
                              </Label>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {permission.description}
                            </p>
                          </div>
                          <Switch
                            id={`${category.id}-${permission.id}`}
                            checked={Boolean(categoryPermissions[permission.id as keyof PermissionSet])}
                            onCheckedChange={(value) => handlePermissionChange(category.id, permission.id, value)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800">Important</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Les modifications de permissions prennent effet immédiatement après sauvegarde. 
                  Les utilisateurs devront se reconnecter pour voir les changements appliqués.
                  {hasUnsavedChanges && (
                    <span className="font-medium"> N'oubliez pas de sauvegarder vos modifications!</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
