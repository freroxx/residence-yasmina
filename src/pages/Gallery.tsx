import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useMemo, useEffect } from 'react';
import { X, Search, Camera, Grid3X3, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tout', icon: Grid3X3 },
    { id: 'rooms', label: 'Chambres', icon: LayoutGrid },
    { id: 'pool', label: 'Piscine', icon: Camera },
    { id: 'residence', label: 'Résidence', icon: Camera },
    { id: 'garden', label: 'Jardins', icon: Camera },
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
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => 
        prev !== null ? (prev + 1) % filteredImages.length : null
      );
      if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => 
        prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
      );
    };
    
    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex, filteredImages.length]);

  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full mb-6">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{images.length} Photos</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-4">
              {t('gallery.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              {t('gallery.subtitle')}
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-2xl border-2 focus:border-primary shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card border border-border hover:border-primary/50 text-foreground'
                }`}
              >
                {category.label}
                {selectedCategory === category.id && (
                  <span className="ml-2 text-xs opacity-80">
                    ({filteredImages.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-flex p-6 bg-muted rounded-full mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-xl text-foreground font-medium mb-2">Aucune photo trouvée</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? `pour "${searchQuery}"` : 'dans cette catégorie'}
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="break-inside-avoid animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                >
                  <button
                    onClick={() => setSelectedImageIndex(index)}
                    className="relative w-full overflow-hidden rounded-2xl group cursor-pointer block"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-sm">{image.alt}</p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-fade-in"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={() => setSelectedImageIndex(null)}
            aria-label="Fermer"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => 
                prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
              );
            }}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => 
                prev !== null ? (prev + 1) % filteredImages.length : null
              );
            }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image */}
          <div className="max-w-6xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center px-16">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">{selectedImage.alt}</p>
              <p className="text-white/60 text-sm mt-1">
                {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
