
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
