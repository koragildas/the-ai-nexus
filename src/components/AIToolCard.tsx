
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, TrendingUp, Crown } from 'lucide-react';
import { AITool } from '@/hooks/useAITools';

interface AIToolCardProps {
  tool: AITool;
  className?: string;
}

export const AIToolCard: React.FC<AIToolCardProps> = ({ tool, className = '' }) => {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'freemium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'paid':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getPricingLabel = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return 'Gratuit';
      case 'freemium':
        return 'Freemium';
      case 'paid':
        return 'Payant';
      default:
        return pricing;
    }
  };

  return (
    <Card className={`card-hover group relative overflow-hidden ${className}`}>
      {tool.featured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Crown className="h-3 w-3 mr-1" />
            Vedette
          </Badge>
        </div>
      )}
      
      {tool.trending && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary">
            <TrendingUp className="h-3 w-3 mr-1" />
            Tendance
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {tool.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold group-hover:text-primary smooth-transition">
              {tool.name}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{tool.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({tool.reviewCount.toLocaleString()} avis)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-sm line-clamp-2">
          {tool.description}
        </CardDescription>

        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge className={getPricingColor(tool.pricing)}>
            {getPricingLabel(tool.pricing)}
          </Badge>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover-scale"
            >
              <a href={tool.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            
            <Button size="sm" asChild className="hover-scale">
              <Link to={`/outils/${tool.id}`}>
                Voir détails
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
