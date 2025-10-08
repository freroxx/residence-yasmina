import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoomImageCarouselProps {
  images: string[];
  alt: string;
}

const RoomImageCarousel = ({ images, alt }: RoomImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl group">
      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt={`${alt} - Photo ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-lift"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-lift"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Aller à la photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default RoomImageCarousel;
