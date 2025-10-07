import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { X } from 'lucide-react';
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
import suiteA from '@/assets/suite-a.png';
import suiteA1 from '@/assets/suite-a-1.png';
import suiteA3 from '@/assets/suite-a-3.png';
import suiteB from '@/assets/suite-b.png';
import suiteC from '@/assets/suite-c.png';
import suiteC1 from '@/assets/suite-c-1.png';
import suiteC2 from '@/assets/suite-c-2.png';
import suiteC3 from '@/assets/suite-c-3.png';
import suiteC4 from '@/assets/suite-c-4.png';
import appart from '@/assets/appart.png';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const images = [
    { src: aerialBuilding, alt: t('gallery.aerial'), category: 'residence' },
    { src: poolUmbrellas, alt: t('gallery.pool'), category: 'pool' },
    { src: poolPatio, alt: t('gallery.poolArea'), category: 'pool' },
    { src: tennisGardens, alt: t('gallery.tennis'), category: 'residence' },
    { src: gardenPlants, alt: t('gallery.garden'), category: 'residence' },
    { src: suiteA, alt: 'Suite A - Chambre', category: 'rooms' },
    { src: suiteA1, alt: 'Suite A - Salle de bain', category: 'rooms' },
    { src: suiteA3, alt: 'Suite A - Salon', category: 'rooms' },
    { src: suiteB, alt: 'Suite B - Chambre', category: 'rooms' },
    { src: suiteC, alt: 'Suite C - Chambre', category: 'rooms' },
    { src: suiteC1, alt: 'Suite C - Vue balcon', category: 'rooms' },
    { src: suiteC2, alt: 'Suite C - Salon', category: 'rooms' },
    { src: suiteC3, alt: 'Suite C - Chambre détail', category: 'rooms' },
    { src: suiteC4, alt: 'Suite C - Cuisine', category: 'rooms' },
    { src: appart, alt: 'Appartement - Chambre', category: 'rooms' },
    { src: twinBedroom, alt: t('gallery.bedroom'), category: 'rooms' },
    { src: standardRoom, alt: t('gallery.standardRoom'), category: 'rooms' },
    { src: livingRoomSofa, alt: t('gallery.livingRoom'), category: 'rooms' },
    { src: apartmentInterior, alt: t('gallery.apartment'), category: 'rooms' },
    { src: balconyView, alt: t('gallery.view'), category: 'rooms' },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide">
              {images.length} Photos
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover-lift group animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-white font-medium text-sm sm:text-base">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-lg mt-4 text-center">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
