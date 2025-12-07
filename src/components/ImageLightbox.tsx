import { useEffect, useCallback, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, ExternalLink, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure index is valid
  const safeIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
  const currentImage = images[safeIndex];

  const resetView = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const goToPrevious = useCallback(() => {
    const newIndex = (safeIndex - 1 + images.length) % images.length;
    onNavigate(newIndex);
    resetView();
    setIsLoading(true);
  }, [safeIndex, images.length, onNavigate, resetView]);

  const goToNext = useCallback(() => {
    const newIndex = (safeIndex + 1) % images.length;
    onNavigate(newIndex);
    resetView();
    setIsLoading(true);
  }, [safeIndex, images.length, onNavigate, resetView]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleDownload = async () => {
    if (!currentImage) return;
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = currentImage.alt?.replace(/[^a-zA-Z0-9]/g, '_') || 'image';
      link.download = `${fileName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(currentImage.src, '_blank');
    }
  };

  const handleOpenInNewTab = () => {
    if (currentImage) {
      window.open(currentImage.src, '_blank');
    }
  };

  // Mouse drag for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Double click to zoom
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoom === 1) {
      setZoom(2);
    } else {
      resetView();
    }
  };

  // Wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom(prev => Math.min(prev + 0.25, 4));
    } else {
      setZoom(prev => {
        const newZoom = Math.max(prev - 0.25, 1);
        if (newZoom === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    }
  }, []);

  // Touch gestures
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || zoom > 1) {
      setTouchStart(null);
      return;
    }
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Swipe detection
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setTouchStart(null);
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
          resetView();
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [goToNext, goToPrevious, handleZoomIn, handleZoomOut, resetView, onClose, handleWheel]);

  // Early return if no image
  if (!currentImage) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top toolbar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
        <div className="flex items-center justify-between p-4 sm:p-6">
          {/* Image info */}
          <div className="text-white flex-1 min-w-0">
            <p className="font-semibold text-base sm:text-lg truncate">{currentImage.alt}</p>
            <p className="text-white/60 text-sm">
              {safeIndex + 1} / {images.length}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Zoom controls */}
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-10 w-10"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                title="Zoom arrière (-)"
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              <span className="text-white/80 text-sm min-w-[50px] text-center font-mono">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-10 w-10"
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                title="Zoom avant (+)"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-10 w-10"
                onClick={resetView}
                title="Réinitialiser (0)"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <div className="w-px h-6 bg-white/20 mx-2" />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-10 w-10"
              onClick={handleDownload}
              title="Télécharger"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-10 w-10"
              onClick={handleOpenInNewTab}
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 h-10 w-10 ml-1"
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
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-black/50 hover:bg-black/80 rounded-full transition-all duration-300 z-20 group"
            onClick={goToPrevious}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-4 bg-black/50 hover:bg-black/80 rounded-full transition-all duration-300 z-20 group"
            onClick={goToNext}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Main image area */}
      <div 
        className="flex-1 flex items-center justify-center pt-20 pb-24 sm:pb-28 px-4 sm:px-16 overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <div 
          className="relative max-w-full max-h-full flex items-center justify-center"
          onDoubleClick={handleDoubleClick}
        >
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          )}
          
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            className={`max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain select-none transition-all duration-200 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ 
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              transformOrigin: 'center center',
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="px-4 py-4 sm:py-5">
            <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide max-w-full">
              {images.map((image, index) => (
                <button
                  key={`thumb-${index}`}
                  onClick={() => {
                    onNavigate(index);
                    resetView();
                    setIsLoading(true);
                  }}
                  className={`relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === safeIndex 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' 
                      : 'opacity-40 hover:opacity-80 hover:scale-105'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Keyboard shortcuts hint */}
          <div className="text-center pb-3 text-white/40 text-xs hidden sm:block">
            ← → Navigation • Molette/+/- Zoom • Double-clic Zoom • 0 Reset • Échap Fermer
          </div>
        </div>
      )}

      {/* Mobile zoom controls */}
      <div className="sm:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 rounded-full px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 h-8 w-8"
          onClick={handleZoomOut}
          disabled={zoom <= 1}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-white/80 text-xs min-w-[40px] text-center font-mono">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 h-8 w-8"
          onClick={handleZoomIn}
          disabled={zoom >= 4}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageLightbox;
