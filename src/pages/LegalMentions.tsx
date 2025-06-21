
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LegalMentions = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mentions Légales</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Informations légales et réglementaires</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Éditeur du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">AI Nexus</h3>
                <p className="text-gray-600">SAS au capital de 50 000 €</p>
                <p className="text-gray-600">Siège social : 123 Avenue de l'Innovation, 75001 Paris, France</p>
                <p className="text-gray-600">RCS Paris : 123 456 789</p>
                <p className="text-gray-600">SIRET : 123 456 789 00012</p>
                <p className="text-gray-600">TVA intracommunautaire : FR12 123456789</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Directeur de la publication</h4>
                <p className="text-gray-600">Jean Dupont, Président</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ce site est hébergé par Lovable Technologies<br/>
                Adresse : San Francisco, CA, États-Unis<br/>
                Site web : https://lovable.dev
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-600">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-gray-600">
                Les données collectées sur ce site sont traitées dans le respect de votre vie privée. Elles ne sont utilisées que dans le cadre de la fourniture de nos services et ne sont jamais transmises à des tiers sans votre consentement explicite.
              </p>
              <p className="text-gray-600">
                Pour exercer vos droits, vous pouvez nous contacter à l'adresse : contact@ai-nexus.fr
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent aucune donnée personnelle et ne peuvent pas être désactivés. En continuant votre navigation sur ce site, vous acceptez l'utilisation de ces cookies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                L'éditeur s'efforce de fournir sur le site AI Nexus des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalMentions;
