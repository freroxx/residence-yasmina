import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Wifi, Coffee, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoomCardProps {
  image: string;
  title: string;
  description: string;
  capacity: number;
  amenities: string[];
}

const RoomCard = ({ image, title, description, capacity, amenities }: RoomCardProps) => {
  const { t } = useLanguage();

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: JSX.Element } = {
      wifi: <Wifi className="h-4 w-4" />,
      kitchen: <Coffee className="h-4 w-4" />,
      tv: <Tv className="h-4 w-4" />,
    };
    return icons[amenity.toLowerCase()] || <Coffee className="h-4 w-4" />;
  };

  return (
    <Card className="overflow-hidden group hover-lift border-2 hover:border-primary/30 transition-all duration-300">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
          <Users className="h-5 w-5 mr-2 text-primary" />
          <span className="font-medium">{t('rooms.capacity')}: {capacity} {t('rooms.persons')}</span>
        </div>
        
        <div>
          <p className="text-sm font-semibold mb-3 text-foreground">{t('rooms.amenities')}:</p>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <div
                key={amenity}
                className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-2 rounded-full text-xs font-medium hover:bg-primary/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/booking">
          <Button className="w-full group-hover:shadow-lg transition-all">
            {t('hero.cta')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
