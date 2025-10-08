import { useLanguage } from '@/contexts/LanguageContext';
import RoomDetailCard from '@/components/RoomDetailCard';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide">Nos Hébergements</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-4 sm:mb-6">
            {t('rooms.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {t('rooms.subtitle')}
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="space-y-8 max-w-7xl mx-auto">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RoomDetailCard {...room} />
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('rooms.additionalInfo.title')}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{t('prices.terms.ttc')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{t('prices.terms.baby')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{t('prices.terms.discounts')}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{t('prices.terms.longStay')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
