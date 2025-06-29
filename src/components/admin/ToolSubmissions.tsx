
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SubmittedTool } from '@/types/admin';

export const ToolSubmissions = () => {
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<SubmittedTool | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Données simulées des soumissions
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
    }
  ]);

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
    
    toast({
      title: "Outil approuvé",
      description: "L'outil a été approuvé et publié sur la plateforme.",
    });
    
    setIsReviewDialogOpen(false);
  };

  const handleRejection = (toolId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Raison requise",
        description: "Veuillez indiquer la raison du rejet.",
        variant: "destructive"
      });
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
    
    toast({
      title: "Outil rejeté",
      description: "L'outil a été rejeté avec la raison fournie.",
    });
    
    setRejectionReason('');
    setIsReviewDialogOpen(false);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Soumissions d'outils IA
          </CardTitle>
          <CardDescription>
            Révisez et validez les nouveaux outils soumis par les utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {submissions.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900 flex items-center">
                        {tool.name}
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {tool.description}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Par: {tool.submittedBy}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tool.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(tool.status)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {formatDate(tool.submittedAt)}
                  </TableCell>
                  <TableCell>
                    <Dialog 
                      open={isReviewDialogOpen && selectedTool?.id === tool.id} 
                      onOpenChange={(open) => {
                        setIsReviewDialogOpen(open);
                        if (open) setSelectedTool(tool);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Réviser
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Révision de l'outil: {tool.name}</DialogTitle>
                          <DialogDescription>
                            Examinez les détails et décidez d'approuver ou rejeter cette soumission.
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedTool && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-semibold">URL:</Label>
                                <p className="text-sm text-blue-600">
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
                              <div className="p-3 bg-red-50 border border-red-200 rounded">
                                <Label className="font-semibold text-red-800">Raison du rejet:</Label>
                                <p className="text-sm text-red-700 mt-1">{selectedTool.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
