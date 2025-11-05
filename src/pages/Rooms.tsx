import { useLanguage } from '@/contexts/LanguageContext';
import RoomDetailCard from '@/components/RoomDetailCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Users, Bed, Maximize2, ArrowRight } from 'lucide-react';
import suiteA from '@/assets/suite-a.png';
import suiteA1 from '@/assets/suite-a-1.png';
import suiteA3 from '@/assets/suite-a-3.png';
import suiteB from '@/assets/suite-b.png';
import suiteC from '@/assets/suite-c.png';
import suiteC1 from '@/assets/suite-c-1.png';
import suiteC2 from '@/assets/suite-c-2.png';
import suiteC3 from '@/assets/suite-c-3.png';
import suiteC4 from '@/assets/suite-c-4.png';
import appart from '@/assets/appart.png';

const Rooms = () => {
  const { t } = useLanguage();

  const rooms = [
    {
      images: [suiteA, suiteA1, suiteA3],
      title: 'Suite A',
      subtitle: t('rooms.suiteA.subtitle'),
      description: t('rooms.suiteA.description'),
      size: '64',
      balconySize: '7',
      capacity: 7,
      beds: t('rooms.suiteA.beds'),
      pricing: [
        { persons: 1, highSeason: '485,50', midSeason: '390,40', lowSeason: '631,60' },
        { persons: 2, highSeason: '572,00', midSeason: '461,60', lowSeason: '743,10' },
        { persons: 3, highSeason: '672,00', midSeason: '543,60', lowSeason: '870,00' },
        { persons: 4, highSeason: '772,00', midSeason: '625,60', lowSeason: '996,90' },
        { persons: 5, highSeason: '872,00', midSeason: '707,60', lowSeason: '1.123,80' },
        { persons: 6, highSeason: '972,00', midSeason: '789,60', lowSeason: '1.250,70' },
        { persons: 7, highSeason: '1.072,00', midSeason: '871,60', lowSeason: '1.377,60' },
      ],
    },
    {
      images: [suiteB],
      title: 'Suite B',
      subtitle: t('rooms.suiteB.subtitle'),
      description: t('rooms.suiteB.description'),
      size: '59',
      balconySize: '7',
      capacity: 5,
      beds: t('rooms.suiteB.beds'),
      pricing: [
        { persons: 1, highSeason: '416,50', midSeason: '335,20', lowSeason: '542,00' },
        { persons: 2, highSeason: '500,00', midSeason: '404,00', lowSeason: '650,00' },
        { persons: 3, highSeason: '600,00', midSeason: '486,00', lowSeason: '776,90' },
        { persons: 4, highSeason: '700,00', midSeason: '568,00', lowSeason: '1.076,00' },
        { persons: 5, highSeason: '800,00', midSeason: '650,00', lowSeason: '1.030,70' },
      ],
    },
    {
      images: [suiteC, suiteC1, suiteC2, suiteC3, suiteC4],
      title: 'Suite C',
      subtitle: t('rooms.suiteC.subtitle'),
      description: t('rooms.suiteC.description'),
      size: '58',
      balconySize: '10',
      capacity: 4,
      beds: t('rooms.suiteC.beds'),
      pricing: [
        { persons: 1, highSeason: '535,00', midSeason: '430,00', lowSeason: '696,00' },
        { persons: 2, highSeason: '620,00', midSeason: '500,00', lowSeason: '804,00' },
        { persons: 3, highSeason: '724,50', midSeason: '585,60', lowSeason: '940,00' },
        { persons: 4, highSeason: '829,00', midSeason: '671,20', lowSeason: '1.076,00' },
      ],
    },
    {
      images: [appart],
      title: 'Appartement',
      subtitle: t('rooms.apartment.subtitle'),
      description: t('rooms.apartment.description'),
      size: '42',
      balconySize: '4-6',
      capacity: 5,
      beds: t('rooms.apartment.beds'),
      pricing: [
        { persons: 1, highSeason: '361,00', midSeason: '290,80', lowSeason: '469,20' },
        { persons: 2, highSeason: '429,50', midSeason: '347,60', lowSeason: '556,20' },
        { persons: 3, highSeason: '529,50', midSeason: '429,60', lowSeason: '683,10' },
        { persons: 4, highSeason: '629,50', midSeason: '511,60', lowSeason: '810,00' },
        { persons: 5, highSeason: '729,50', midSeason: '593,60', lowSeason: '936,90' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 glass rounded-full">
            <Home className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider uppercase">Nos Hébergements Premium</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 sm:mb-8 leading-tight">
            {t('rooms.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed mb-10">
            {t('rooms.subtitle')}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
            {[
              { icon: Home, label: '4 types', sublabel: 'de logements' },
              { icon: Users, label: '1-7', sublabel: 'personnes' },
              { icon: Maximize2, label: '42-64m²', sublabel: 'superficie' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 px-5 py-3 bg-card border-2 border-border rounded-xl hover-lift"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms Grid with Enhanced Spacing */}
        <div className="space-y-12 max-w-7xl mx-auto">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Room number badge with enhanced animation */}
              <div className="absolute -top-4 -left-4 z-20 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                {index + 1}
              </div>
              <RoomDetailCard {...room} />
            </div>
          ))}
        </div>

        {/* Enhanced Additional Information */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-card to-muted/20 border-2 border-primary/20 rounded-2xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Bed className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {t('rooms.additionalInfo.title')}
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 text-base">
                {[
                  t('prices.terms.ttc'),
                  t('prices.terms.baby'),
                  t('prices.terms.discounts'),
                  t('prices.terms.longStay'),
                ].map((term, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-background/50 rounded-xl hover:bg-background transition-colors"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-block p-10 sm:p-12 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à Réserver ?
            </h3>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Réservez dès maintenant votre logement idéal pour un séjour mémorable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="group w-full sm:w-auto">
                <Button size="xl" variant="secondary" className="w-full sm:w-auto hover:scale-105 transition-transform">
                  Réserver Maintenant
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact" className="group w-full sm:w-auto">
                <Button size="xl" variant="hero" className="w-full sm:w-auto hover:scale-105 transition-transform">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
