import { useLanguage } from '@/contexts/LanguageContext';
import RoomDetailCard from '@/components/RoomDetailCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Users, Maximize2, ArrowRight, Star, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slower" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-card border border-border rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                Hébergements Premium
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 leading-tight">
              {t('rooms.title')}
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              {t('rooms.subtitle')}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { icon: Home, value: '4', label: 'Types de logements' },
                { icon: Users, value: '1-7', label: 'Personnes' },
                { icon: Maximize2, value: '42-64', label: 'm² superficie' },
                { icon: Star, value: '4.8', label: 'Note moyenne' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-2xl hover-lift group"
                >
                  <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16 max-w-7xl mx-auto">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards] relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Room indicator */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <RoomDetailCard {...room} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-[100px]" />
              
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  {t('rooms.additionalInfo.title')}
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    t('prices.terms.ttc'),
                    t('prices.terms.baby'),
                    t('prices.terms.discounts'),
                    t('prices.terms.longStay'),
                  ].map((term, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 bg-background rounded-xl hover:shadow-md transition-all group"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                      <span className="text-muted-foreground leading-relaxed">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative p-10 sm:p-14 bg-gradient-to-br from-primary via-primary to-primary/90 rounded-[2rem] shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full translate-x-1/4 translate-y-1/4" />
              
              <div className="relative">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  Prêt à Réserver ?
                </h3>
                <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                  Réservez dès maintenant votre logement idéal pour un séjour mémorable
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/booking" className="group">
                    <Button size="xl" variant="secondary" className="w-full sm:w-auto hover:scale-105 transition-transform shadow-xl">
                      Réserver Maintenant
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="group">
                    <Button size="xl" variant="hero" className="w-full sm:w-auto hover:scale-105 transition-transform">
                      Nous Contacter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
