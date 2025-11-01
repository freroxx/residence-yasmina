import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Maximize2, Bed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PricingTable from './PricingTable';
import RoomImageCarousel from './RoomImageCarousel';

interface PricingData {
  persons: number;
  highSeason: string;
  midSeason: string;
  lowSeason: string;
}

interface RoomDetailCardProps {
  images: string[];
  title: string;
  subtitle: string;
  description: string;
  size: string;
  balconySize: string;
  capacity: number;
  beds: string;
  pricing: PricingData[];
}

const RoomDetailCard = ({
  images,
  title,
  subtitle,
  description,
  size,
  balconySize,
  capacity,
  beds,
  pricing,
}: RoomDetailCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl group relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="grid md:grid-cols-2 gap-0 relative">
        {/* Image Carousel Section */}
        <div className="relative h-[300px] md:h-full overflow-hidden p-4">
          <RoomImageCarousel images={images} alt={title} />
          {/* Overlay badge */}
          <div className="absolute top-8 left-8 px-4 py-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-xs font-bold text-white">{title}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          <CardHeader className="space-y-3 pb-4">
            <CardTitle className="font-serif text-2xl text-foreground">
              {subtitle}
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {/* Key Details */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Maximize2 className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {size}m² + {t('rooms.detail.balcony')} {balconySize}m²
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {capacity} {t('rooms.persons')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2">
                <Bed className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{beds}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 flex-1 flex flex-col">
            {/* Pricing Table */}
            <div className="flex-1">
              <PricingTable pricing={pricing} title={t('rooms.pricing.title')} />
            </div>

            {/* Important Notes */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-xs text-muted-foreground">
              <p>• {t('rooms.pricing.note1')}</p>
              <p>• {t('rooms.pricing.note2')}</p>
            </div>

            {/* CTA Button */}
            <Link to="/booking" className="group/btn">
              <Button className="w-full relative overflow-hidden" size="lg">
                <span className="relative z-10">{t('hero.cta')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent/20 to-primary opacity-0 group-hover/btn:opacity-20 transition-opacity shimmer-fast" />
              </Button>
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default RoomDetailCard;
