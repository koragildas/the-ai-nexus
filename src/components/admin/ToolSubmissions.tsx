import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  ExternalLink,
  Search,
  Filter,
  Trash2,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { SubmittedTool } from '@/types/admin';

export const ToolSubmissions = () => {
  const [selectedTool, setSelectedTool] = useState<SubmittedTool | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Données simulées des soumissions avec images
  const [submissions, setSubmissions] = useState<SubmittedTool[]>([
    {
      id: '1',
      name: 'Nova AI Writer',
      description: 'Un assistant d\'écriture IA avancé pour la création de contenu',
      longDescription: 'Nova AI Writer utilise les dernières technologies d\'IA pour créer du contenu de haute qualité...',
      url: 'https://nova-ai-writer.com',
      category: 'writing',
      pricing: 'Freemium',
      rating: '4.5',
      users: '50K+',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      features: ['Génération de contenu', 'Correction grammaticale', 'Traduction'],
      pros: ['Interface intuitive', 'Résultats de qualité'],
      cons: ['Version gratuite limitée'],
      tags: ['écriture', 'contenu', 'IA'],
      status: 'pending',
      submittedBy: 'user@example.com',
      submittedAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      name: 'AI Image Generator Pro',
      description: 'Générateur d\'images IA professionnel',
      longDescription: 'Créez des images époustouflantes avec notre IA de pointe...',
      url: 'https://ai-image-pro.com',
      category: 'image',
      pricing: 'Payant',
      rating: '4.8',
      users: '100K+',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      features: ['Génération d\'images', 'Styles multiples', 'Haute résolution'],
      pros: ['Qualité exceptionnelle', 'Rapide'],
      cons: ['Prix élevé'],
      tags: ['image', 'génération', 'art'],
      status: 'approved',
      submittedBy: 'admin@example.com',
      submittedAt: '2024-01-19T14:30:00Z',
      reviewedBy: 'superadmin@ainexus.com',
      reviewedAt: '2024-01-19T16:00:00Z'
    },
    {
      id: '3',
      name: 'Spam AI Tool',
      description: 'Outil suspect avec peu de valeur',
      longDescription: 'Description très courte et peu détaillée...',
      url: 'https://suspicious-tool.com',
      category: 'business',
      pricing: 'Gratuit',
      rating: '2.0',
      users: '10',
      features: ['Fonctionnalité basique'],
      pros: ['Gratuit'],
      cons: ['Qualité douteuse', 'Interface pauvre'],
      tags: ['business'],
      status: 'rejected',
      submittedBy: 'spam@example.com',
      submittedAt: '2024-01-18T09:00:00Z',
      reviewedBy: 'admin@ainexus.com',
      reviewedAt: '2024-01-18T11:00:00Z',
      rejectionReason: 'Qualité insuffisante et contenu suspect'
    },
    {
      id: '4',
      name: 'Voice AI Assistant',
      description: 'Assistant vocal intelligent pour les entreprises',
      longDescription: 'Un assistant vocal IA qui peut gérer les appels clients...',
      url: 'https://voice-ai-assistant.com',
      category: 'voice',
      pricing: 'Payant',
      rating: '4.2',
      users: '25K+',
      features: ['Reconnaissance vocale', 'Réponses automatiques', 'Intégration CRM'],
      pros: ['Très naturel', 'Facile à intégrer'],
      cons: ['Coût élevé', 'Langues limitées'],
      tags: ['vocal', 'assistant', 'entreprise'],
      status: 'pending',
      submittedBy: 'voice@example.com',
      submittedAt: '2024-01-21T08:30:00Z'
    }
  ]);

  const filteredSubmissions = submissions.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApproval = (toolId: string) => {
    setSubmissions(submissions.map(tool => 
      tool.id === toolId 
        ? { 
            ...tool, 
            status: 'approved', 
            reviewedBy: 'superadmin@ainexus.com', 
            reviewedAt: new Date().toISOString() 
          }
        : tool
    ));
    
    toast.success("Outil approuvé et publié sur la plateforme.");
    setIsReviewDialogOpen(false);
  };

  const handleRejection = (toolId: string) => {
    if (!rejectionReason.trim()) {
      toast.error("Veuillez indiquer la raison du rejet.");
      return;
    }

    setSubmissions(submissions.map(tool => 
      tool.id === toolId 
        ? { 
            ...tool, 
            status: 'rejected', 
            reviewedBy: 'superadmin@ainexus.com', 
            reviewedAt: new Date().toISOString(),
            rejectionReason: rejectionReason
          }
        : tool
    ));
    
    toast.success("Outil rejeté avec la raison fournie.");
    setRejectionReason('');
    setIsReviewDialogOpen(false);
  };

  const handleDeleteSubmission = (toolId: string, toolName: string) => {
    setSubmissions(submissions.filter(tool => tool.id !== toolId));
    toast.success(`${toolName} a été supprimé définitivement.`);
  };

  const handleResetToReview = (toolId: string) => {
    setSubmissions(submissions.map(tool => 
      tool.id === toolId 
        ? { 
            ...tool, 
            status: 'pending',
            reviewedBy: undefined,
            reviewedAt: undefined,
            rejectionReason: undefined
          }
        : tool
    ));
    
    toast.success("L'outil a été remis en attente de révision.");
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    toast.success("Tous les filtres ont été réinitialisés.");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const, icon: Clock },
      approved: { label: 'Approuvé', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Rejeté', variant: 'destructive' as const, icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPendingCount = () => submissions.filter(tool => tool.status === 'pending').length;
  const getApprovedCount = () => submissions.filter(tool => tool.status === 'approved').length;
  const getRejectedCount = () => submissions.filter(tool => tool.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Soumissions d'outils IA ({filteredSubmissions.length})
              </CardTitle>
              <CardDescription>
                Révisez et validez les nouveaux outils soumis par les utilisateurs
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Effacer filtres
              </Button>
            </div>
          </div>
          
          {/* Statistiques rapides */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border">
              <div className="text-2xl font-bold text-yellow-600">{getPendingCount()}</div>
              <div className="text-sm text-yellow-700 dark:text-yellow-400">En attente</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{getApprovedCount()}</div>
              <div className="text-sm text-green-700 dark:text-green-400">Approuvés</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border">
              <div className="text-2xl font-bold text-red-600">{getRejectedCount()}</div>
              <div className="text-sm text-red-700 dark:text-red-400">Rejetés</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtres et recherche */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, description ou soumetteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </Button>
              )}
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvés</SelectItem>
                <SelectItem value="rejected">Rejetés</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="writing">Écriture</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="voice">Vocal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Outil</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Soumis le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {tool.image ? (
                          <img 
                            src={tool.image} 
                            alt={tool.name}
                            className="h-12 w-12 object-cover rounded-lg border"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-muted rounded-lg border flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground flex items-center">
                          {tool.name}
                          <a 
                            href={tool.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-md">
                          {tool.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Par: {tool.submittedBy}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tool.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(tool.status)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(tool.submittedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Dialog 
                        open={isReviewDialogOpen && selectedTool?.id === tool.id} 
                        onOpenChange={(open) => {
                          setIsReviewDialogOpen(open);
                          if (open) setSelectedTool(tool);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Révision de l'outil: {tool.name}</DialogTitle>
                            <DialogDescription>
                              Examinez les détails et décidez d'approuver ou rejeter cette soumission.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedTool && (
                            <div className="space-y-4">
                              {/* Image de l'outil */}
                              {selectedTool.image && (
                                <div>
                                  <Label className="font-semibold">Image de l'outil:</Label>
                                  <div className="mt-2">
                                    <img 
                                      src={selectedTool.image} 
                                      alt={selectedTool.name}
                                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                                    />
                                  </div>
                                </div>
                              )}
                              
                              <div>
                                <Label className="font-semibold">URL:</Label>
                                <p className="text-sm text-primary">
                                  <a href={selectedTool.url} target="_blank" rel="noopener noreferrer">
                                    {selectedTool.url}
                                  </a>
                                </p>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Catégorie:</Label>
                                <p className="text-sm">{selectedTool.category}</p>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Prix:</Label>
                                <p className="text-sm">{selectedTool.pricing}</p>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Utilisateurs:</Label>
                                <p className="text-sm">{selectedTool.users}</p>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Description:</Label>
                                <p className="text-sm text-gray-700 mt-1">{selectedTool.description}</p>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Description détaillée:</Label>
                                <p className="text-sm text-gray-700 mt-1">{selectedTool.longDescription}</p>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Fonctionnalités:</Label>
                                <ul className="text-sm text-gray-700 mt-1 list-disc list-inside">
                                  {selectedTool.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-semibold">Avantages:</Label>
                                  <ul className="text-sm text-green-700 mt-1 list-disc list-inside">
                                    {selectedTool.pros.map((pro, index) => (
                                      <li key={index}>{pro}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <Label className="font-semibold">Inconvénients:</Label>
                                  <ul className="text-sm text-red-700 mt-1 list-disc list-inside">
                                    {selectedTool.cons.map((con, index) => (
                                      <li key={index}>{con}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              <div>
                                <Label className="font-semibold">Tags:</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {selectedTool.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {selectedTool.status === 'pending' && (
                                <div className="space-y-3 pt-4 border-t">
                                  <div>
                                    <Label htmlFor="rejection-reason">Raison du rejet (optionnel):</Label>
                                    <Textarea
                                      id="rejection-reason"
                                      placeholder="Expliquez pourquoi cet outil est rejeté..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <Button 
                                      onClick={() => handleApproval(selectedTool.id)}
                                      className="flex-1"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approuver
                                    </Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleRejection(selectedTool.id)}
                                      className="flex-1"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Rejeter
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {selectedTool.status === 'rejected' && selectedTool.rejectionReason && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                                  <Label className="font-semibold text-red-800 dark:text-red-400">Raison du rejet:</Label>
                                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">{selectedTool.rejectionReason}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {tool.status !== 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResetToReview(tool.id)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer la soumission</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer définitivement <strong>{tool.name}</strong> ? 
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteSubmission(tool.id, tool.name)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Supprimer définitivement
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Aucune soumission ne correspond aux critères de recherche.'
                : 'Aucune soumission trouvée.'
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
