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
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>{t('rooms.capacity')}: {capacity} {t('rooms.persons')}</span>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">{t('rooms.amenities')}:</p>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/booking">
          <Button className="w-full">
            {t('hero.cta')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
