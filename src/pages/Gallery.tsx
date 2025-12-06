import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useMemo } from 'react';
import { Search, Camera, Grid3X3, LayoutGrid, Bed, Droplets, Building, Trees, ImageOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ImageLightbox from '@/components/ImageLightbox';
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', label: 'Tout', icon: Grid3X3 },
    { id: 'rooms', label: 'Chambres', icon: Bed },
    { id: 'pool', label: 'Piscine', icon: Droplets },
    { id: 'residence', label: 'Résidence', icon: Building },
    { id: 'garden', label: 'Jardins', icon: Trees },
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

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const handleImageError = (index: number) => {
    setErrorImages(prev => new Set(prev).add(index));
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return images.length;
    return images.filter(img => img.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft [animation-delay:1s]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-full mb-8 animate-fade-in shadow-lg">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold text-primary">{images.length} Photos</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif text-foreground mb-6 animate-fade-in-up [animation-delay:100ms]">
              {t('gallery.title')}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-in-up [animation-delay:200ms]">
              {t('gallery.subtitle')}
            </p>
            
            {/* Search */}
            <div className="max-w-lg mx-auto relative animate-fade-in-up [animation-delay:300ms]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une photo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 text-lg rounded-2xl border-2 focus:border-primary shadow-xl bg-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-border py-5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                      : 'bg-card border-2 border-border hover:border-primary/40 text-foreground hover:bg-primary/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                  {category.label}
                  <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20' : 'bg-muted'
                  }`}>
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-24 animate-fade-in">
              <div className="inline-flex p-8 bg-muted rounded-full mb-6">
                <ImageOff className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-2xl text-foreground font-semibold mb-3">Aucune photo trouvée</p>
              <p className="text-muted-foreground">
                {searchQuery ? `Aucun résultat pour "${searchQuery}"` : 'Aucune photo dans cette catégorie'}
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
              {filteredImages.map((image, index) => {
                const isLoaded = loadedImages.has(index);
                const hasError = errorImages.has(index);
                
                if (hasError) return null;
                
                return (
                  <div
                    key={index}
                    className="break-inside-avoid mb-5 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                    style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
                  >
                    <button
                      onClick={() => setSelectedImageIndex(index)}
                      className="relative w-full overflow-hidden rounded-2xl group cursor-pointer block shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                      {/* Loading skeleton */}
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
                      )}
                      
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`w-full h-auto object-cover group-hover:scale-110 transition-all duration-700 ${
                          isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white font-semibold text-base">{image.alt}</p>
                          <p className="text-white/60 text-sm mt-1 capitalize">{image.category}</p>
                        </div>
                        
                        {/* View icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <LayoutGrid className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <ImageLightbox
          images={filteredImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </div>
  );
};

export default Gallery;
