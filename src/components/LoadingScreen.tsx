import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-300 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
    </div>
  );
};

export default LoadingScreen;
