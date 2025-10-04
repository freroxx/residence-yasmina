import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Prices = () => {
  const { t } = useLanguage();

  const pricingData = [
    {
      season: t('prices.season.high'),
      period: 'Juillet - Août',
      rooms: {
        standard: '600 MAD',
        deluxe: '800 MAD',
        suite: '1200 MAD',
      },
    },
    {
      season: t('prices.season.mid'),
      period: 'Avril - Juin, Septembre',
      rooms: {
        standard: '450 MAD',
        deluxe: '600 MAD',
        suite: '900 MAD',
      },
    },
    {
      season: t('prices.season.low'),
      period: 'Octobre - Mars',
      rooms: {
        standard: '350 MAD',
        deluxe: '500 MAD',
        suite: '750 MAD',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-serif text-foreground mb-4">
            {t('prices.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('prices.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingData.map((pricing, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center bg-primary/5">
                <CardTitle className="text-2xl font-serif text-primary">
                  {pricing.season}
                </CardTitle>
                <CardDescription>{pricing.period}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">{t('rooms.standard.title')}</span>
                    <span className="text-lg font-bold text-primary">
                      {pricing.rooms.standard}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">{t('rooms.deluxe.title')}</span>
                    <span className="text-lg font-bold text-primary">
                      {pricing.rooms.deluxe}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('rooms.suite.title')}</span>
                    <span className="text-lg font-bold text-primary">
                      {pricing.rooms.suite}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  / {t('prices.night')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;
