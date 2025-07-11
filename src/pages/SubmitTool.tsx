import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/image-upload';
import { ArrayInput } from '@/components/forms/ArrayInput';
import { PlusCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useTools } from '@/contexts/ToolsContext';

interface FormData {
  name: string;
  description: string;
  longDescription: string;
  url: string;
  category: string;
  pricing: string;
  rating: string;
  users: string;
  image: string;
  features: string[];
  pros: string[];
  cons: string[];
  tags: string[];
}

const SubmitToolPage = () => {
  const navigate = useNavigate();
  const { addTool } = useTools();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    longDescription: '',
    url: '',
    category: '',
    pricing: '',
    rating: '',
    users: '',
    image: '',
    features: [''],
    pros: [''],
    cons: [''],
    tags: ['']
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      toast.error("Vous devez être connecté pour soumettre un outil.");
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.url || !formData.category || !formData.pricing) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      pros: formData.pros.filter(p => p.trim() !== ''),
      cons: formData.cons.filter(c => c.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== '')
    };

    addTool(cleanedData);
    
    toast.success("Outil soumis avec succès ! Votre suggestion sera examinée par notre équipe.");
    
    setFormData({
      name: '',
      description: '',
      longDescription: '',
      url: '',
      category: '',
      pricing: '',
      rating: '',
      users: '',
      image: '',
      features: [''],
      pros: [''],
      cons: [''],
      tags: ['']
    });

    setIsSubmitting(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleArrayChange = useCallback((field: keyof FormData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  }, []);

  const addArrayItem = useCallback((field: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  }, []);

  const removeArrayItem = useCallback((field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: string, i: number) => i !== index)
    }));
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-sm font-medium mb-4">
              <PlusCircle className="h-4 w-4 mr-2" />
              Soumettre un outil
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Partagez un nouvel outil IA
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Aidez la communauté en suggérant un nouvel outil d'intelligence artificielle avec tous ses détails.
            </p>
          </div>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Informations complètes sur l'outil
                {isSubmitting && <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
              </CardTitle>
              <CardDescription>
                Remplissez toutes les informations ci-dessous pour créer une fiche complète de l'outil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image de l'outil */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Image de l'outil</h3>
                  <div className="space-y-2">
                    <Label>Logo ou capture d'écran de l'outil</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez une image représentative de l'outil (logo, interface, etc.)
                    </p>
                    <ImageUpload
                      value={formData.image}
                      onChange={(value) => handleInputChange('image', value)}
                      onRemove={() => handleInputChange('image', '')}
                    />
                  </div>
                </div>

                {/* Informations de base */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Informations de base</h3>
                  
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
                  <h3 className="text-lg font-semibold text-foreground">Catégorisation</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Catégorie *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assistant-ia">Assistant IA</SelectItem>
                          <SelectItem value="developpement">Développement</SelectItem>
                          <SelectItem value="redaction">Rédaction</SelectItem>
                          <SelectItem value="chat-communication">Chat & Communication</SelectItem>
                          <SelectItem value="image-design">Image & Design</SelectItem>
                          <SelectItem value="audio-musique">Audio & Musique</SelectItem>
                          <SelectItem value="video">Vidéo</SelectItem>
                          <SelectItem value="analyse-calcul">Analyse & Calcul</SelectItem>
                          <SelectItem value="art-creativite">Art & Créativité</SelectItem>
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
                          <SelectItem value="free">Gratuit</SelectItem>
                          <SelectItem value="freemium">Freemium</SelectItem>
                          <SelectItem value="paid">Payant</SelectItem>
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
                  <h3 className="text-lg font-semibold text-foreground">Caractéristiques détaillées</h3>
                  
                  <ArrayInput
                    field="features"
                    label="Fonctionnalités principales"
                    placeholder="Ex: Génération de texte avancée"
                    description="Listez les principales fonctionnalités de l'outil"
                    values={formData.features}
                    onChange={(index, value) => handleArrayChange('features', index, value)}
                    onAdd={() => addArrayItem('features')}
                    onRemove={(index) => removeArrayItem('features', index)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ArrayInput
                      field="pros"
                      label="Avantages"
                      placeholder="Ex: Interface intuitive"
                      description="Points forts de l'outil"
                      values={formData.pros}
                      onChange={(index, value) => handleArrayChange('pros', index, value)}
                      onAdd={() => addArrayItem('pros')}
                      onRemove={(index) => removeArrayItem('pros', index)}
                    />

                    <ArrayInput
                      field="cons"
                      label="Inconvénients"
                      placeholder="Ex: Prix élevé"
                      description="Limitations ou points faibles"
                      values={formData.cons}
                      onChange={(index, value) => handleArrayChange('cons', index, value)}
                      onAdd={() => addArrayItem('cons')}
                      onRemove={(index) => removeArrayItem('cons', index)}
                    />
                  </div>

                  <ArrayInput
                    field="tags"
                    label="Tags/Mots-clés"
                    placeholder="Ex: IA, Génératif, Créatif"
                    description="Mots-clés pour faciliter la recherche"
                    values={formData.tags}
                    onChange={(index, value) => handleArrayChange('tags', index, value)}
                    onAdd={() => addArrayItem('tags')}
                    onRemove={(index) => removeArrayItem('tags', index)}
                  />
                </div>

                <div className="pt-6 border-t">
                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Soumission en cours...
                      </>
                    ) : (
                      <>
                        Soumettre l'outil complet
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
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
