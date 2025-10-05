import { useLanguage } from '@/contexts/LanguageContext';
import RoomCard from '@/components/RoomCard';
import standardRoom from '@/assets/standard-room.jpg';
import twinBedroom from '@/assets/twin-bedroom.jpg';
import apartmentInterior from '@/assets/apartment-interior.jpg';

const Rooms = () => {
  const { t } = useLanguage();

  const rooms = [
    {
      image: standardRoom,
      title: t('rooms.standard.title'),
      description: t('rooms.standard.desc'),
      capacity: 2,
      amenities: ['WiFi', 'TV', t('rooms.amenity.ac'), t('rooms.amenity.bathroom')],
    },
    {
      image: twinBedroom,
      title: t('rooms.deluxe.title'),
      description: t('rooms.deluxe.desc'),
      capacity: 2,
      amenities: ['WiFi', 'TV', t('rooms.amenity.ac'), t('rooms.amenity.balcony')],
    },
    {
      image: apartmentInterior,
      title: t('rooms.suite.title'),
      description: t('rooms.suite.desc'),
      capacity: 4,
      amenities: ['WiFi', 'TV', t('rooms.amenity.kitchen'), t('rooms.amenity.living'), t('rooms.amenity.balcony')],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide">Nos Hébergements</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-4 sm:mb-6">
            {t('rooms.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('rooms.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <RoomCard {...room} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
