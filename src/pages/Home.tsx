import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Car, Waves, UtensilsCrossed } from 'lucide-react';
import heroImage from '@/assets/hero-residence.jpg';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Waves, label: t('home.features.pool') },
    { icon: Wifi, label: t('home.features.wifi') },
    { icon: Car, label: t('home.features.parking') },
    { icon: UtensilsCrossed, label: t('home.features.kitchen') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 animate-in fade-in duration-700">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-in fade-in duration-700 delay-150">
            {t('hero.subtitle')}
          </p>
          <Link to="/booking">
            <Button size="lg" className="text-lg px-8 py-6 animate-in fade-in duration-700 delay-300">
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-6">
              {t('home.welcome')}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t('home.description')}
            </p>
            <p className="text-xl font-medium text-primary italic">
              {t('home.highlight')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-6 bg-card rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-4 bg-primary/10 rounded-full">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">
            {t('nav.booking')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('home.description').substring(0, 100)}...
          </p>
          <Link to="/booking">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {t('hero.cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
