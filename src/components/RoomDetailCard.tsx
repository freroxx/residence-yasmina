import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Maximize2, Bed, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import PricingTable from './PricingTable';
import { useState } from 'react';

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
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl group relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-0 relative">
        {/* Image Section */}
        <div className="relative flex flex-col p-4 lg:p-6">
          {/* Main Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src={images[currentImage]}
              alt={`${title} - ${currentImage + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/60 text-white text-sm rounded-full font-medium">
                {currentImage + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Grid - shown when multiple images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                    currentImage === idx 
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">{title}</span>
                <CardTitle className="font-serif text-2xl lg:text-3xl text-foreground mt-1">
                  {subtitle}
                </CardTitle>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {/* Key Details */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                <Maximize2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {size}m² + {balconySize}m²
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {capacity} {t('rooms.persons')}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                <Bed className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{beds}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 flex-1 flex flex-col">
            {/* Pricing Table */}
            <div className="flex-1">
              <PricingTable pricing={pricing} title={t('rooms.pricing.title')} />
            </div>

            {/* Important Notes */}
            <div className="bg-muted/30 rounded-xl p-4 space-y-1.5 text-xs text-muted-foreground">
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
