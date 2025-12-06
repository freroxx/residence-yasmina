import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, ExternalLink, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex];
  
  // Safety check - close if no valid image
  if (!currentImage) {
    onClose();
    return null;
  }

  const goToPrevious = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(newIndex);
    setZoom(1);
    setIsLoading(true);
  }, [currentIndex, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    onNavigate(newIndex);
    setZoom(1);
    setIsLoading(true);
  }, [currentIndex, images.length, onNavigate]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentImage.alt || 'image'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(currentImage.src, '_blank');
    }
  };

  const handleOpenInNewTab = () => {
    window.open(currentImage.src, '_blank');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleResetZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [goToNext, goToPrevious, onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col animate-fade-in"
      onClick={onClose}
    >
      {/* Top toolbar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between p-4">
          {/* Image info */}
          <div className="text-white">
            <p className="font-medium text-lg">{currentImage.alt}</p>
            <p className="text-white/60 text-sm">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
              title="Zoom arrière (-)"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            <span className="text-white/80 text-sm min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
              title="Zoom avant (+)"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-white/20 mx-2" />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
              title="Réinitialiser le zoom (0)"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleDownload(); }}
              title="Télécharger"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); handleOpenInNewTab(); }}
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="h-5 w-5" />
            </Button>
            <div className="w-px h-6 bg-white/20 mx-2" />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
              title="Fermer (Échap)"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/25 rounded-full transition-all duration-300 z-10 hover:scale-110 group"
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-8 w-8 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/25 rounded-full transition-all duration-300 z-10 hover:scale-110 group"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-8 w-8 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center p-16 pt-24 overflow-hidden">
        <div 
          className="relative max-w-full max-h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex justify-center gap-2 p-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onNavigate(index); 
                  setZoom(1);
                  setIsLoading(true);
                }}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-white scale-110' 
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs hidden md:block">
        ← → Navigation • +/- Zoom • 0 Réinitialiser • Échap Fermer
      </div>
    </div>
  );
};

export default ImageLightbox;
