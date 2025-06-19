
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, CreditCard, User, Mail, Building, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionCheckoutProps {
  packageName: string;
  price: string;
  features: string[];
  children: React.ReactNode;
}

export const SubscriptionCheckout: React.FC<SubscriptionCheckoutProps> = ({ 
  packageName, 
  price, 
  features, 
  children 
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Informations de contact
    name: '',
    email: '',
    company: '',
    phone: '',
    // Informations de paiement carte
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // Informations PayPal
    paypalEmail: '',
    // Informations rendez-vous
    appointmentDate: '',
    appointmentTime: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    // Simulation du processus selon la méthode de paiement
    let successMessage = '';
    
    switch (paymentMethod) {
      case 'card':
        successMessage = `Paiement par carte réussi ! Vous êtes maintenant abonné au forfait ${packageName}.`;
        break;
      case 'paypal':
        successMessage = `Paiement PayPal en cours ! Vous recevrez une confirmation une fois le paiement validé pour le forfait ${packageName}.`;
        break;
      case 'cash':
        successMessage = `Rendez-vous programmé ! Nous vous contacterons pour confirmer votre rendez-vous au bureau pour le forfait ${packageName}.`;
        break;
    }

    console.log('Souscription:', { packageName, price, paymentMethod, formData });
    
    toast({
      title: "Demande enregistrée !",
      description: successMessage,
    });

    setIsOpen(false);
    setStep(1);
    setPaymentMethod('card');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      paypalEmail: '',
      appointmentDate: '',
      appointmentTime: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Souscription - {packageName}
          </DialogTitle>
          <DialogDescription>
            Étape {step} sur 2 - {step === 1 ? 'Informations de contact' : 'Méthode de paiement'}
          </DialogDescription>
        </DialogHeader>

        {/* Résumé de la commande */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{packageName}</CardTitle>
            <CardDescription>
              <span className="text-2xl font-bold text-blue-600">{price}</span>/mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              {features.length > 3 && (
                <div className="text-sm text-gray-500">
                  +{features.length - 3} autres fonctionnalités
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            // Étape 1: Informations de contact
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Entreprise *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </>
          ) : (
            // Étape 2: Méthode de paiement
            <>
              <div className="space-y-4">
                <Label>Choisissez votre méthode de paiement</Label>
                <div className="grid grid-cols-1 gap-3">
                  <Card 
                    className={`cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CardContent className="flex items-center p-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-medium">Carte bancaire (Visa, Mastercard, etc.)</span>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <CardContent className="flex items-center p-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="h-5 w-5 mr-3 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <span className="font-medium">PayPal</span>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <CardContent className="flex items-center p-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <MapPin className="h-5 w-5 mr-3 text-green-600" />
                      <span className="font-medium">Paiement en espèces au bureau</span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Formulaires spécifiques selon la méthode */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nom sur la carte *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numéro de carte *</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        className="pl-10"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Date d'expiration *</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          handleInputChange('expiryDate', value);
                        }}
                        placeholder="MM/AA"
                        maxLength={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypalEmail">Email PayPal *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="paypalEmail"
                        type="email"
                        value={formData.paypalEmail}
                        onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
                        className="pl-10"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                    Vous serez redirigé vers PayPal pour finaliser le paiement.
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">Date souhaitée *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="appointmentDate"
                          type="date"
                          value={formData.appointmentDate}
                          onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Heure souhaitée *</Label>
                      <Input
                        id="appointmentTime"
                        type="time"
                        value={formData.appointmentTime}
                        onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optionnel)</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none"
                      rows={3}
                      placeholder="Informations supplémentaires pour votre rendez-vous..."
                    />
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg text-sm text-green-800">
                    <strong>Adresse du bureau :</strong><br />
                    123 Avenue des Champs-Élysées<br />
                    75008 Paris, France<br />
                    Métro : Charles de Gaulle - Étoile
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between pt-4">
            {step === 2 && (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Retour
              </Button>
            )}
            <div className="flex space-x-2 ml-auto">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {step === 1 ? 'Continuer' : 
                 paymentMethod === 'card' ? 'Payer maintenant' :
                 paymentMethod === 'paypal' ? 'Payer avec PayPal' :
                 'Programmer le rendez-vous'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
