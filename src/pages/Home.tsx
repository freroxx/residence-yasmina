import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Car, Waves, UtensilsCrossed, Star, Award, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';
import heroImage from '@/assets/hero-residence.jpg';

const Home = () => {
  const { t } = useLanguage();
  const featuresRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      const children = featuresRef.current.querySelectorAll('.animate-on-scroll');
      children.forEach((child) => observer.observe(child));
    }

    if (welcomeRef.current) {
      observer.observe(welcomeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Waves, label: t('home.features.pool') },
    { icon: Wifi, label: t('home.features.wifi') },
    { icon: Car, label: t('home.features.parking') },
    { icon: UtensilsCrossed, label: t('home.features.kitchen') },
  ];

  const stats = [
    { icon: Star, value: '95%', label: 'Taux de retour' },
    { icon: Award, value: '15+', label: 'Années d\'expérience' },
    { icon: Heart, value: '1000+', label: 'Clients satisfaits' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-[scale-in_1.5s_ease-out]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-white/30 animate-fade-in">
            <span className="text-sm font-medium tracking-wide">Appart'Hotel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards] max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <Link to="/booking">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift">
                {t('hero.cta')}
              </Button>
            </Link>
            <Link to="/rooms">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover-lift">
                {t('nav.rooms')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-4 relative">
          <div ref={welcomeRef} className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-8">
              {t('home.welcome')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.description')}
            </p>
            <div className="inline-block p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
              <p className="text-xl md:text-2xl font-medium text-primary italic">
                {t('home.highlight')}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-card rounded-xl hover-lift animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-16 animate-on-scroll">
            {t('home.features.title')}
          </h2>
          <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll flex flex-col items-center text-center space-y-4 p-8 bg-card rounded-xl hover-lift group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="p-5 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-semibold text-lg">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 animate-fade-in">
              Réservez Votre Séjour Idéal
            </h2>
            <p className="text-xl mb-10 opacity-90 animate-fade-in-up [animation-delay:200ms]">
              Profitez d'un hébergement confortable au cœur d'Agadir avec tous les équipements nécessaires pour un séjour mémorable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:400ms]">
              <Link to="/booking">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 hover-lift">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover-lift">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
