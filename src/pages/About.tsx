import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Star, Building2, Utensils, Plane, Waves } from 'lucide-react';
import balconyView from '@/assets/balcony-view.jpg';
import { useEffect, useRef } from 'react';

const About = () => {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

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

    if (contentRef.current) {
      const children = contentRef.current.querySelectorAll('.animate-on-scroll');
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-100 transition-transform duration-700"
          style={{ backgroundImage: `url(${balconyView})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl">
          <div className="inline-block px-6 py-3 glass rounded-full mb-6 animate-fade-in">
            <span className="text-sm font-semibold tracking-wider uppercase">Résidence Yasmina</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {t('about.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={contentRef}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
              <div className="inline-block px-5 py-2.5 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-bold text-primary tracking-wide uppercase">Notre Histoire</span>
              </div>
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  {t('about.text1')}
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t('about.text2')}
                </p>
                <div className="mt-8 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20">
                  <p className="text-xl sm:text-2xl text-primary font-semibold italic">
                    Une résidence familiale où le confort rencontre l'authenticité marocaine, 
                    offrant une expérience inoubliable au cœur d'Agadir.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
              {[
                { 
                  icon: MapPin, 
                  title: t('about.location'), 
                  desc: t('about.location.desc'), 
                  color: 'from-primary/20 to-accent/20' 
                },
                { 
                  icon: Users, 
                  title: t('home.features.title'), 
                  desc: t('home.description').substring(0, 100) + '...', 
                  color: 'from-accent/20 to-primary/20' 
                },
                { 
                  icon: Star, 
                  title: 'Excellence', 
                  desc: t('home.highlight').substring(0, 100) + '...', 
                  color: 'from-primary/20 to-accent/20' 
                },
              ].map((feature, index) => (
                <Card 
                  key={index}
                  className="hover-lift-lg animate-on-scroll border-2 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <CardContent className="pt-8 pb-8 text-center relative z-10">
                    <div className="inline-flex p-5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <feature.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Surroundings Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-secondary/30 to-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
              <div className="inline-block px-5 py-2.5 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-bold text-primary tracking-wide uppercase">Environnement</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif mb-6">
                {t('about.surroundings.title')}
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                {t('about.surroundings.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {/* Nearby Places */}
              <Card className="hover-lift-lg border-2 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative animate-on-scroll">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="pt-8 pb-8 relative z-10">
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-5 group-hover:scale-110 transition-all duration-500">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-6 group-hover:text-primary transition-colors">{t('about.surroundings.places')}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Musée du Patrimoine Amazigh: <strong className="text-primary">300 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Agadir Oufella Ruins: <strong className="text-primary">2.8 km</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Medina Polizzi: <strong className="text-primary">4.1 km</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Souss-Massa National Park: <strong className="text-primary">9 km</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Croco Parc Agadir: <strong className="text-primary">12 km</strong></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Restaurants */}
              <Card className="hover-lift-lg border-2 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative animate-on-scroll [animation-delay:100ms]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="pt-8 pb-8 relative z-10">
                  <div className="inline-flex p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl mb-5 group-hover:scale-110 transition-all duration-500">
                    <Utensils className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-6 group-hover:text-primary transition-colors">{t('about.surroundings.restaurants')}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Restaurant Scampi: <strong className="text-primary">100 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Pâtisserie L'Atelier: <strong className="text-primary">200 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Café La Caverna: <strong className="text-primary">100 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Snack Chich Kabab: <strong className="text-primary">200 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Pizza Oumlil: <strong className="text-primary">200 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Mickey Burger: <strong className="text-primary">210 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Bar à salades 116: <strong className="text-primary">400 m</strong></span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Beaches & Airport */}
              <Card className="hover-lift-lg border-2 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative animate-on-scroll [animation-delay:200ms]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="pt-8 pb-8 relative z-10">
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-5 group-hover:scale-110 transition-all duration-500">
                    <Waves className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-6 group-hover:text-primary transition-colors">{t('about.surroundings.beaches')}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Plage d'Agadir: <strong className="text-primary">700 m</strong></span>
                    </li>
                    <li className="flex items-start hover:text-foreground transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>Plage d'Anza: <strong className="text-primary">6 km</strong></span>
                    </li>
                  </ul>
                  
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg">
                        <Plane className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{t('about.surroundings.airport')}</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start hover:text-foreground transition-colors">
                        <span className="mr-2 text-primary">•</span>
                        <span>Aéroport d'Agadir-Al Massira: <strong className="text-primary">18 km</strong></span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 animate-on-scroll [animation-delay:400ms]">
              <Card className="overflow-hidden hover-lift-lg transition-all duration-500 border-2 hover:border-primary/40">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-6 left-6 z-10 glass px-5 py-3 rounded-xl">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-bold text-white">Résidence Yasmina - Agadir</span>
                      </div>
                    </div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.2861917677574!2d-9.601156984886!3d30.418405081766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e6c86b8d47%3A0x1a4a5a2c6e9b5e8f!2sR%C3%A9sidence%20Yasmina!5e0!3m2!1sfr!2sma!4v1635000000000!5m2!1sfr!2sma"
                      width="100%"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Résidence Yasmina Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
