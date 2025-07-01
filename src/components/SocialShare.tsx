
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ url, title, description }) => {
  const { toast } = useToast();

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié !",
      description: "Le lien a été copié dans votre presse-papiers.",
    });
  };

  const handleShare = (platform: string, url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-2 mb-2">
        <Share2 className="h-4 w-4" />
        <span className="font-medium text-sm">Partager cet outil</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('Facebook', shareLinks.facebook)}
          className="flex items-center space-x-2"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          <span>Facebook</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('Twitter', shareLinks.twitter)}
          className="flex items-center space-x-2"
        >
          <Twitter className="h-4 w-4 text-blue-400" />
          <span>Twitter</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('LinkedIn', shareLinks.linkedin)}
          className="flex items-center space-x-2"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
          <span>LinkedIn</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('WhatsApp', shareLinks.whatsapp)}
          className="flex items-center space-x-2"
        >
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
          </svg>
          <span>WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center space-x-2"
        >
          <Link2 className="h-4 w-4" />
          <span>Copier le lien</span>
        </Button>
      </div>
    </div>
  );
};
