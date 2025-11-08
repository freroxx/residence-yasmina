import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useMemo, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
import espacePaisible from '@/assets/espace-paisible.jpg';
import paysageExterieur from '@/assets/paysage-exterieur.jpg';
import vueBalconNew from '@/assets/vue-balcon.jpg';
import fontaineJardin from '@/assets/fontaine-jardin.jpg';
import residenceExterieur from '@/assets/residence-exterieur.jpg';
import vueJardinInterieur from '@/assets/vue-jardin-interieur.jpg';
import espaceTranquille from '@/assets/espace-tranquille.jpg';
import piscineIntegree from '@/assets/piscine-integree.jpg';
import parasolsToit from '@/assets/parasols-toit.jpg';
import vueTerrainsTennis from '@/assets/vue-terrains-tennis.jpg';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const categories = [
    { id: 'all', label: 'Toutes les photos' },
    { id: 'rooms', label: 'Chambres & Suites' },
    { id: 'pool', label: 'Piscine' },
    { id: 'residence', label: 'Résidence' },
    { id: 'garden', label: 'Jardins & Espaces' },
  ];

  const images = [
    { src: aerialBuilding, alt: t('gallery.aerial'), category: 'residence' },
    { src: poolUmbrellas, alt: t('gallery.pool'), category: 'pool' },
    { src: poolPatio, alt: t('gallery.poolArea'), category: 'pool' },
    { src: piscineIntegree, alt: 'Piscine intégrée', category: 'pool' },
    { src: tennisGardens, alt: t('gallery.tennis'), category: 'residence' },
    { src: vueTerrainsTennis, alt: 'Vue sur terrains de tennis', category: 'residence' },
    { src: gardenPlants, alt: t('gallery.garden'), category: 'residence' },
    { src: residenceExterieur, alt: 'La résidence de l\'extérieur', category: 'residence' },
    { src: paysageExterieur, alt: 'Paysage de l\'extérieur', category: 'residence' },
    { src: fontaineJardin, alt: 'Fontaine Jardin', category: 'garden' },
    { src: vueJardinInterieur, alt: 'Vue sur jardin intérieur', category: 'garden' },
    { src: espacePaisible, alt: 'Espace paisible', category: 'garden' },
    { src: espaceTranquille, alt: 'Espace tranquille', category: 'garden' },
    { src: parasolsToit, alt: 'Parasols au toit', category: 'garden' },
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
    { src: vueBalconNew, alt: 'Vue balcon', category: 'rooms' },
  ];

  const filteredImages = useMemo(() => {
    let filtered = [...images];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img => 
        img.alt.toLowerCase().includes(query) ||
        img.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide">
              {images.length} Photos
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('gallery.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher dans la galerie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card border-2 border-border hover:border-primary/40 hover:scale-105'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex p-6 bg-muted rounded-full mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-xl text-muted-foreground mb-2">Aucune photo trouvée</p>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? `pour "${searchQuery}"` : 'dans cette catégorie'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover-lift group animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(image);
                }
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-white font-medium text-sm sm:text-base">{image.alt}</span>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image en grand format"
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23000" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff"%3EImage non disponible%3C/text%3E%3C/svg%3E';
              }}
            />
            <p className="text-white text-lg mt-4 text-center px-4">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
