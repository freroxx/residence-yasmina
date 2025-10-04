import { useLanguage } from '@/contexts/LanguageContext';
import RoomCard from '@/components/RoomCard';
import roomStandard from '@/assets/room-standard.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import apartmentSuite from '@/assets/apartment-suite.jpg';

const Rooms = () => {
  const { t } = useLanguage();

  const rooms = [
    {
      image: roomStandard,
      title: t('rooms.standard.title'),
      description: t('rooms.standard.desc'),
      capacity: 2,
      amenities: ['WiFi', 'TV', 'A/C'],
    },
    {
      image: roomDeluxe,
      title: t('rooms.deluxe.title'),
      description: t('rooms.deluxe.desc'),
      capacity: 2,
      amenities: ['WiFi', 'TV', 'Kitchen', 'A/C'],
    },
    {
      image: apartmentSuite,
      title: t('rooms.suite.title'),
      description: t('rooms.suite.desc'),
      capacity: 4,
      amenities: ['WiFi', 'TV', 'Kitchen', 'A/C', 'Balcony'],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide">Nos Hébergements</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
            {t('rooms.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('rooms.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
