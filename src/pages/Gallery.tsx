import { useLanguage } from '@/contexts/LanguageContext';
import aerialBuilding from '@/assets/aerial-building.jpg';
import poolUmbrellas from '@/assets/pool-umbrellas.jpg';
import poolPatio from '@/assets/pool-patio.jpg';
import twinBedroom from '@/assets/twin-bedroom.jpg';
import standardRoom from '@/assets/standard-room.jpg';
import livingRoomSofa from '@/assets/living-room-sofa.jpg';
import apartmentInterior from '@/assets/apartment-interior.jpg';
import gardenPlants from '@/assets/garden-plants.jpg';
import tennisGardens from '@/assets/tennis-gardens-aerial.jpg';
import balconyView from '@/assets/balcony-view.jpg';

const Gallery = () => {
  const { t } = useLanguage();

  const images = [
    { src: aerialBuilding, alt: t('gallery.aerial') },
    { src: poolUmbrellas, alt: t('gallery.pool') },
    { src: poolPatio, alt: t('gallery.poolArea') },
    { src: twinBedroom, alt: t('gallery.bedroom') },
    { src: standardRoom, alt: t('gallery.standardRoom') },
    { src: livingRoomSofa, alt: t('gallery.livingRoom') },
    { src: apartmentInterior, alt: t('gallery.apartment') },
    { src: gardenPlants, alt: t('gallery.garden') },
    { src: tennisGardens, alt: t('gallery.tennis') },
    { src: balconyView, alt: t('gallery.view') },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-serif text-foreground mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover-lift group animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-white font-medium text-sm sm:text-base">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
