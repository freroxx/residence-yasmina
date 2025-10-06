import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Star } from 'lucide-react';
import balconyView from '@/assets/balcony-view.jpg';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${balconyView})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-3 sm:mb-4">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                {t('about.text1')}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('about.text2')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
                    <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{t('about.location')}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t('about.location.desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{t('home.features.title')}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t('home.description').substring(0, 80)}...
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t('home.highlight').substring(0, 80)}...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Surroundings Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-8 sm:mb-12">
              {t('about.surroundings.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12">
              {t('about.surroundings.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Nearby Places */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4">{t('about.surroundings.places')}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Musée du Patrimoine Amazigh: 300 m</li>
                    <li>• Agadir Oufella Ruins: 2.8 km</li>
                    <li>• Medina Polizzi: 4.1 km</li>
                    <li>• Souss-Massa National Park: 9 km</li>
                    <li>• Croco Parc Agadir: 12 km</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Restaurants */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4">{t('about.surroundings.restaurants')}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Restaurant Scampi: 100 m</li>
                    <li>• Pâtisserie L'Atelier: 200 m</li>
                    <li>• Café Restaurant La Caverna: 100 m</li>
                    <li>• Snack Chich Kabab: 200 m</li>
                    <li>• Pizza Oumlil: 200 m</li>
                    <li>• Mickey Burger: 210 m</li>
                    <li>• Bar à salades 116: 400 m</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Beaches */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold mb-4">{t('about.surroundings.beaches')}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Plage d'Agadir: 700 m</li>
                    <li>• Plage d'Anza: 6 km</li>
                  </ul>
                  <h3 className="text-lg font-bold mb-2 mt-6">{t('about.surroundings.airport')}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Aéroport d'Agadir-Al Massira: 18 km</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.2861917677574!2d-9.601156984886!3d30.418405081766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6f1e0a0e0e0%3A0x9e9a8a8a8a8a8a8a!2sR%C3%A9sidence%20Yasmina!5e0!3m2!1sfr!2sma!4v1635000000000!5m2!1sfr!2sma"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
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
