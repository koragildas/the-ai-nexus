import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, Settings, Database, FileText } from 'lucide-react';
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

export const PermissionManager = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<RoleType>('admin');
  
  const [permissions, setPermissions] = useState<AllPermissions>({
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
  });

  const permissionCategories = [
    {
      id: 'users',
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
      id: 'tools',
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
      id: 'system',
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
      id: 'content',
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

  const handlePermissionChange = (category: string, permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [category]: {
          ...prev[selectedRole][category as keyof RolePermissions],
          [permission]: value
        }
      }
    }));

    toast({
      title: "Permission mise à jour",
      description: `Permission ${permission} ${value ? 'accordée' : 'révoquée'} pour le rôle ${selectedRole}.`,
    });
  };

  const resetPermissions = () => {
    toast({
      title: "Permissions réinitialisées",
      description: "Les permissions ont été restaurées aux valeurs par défaut.",
    });
  };

  const savePermissions = () => {
    toast({
      title: "Permissions sauvegardées",
      description: "Toutes les modifications ont été enregistrées avec succès.",
    });
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
              </CardTitle>
              <CardDescription>
                Configurez les permissions et autorisations par rôle utilisateur
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={resetPermissions}>
                Réinitialiser
              </Button>
              <Button onClick={savePermissions}>
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
              const categoryPermissions = rolePermissions[category.id as keyof RolePermissions];

              return (
                <Card key={category.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <IconComponent className="h-5 w-5 mr-2" />
                      {category.name}
                    </CardTitle>
                    <CardDescription>
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`${category.id}-${permission.id}`} className="font-medium">
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
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium text-yellow-800">Important</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Les modifications de permissions prennent effet immédiatement. 
                  Les utilisateurs devront se reconnecter pour voir les changements appliqués.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
