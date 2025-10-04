import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-residence.jpg';
import roomStandard from '@/assets/room-standard.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';
import apartmentSuite from '@/assets/apartment-suite.jpg';

const Gallery = () => {
  const { t } = useLanguage();

  const images = [
    { src: heroImage, alt: 'Résidence exterior' },
    { src: roomDeluxe, alt: 'Deluxe room' },
    { src: apartmentSuite, alt: 'Suite apartment' },
    { src: roomStandard, alt: 'Standard room' },
    { src: heroImage, alt: 'Pool area' },
    { src: roomDeluxe, alt: 'Interior view' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-video overflow-hidden rounded-xl shadow-lg hover-lift group animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
