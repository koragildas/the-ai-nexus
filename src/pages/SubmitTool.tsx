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
import { PlusCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmitToolPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    pricing: '',
    language: 'Français'
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
    // Ici on ajouterait la logique pour envoyer les données
    toast({
      title: "Outil soumis avec succès !",
      description: "Votre suggestion sera examinée par notre équipe.",
    });
    setFormData({
      name: '',
      description: '',
      url: '',
      category: '',
      pricing: '',
      language: 'Français'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              Aidez la communauté en suggérant un nouvel outil d'intelligence artificielle.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Informations sur l'outil</CardTitle>
              <CardDescription>
                Remplissez les informations ci-dessous pour soumettre votre suggestion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez brièvement ce que fait cet outil..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={4}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="writing">Écriture</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Vidéo</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Éducation</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="chatbots">Chatbots</SelectItem>
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
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Soumettre l'outil
                  <Send className="ml-2 h-4 w-4" />
                </Button>
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
