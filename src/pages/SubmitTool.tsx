
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Send, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmitToolPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    url: '',
    category: '',
    pricing: '',
    language: 'Français',
    rating: '',
    users: '',
    features: [''],
    pros: [''],
    cons: [''],
    tags: ['']
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour soumettre un outil.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation des champs requis
    if (!formData.name || !formData.description || !formData.url || !formData.category || !formData.pricing) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Filtrer les éléments vides des tableaux
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      pros: formData.pros.filter(p => p.trim() !== ''),
      cons: formData.cons.filter(c => c.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== '')
    };

    console.log('Données soumises:', cleanedData);
    
    toast({
      title: "Outil soumis avec succès !",
      description: "Votre suggestion sera examinée par notre équipe.",
    });
    
    // Reset du formulaire
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      url: '',
      category: '',
      pricing: '',
      language: 'Français',
      rating: '',
      users: '',
      features: [''],
      pros: [''],
      cons: [''],
      tags: ['']
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: string, i: number) => i !== index)
    }));
  };

  const ArrayInput = ({ 
    field, 
    label, 
    placeholder, 
    description 
  }: { 
    field: string; 
    label: string; 
    placeholder: string; 
    description?: string; 
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <div className="space-y-2">
        {formData[field as keyof typeof formData].map((item: string, index: number) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={placeholder}
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              className="flex-1"
            />
            {formData[field as keyof typeof formData].length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem(field, index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem(field)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter {label.toLowerCase()}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <PlusCircle className="h-4 w-4 mr-2" />
              Soumettre un outil
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Partagez un nouvel outil IA
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Aidez la communauté en suggérant un nouvel outil d'intelligence artificielle avec tous ses détails.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Informations complètes sur l'outil</CardTitle>
              <CardDescription>
                Remplissez toutes les informations ci-dessous pour créer une fiche complète de l'outil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informations de base */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Informations de base</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom de l'outil *</Label>
                      <Input
                        id="name"
                        placeholder="Ex: ChatGPT, Midjourney..."
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url">URL du site web *</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://..."
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description courte *</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez brièvement ce que fait cet outil en 1-2 phrases..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Description détaillée</Label>
                    <Textarea
                      id="longDescription"
                      placeholder="Description complète de l'outil, son fonctionnement, ses capacités..."
                      value={formData.longDescription}
                      onChange={(e) => handleInputChange('longDescription', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Catégorisation */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Catégorisation</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Catégorie *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="writing">Écriture</SelectItem>
                          <SelectItem value="image">Image & Design</SelectItem>
                          <SelectItem value="video">Vidéo</SelectItem>
                          <SelectItem value="code">Développement</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="education">Éducation</SelectItem>
                          <SelectItem value="audio">Audio & Musique</SelectItem>
                          <SelectItem value="chatbots">Assistant IA</SelectItem>
                          <SelectItem value="analysis">Analyse & Calcul</SelectItem>
                          <SelectItem value="creativity">Art & Créativité</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Prix *</Label>
                      <Select value={formData.pricing} onValueChange={(value) => handleInputChange('pricing', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Modèle de prix" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gratuit">Gratuit</SelectItem>
                          <SelectItem value="Freemium">Freemium</SelectItem>
                          <SelectItem value="Payant">Payant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="users">Nombre d'utilisateurs</Label>
                      <Input
                        id="users"
                        placeholder="Ex: 100M+, 5M+, 1M+..."
                        value={formData.users}
                        onChange={(e) => handleInputChange('users', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Note (sur 5)</Label>
                    <Select value={formData.rating} onValueChange={(value) => handleInputChange('rating', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une note" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5.0">5.0 - Excellent</SelectItem>
                        <SelectItem value="4.9">4.9 - Très bon</SelectItem>
                        <SelectItem value="4.8">4.8 - Très bon</SelectItem>
                        <SelectItem value="4.7">4.7 - Bon</SelectItem>
                        <SelectItem value="4.6">4.6 - Bon</SelectItem>
                        <SelectItem value="4.5">4.5 - Correct</SelectItem>
                        <SelectItem value="4.0">4.0 - Correct</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Fonctionnalités */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Caractéristiques détaillées</h3>
                  
                  <ArrayInput
                    field="features"
                    label="Fonctionnalités principales"
                    placeholder="Ex: Génération de texte avancée"
                    description="Listez les principales fonctionnalités de l'outil"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ArrayInput
                      field="pros"
                      label="Avantages"
                      placeholder="Ex: Interface intuitive"
                      description="Points forts de l'outil"
                    />

                    <ArrayInput
                      field="cons"
                      label="Inconvénients"
                      placeholder="Ex: Prix élevé"
                      description="Limitations ou points faibles"
                    />
                  </div>

                  <ArrayInput
                    field="tags"
                    label="Tags/Mots-clés"
                    placeholder="Ex: IA, Génératif, Créatif"
                    description="Mots-clés pour faciliter la recherche"
                  />
                </div>

                <div className="pt-6 border-t">
                  <Button type="submit" className="w-full" size="lg">
                    Soumettre l'outil complet
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitToolPage;
