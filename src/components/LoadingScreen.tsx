import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Easing function for smoother progress
        const increment = Math.max(1, (100 - prev) * 0.15);
        return Math.min(100, prev + increment);
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setIsVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent/10 rounded-full animate-spin-slower" />
      </div>

      <div className="text-center relative z-10">
        {/* Logo with glow effect */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse-soft" />
          <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-primary animate-fade-in">
            Résidence Yasmina
          </h1>
          <p className="relative text-muted-foreground text-sm mt-2 tracking-widest uppercase animate-fade-in [animation-delay:200ms]">
            Agadir, Morocco
          </p>
        </div>
        
        {/* Progress bar with gradient */}
        <div className="w-64 sm:w-80 mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
            <span className="opacity-60">Loading</span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>
        </div>
        
        {/* Animated dots */}
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-primary/60 rounded-full"
              style={{ 
                animation: 'loading-dot 1.4s ease-in-out infinite',
                animationDelay: `${i * 160}ms` 
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loading-dot {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
