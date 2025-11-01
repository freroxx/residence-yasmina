import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Car, Waves, UtensilsCrossed, Star, Award, Heart, Home as HomeIcon, Users, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import aerialBuilding from '@/assets/aerial-building.jpg';
import poolPatio from '@/assets/pool-patio.jpg';
import suiteC2 from '@/assets/suite-c-2.png';

const Home = () => {
  const { t } = useLanguage();
  const featuresRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
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
      {/* Hero Section with Enhanced Parallax */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center parallax"
          style={{ 
            backgroundImage: `url(${aerialBuilding})`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            filter: `brightness(${1 - scrollY * 0.0005})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-float-slow" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/30 rounded-full animate-float-slower" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent/30 rounded-full animate-float" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-5 py-2.5 glass rounded-full animate-fade-in hover-scale-sm">
            <Sparkles className="w-4 h-4 animate-pulse-soft" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">Appart'Hotel de Luxe</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-4 sm:mb-6 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] leading-tight hover-brightness">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 opacity-95 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards] max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <Link to="/booking" className="group">
              <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 hover-lift-lg w-full sm:w-auto shadow-2xl relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent/20 to-primary opacity-0 group-hover:opacity-20 transition-opacity shimmer-fast" />
              </Button>
            </Link>
            <Link to="/rooms" className="group">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 hover-lift-lg w-full sm:w-auto glass-dark border-2 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  {t('nav.rooms')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-7 h-11 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm hover-scale transition-all cursor-pointer">
            <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-pulse-soft" />
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div ref={welcomeRef} className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-6 sm:mb-8">
              {t('home.welcome')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-4">
              {t('home.description')}
            </p>
            <div className="inline-block p-8 sm:p-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 mx-4 hover-lift">
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-primary italic">
                {t('home.highlight')}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mt-16 sm:mt-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-card rounded-xl hover-lift-lg animate-on-scroll border border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 sm:p-5 bg-primary/10 rounded-full mb-4 sm:mb-5">
                  <stat.icon className="h-7 w-7 sm:h-9 sm:w-9 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft [animation-delay:1s]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 sm:mb-20 animate-on-scroll">
            <div className="inline-block mb-5 px-5 py-2.5 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">Équipements Premium</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif mb-6">
              {t('home.features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tout le confort moderne pour un séjour inoubliable
            </p>
          </div>
          <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll relative flex flex-col items-center text-center space-y-5 p-8 lg:p-10 bg-card rounded-2xl hover-lift-lg group border-2 border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                </div>
                <span className="relative font-bold text-lg sm:text-xl">{feature.label}</span>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview Section - Enhanced */}
      <section className="py-20 sm:py-24 lg:py-28 bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 sm:mb-20 animate-on-scroll">
            <div className="inline-flex items-center gap-2 mb-5 px-6 py-3 glass rounded-full">
              <HomeIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary tracking-wider uppercase">Nos Logements</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 leading-tight">
              Choisissez Votre Hébergement Idéal
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Suites spacieuses et appartements confortables pour tous vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {[
              { icon: HomeIcon, title: 'Suite A', desc: 'Jusqu\'à 7 personnes', size: '64m²', color: 'from-primary/20 to-accent/20' },
              { icon: Users, title: 'Suite B & C', desc: 'Jusqu\'à 5 personnes', size: '58-59m²', color: 'from-accent/20 to-primary/20' },
              { icon: MapPin, title: 'Appartement', desc: 'Jusqu\'à 5 personnes', size: '42m²', color: 'from-primary/20 to-accent/20' },
            ].map((room, index) => (
              <Card 
                key={index} 
                className="hover-lift-lg animate-fade-in-up opacity-0 [animation-fill-mode:forwards] border-2 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${room.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardContent className="p-10 text-center relative z-10">
                  <div className="inline-flex p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <room.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{room.title}</h3>
                  <p className="text-muted-foreground mb-3 text-lg">{room.desc}</p>
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                    <p className="text-lg text-primary font-bold">{room.size}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/rooms" className="group inline-block">
              <Button size="lg" className="hover-lift-lg text-xl px-12 py-7 shadow-xl">
                Voir Tous les Logements
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery Preview - Enhanced */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-secondary/30 to-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif mb-6">
              Découvrez Notre Résidence
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Un cadre idéal pour vos vacances à Agadir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { src: aerialBuilding, alt: 'Vue aérienne', label: 'Vue aérienne' },
              { src: poolPatio, alt: 'Espace piscine', label: 'Espace piscine' },
              { src: suiteC2, alt: 'Intérieur suite', label: 'Intérieurs élégants' },
            ].map((img, index) => (
              <div 
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl group animate-fade-in-up opacity-0 [animation-fill-mode:forwards] hover-lift-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-2xl font-bold">{img.label}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery" className="group inline-block">
              <Button size="lg" variant="outline" className="hover-lift-lg text-xl px-12 py-7 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                Voir Toute la Galerie
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 sm:mb-8 animate-fade-in">
              Réservez Votre Séjour Idéal
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 opacity-90 animate-fade-in-up [animation-delay:200ms] px-4">
              Profitez d'un hébergement confortable au cœur d'Agadir avec tous les équipements nécessaires pour un séjour mémorable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center animate-fade-in-up [animation-delay:400ms]">
              <Link to="/booking">
                <Button size="lg" variant="secondary" className="text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-7 hover-lift-lg w-full sm:w-auto">
                  {t('hero.cta')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-7 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover-lift-lg w-full sm:w-auto">
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
