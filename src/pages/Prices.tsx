import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Prices = () => {
  const { t } = useLanguage();

  const summerPricing = {
    period: '01/07 - 31/08',
    appartement: [
      { persons: 1, base: '666.00', summer: '469.20' },
      { persons: 2, base: '786.00', summer: '556.20' },
      { persons: 3, base: '963.00', summer: '683.10' },
      { persons: 4, base: '1 140.00', summer: '810.00' },
      { persons: 5, base: '1 317.00', summer: '936.90' },
    ],
    suiteA: [
      { persons: 1, base: '898.00', summer: '631.60' },
      { persons: 2, base: '1 053.00', summer: '743.10' },
      { persons: 3, base: '1 230.00', summer: '870.00' },
      { persons: 4, base: '1 407.00', summer: '996.90' },
      { persons: 5, base: '1 584.00', summer: '1 123.80' },
      { persons: 6, base: '1 761.00', summer: '1 250.70' },
      { persons: 7, base: '1 938.00', summer: '1 377.60' },
    ],
    suiteB: [
      { persons: 1, base: '770.00', summer: '542.00' },
      { persons: 2, base: '920.00', summer: '650.00' },
      { persons: 3, base: '1 097.00', summer: '776.90' },
      { persons: 4, base: '1 520.00', summer: '1 076.00' },
      { persons: 5, base: '1 451.00', summer: '1 030.70' },
      { persons: 6, base: '1 628.00', summer: '1 157.60' },
    ],
    suiteC: [
      { persons: 1, base: '990.00', summer: '696.00' },
      { persons: 2, base: '1 140.00', summer: '804.00' },
      { persons: 3, base: '1 330.00', summer: '940.00' },
      { persons: 4, base: '1 520.00', summer: '1 076.00' },
    ],
  };

  const winterPricing = {
    periods: ['18/12 - 16/04', '17/04 - 30/06', '01/09 - 17/12'],
    appartement: [
      { persons: 1, rates: ['478.00', '361.00', '290.80'] },
      { persons: 2, rates: ['566.00', '429.50', '347.00'] },
      { persons: 3, rates: ['696.00', '529.50', '429.60'] },
      { persons: 4, rates: ['826.00', '629.50', '511.60'] },
      { persons: 5, rates: ['956.00', '729.50', '593.60'] },
    ],
    suiteA: [
      { persons: 1, rates: ['644.00', '485.50', '390.40'] },
      { persons: 2, rates: ['756.00', '572.00', '461.60'] },
      { persons: 3, rates: ['896.00', '672.00', '543.60'] },
      { persons: 4, rates: ['1 016.00', '772.00', '625.60'] },
      { persons: 5, rates: ['1 146.00', '872.00', '707.60'] },
      { persons: 6, rates: ['1 276.00', '972.00', '789.60'] },
      { persons: 7, rates: ['1 400.00', '1 072.00', '871.60'] },
    ],
    suiteB: [
      { persons: 1, rates: ['552.00', '416.50', '335.20'] },
      { persons: 2, rates: ['660.00', '500.00', '404.00'] },
      { persons: 3, rates: ['790.00', '600.00', '486.00'] },
      { persons: 4, rates: ['920.00', '700.00', '568.00'] },
      { persons: 5, rates: ['1 050.00', '800.00', '650.00'] },
    ],
    suiteC: [
      { persons: 1, rates: ['710.00', '535.00', '430.00'] },
      { persons: 2, rates: ['820.00', '620.00', '500.00'] },
      { persons: 3, rates: ['956.00', '724.50', '585.60'] },
      { persons: 4, rates: ['1 092.00', '829.00', '671.20'] },
    ],
  };

  const renderPricingTable = (data: any[], type: 'summer' | 'winter', periodIndex?: number) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary/5">
            <th className="border p-3 text-left font-semibold">{t('prices.persons')}</th>
            <th className="border p-3 text-right font-semibold">{t('prices.basePrice')}</th>
            {type === 'summer' && (
              <th className="border p-3 text-right font-semibold">{t('prices.summerPrice')}</th>
            )}
            {type === 'winter' && periodIndex !== undefined && (
              <th className="border p-3 text-right font-semibold">{t('prices.price')}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-muted/50">
              <td className="border p-3">{item.persons} {t('prices.person')}</td>
              {type === 'summer' ? (
                <>
                  <td className="border p-3 text-right font-medium">{item.base} DH</td>
                  <td className="border p-3 text-right font-bold text-primary">{item.summer} DH</td>
                </>
              ) : (
                <>
                  <td className="border p-3 text-right font-medium">-</td>
                  <td className="border p-3 text-right font-bold text-primary">
                    {item.rates[periodIndex!]} DH
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            {t('prices.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4">
            {t('prices.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground italic">
            {t('prices.note')}
          </p>
        </div>

        <Tabs defaultValue="summer" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="summer">{t('prices.summerRates')}</TabsTrigger>
            <TabsTrigger value="winter">{t('prices.winterRates')}</TabsTrigger>
          </TabsList>

          <TabsContent value="summer" className="space-y-8">
            <Card>
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-center text-xl sm:text-2xl">
                  {t('prices.summerPeriod')}: {summerPricing.period}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.apartment')}</h3>
                  {renderPricingTable(summerPricing.appartement, 'summer')}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.suiteA')}</h3>
                  {renderPricingTable(summerPricing.suiteA, 'summer')}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.suiteB')}</h3>
                  {renderPricingTable(summerPricing.suiteB, 'summer')}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.suiteC')}</h3>
                  {renderPricingTable(summerPricing.suiteC, 'summer')}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="winter" className="space-y-8">
            {winterPricing.periods.map((period, periodIdx) => (
              <Card key={periodIdx}>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-center text-xl sm:text-2xl">
                    {t('prices.period')}: {period}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.apartment')}</h3>
                    {renderPricingTable(winterPricing.appartement, 'winter', periodIdx)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.suiteA')}</h3>
                    {renderPricingTable(winterPricing.suiteA, 'winter', periodIdx)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.suiteB')}</h3>
                    {renderPricingTable(winterPricing.suiteB, 'winter', periodIdx)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-4">{t('prices.suiteC')}</h3>
                    {renderPricingTable(winterPricing.suiteC, 'winter', periodIdx)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8 max-w-4xl mx-auto bg-muted/30 p-4 sm:p-6 rounded-lg">
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• {t('prices.terms.ttc')}</li>
            <li>• {t('prices.terms.baby')}</li>
            <li>• {t('prices.terms.discounts')}</li>
            <li>• {t('prices.terms.longStay')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Prices;
