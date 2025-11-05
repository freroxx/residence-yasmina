import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DollarSign, Calendar, Users, Sparkles, ArrowRight, Sun, Snowflake } from 'lucide-react';

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
    <div className="overflow-hidden rounded-xl border-2 border-border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
              <th className="border-b-2 border-border p-4 text-left font-bold text-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  {t('prices.persons')}
                </div>
              </th>
              <th className="border-b-2 border-border p-4 text-right font-bold text-foreground">{t('prices.basePrice')}</th>
              {type === 'summer' && (
                <th className="border-b-2 border-border p-4 text-right font-bold text-primary">
                  <div className="flex items-center justify-end gap-2">
                    <Sun className="w-4 h-4" />
                    {t('prices.summerPrice')}
                  </div>
                </th>
              )}
              {type === 'winter' && periodIndex !== undefined && (
                <th className="border-b-2 border-border p-4 text-right font-bold text-primary">
                  <div className="flex items-center justify-end gap-2">
                    <Snowflake className="w-4 h-4" />
                    {t('prices.price')}
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-muted/30 transition-all duration-300 group">
                <td className="border-b border-border p-4 font-medium group-hover:text-primary transition-colors">
                  {item.persons} {t('prices.person')}
                </td>
                {type === 'summer' ? (
                  <>
                    <td className="border-b border-border p-4 text-right font-medium text-muted-foreground line-through">{item.base} DH</td>
                    <td className="border-b border-border p-4 text-right">
                      <div className="inline-flex items-center gap-2 font-bold text-lg text-primary">
                        {item.summer} DH
                        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-b border-border p-4 text-right font-medium text-muted-foreground">-</td>
                    <td className="border-b border-border p-4 text-right">
                      <div className="inline-flex items-center gap-2 font-bold text-lg text-primary">
                        {item.rates[periodIndex!]} DH
                        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 glass rounded-full hover-scale-sm">
            <DollarSign className="w-5 h-5 text-primary animate-pulse-soft" />
            <span className="text-sm font-bold text-primary tracking-wider uppercase">Tarifs Transparents</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 leading-tight">
            {t('prices.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            {t('prices.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/30 rounded-full">
            <Calendar className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground italic font-medium">
              {t('prices.note')}
            </p>
          </div>
        </div>

        <Tabs defaultValue="summer" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-10 p-2 glass h-auto">
            <TabsTrigger value="summer" className="text-lg py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover-lift">
              <Sun className="w-5 h-5 mr-2" />
              {t('prices.summerRates')}
            </TabsTrigger>
            <TabsTrigger value="winter" className="text-lg py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover-lift">
              <Snowflake className="w-5 h-5 mr-2" />
              {t('prices.winterRates')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summer" className="space-y-8 animate-fade-in">
            <Card className="border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />
              
              <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 relative">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Sun className="w-8 h-8 text-primary animate-pulse-soft" />
                  <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
                    {t('prices.summerPeriod')}
                  </CardTitle>
                </div>
                <p className="text-center text-lg font-semibold text-primary">{summerPricing.period}</p>
              </CardHeader>
              <CardContent className="pt-8 space-y-10 relative">
                <div className="animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{t('prices.apartment')}</h3>
                  </div>
                  {renderPricingTable(summerPricing.appartement, 'summer')}
                </div>
                <div className="animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{t('prices.suiteA')}</h3>
                  </div>
                  {renderPricingTable(summerPricing.suiteA, 'summer')}
                </div>
                <div className="animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{t('prices.suiteB')}</h3>
                  </div>
                  {renderPricingTable(summerPricing.suiteB, 'summer')}
                </div>
                <div className="animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{t('prices.suiteC')}</h3>
                  </div>
                  {renderPricingTable(summerPricing.suiteC, 'summer')}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="winter" className="space-y-8 animate-fade-in">
            {winterPricing.periods.map((period, periodIdx) => (
              <Card key={periodIdx} className="border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden relative animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: `${periodIdx * 100}ms` }}>
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
                
                <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 relative">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Snowflake className="w-8 h-8 text-primary animate-pulse-soft" />
                    <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
                      {t('prices.period')}
                    </CardTitle>
                  </div>
                  <p className="text-center text-lg font-semibold text-primary">{period}</p>
                </CardHeader>
                <CardContent className="pt-8 space-y-10 relative">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">{t('prices.apartment')}</h3>
                    </div>
                    {renderPricingTable(winterPricing.appartement, 'winter', periodIdx)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">{t('prices.suiteA')}</h3>
                    </div>
                    {renderPricingTable(winterPricing.suiteA, 'winter', periodIdx)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">{t('prices.suiteB')}</h3>
                    </div>
                    {renderPricingTable(winterPricing.suiteB, 'winter', periodIdx)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">{t('prices.suiteC')}</h3>
                    </div>
                    {renderPricingTable(winterPricing.suiteC, 'winter', periodIdx)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-card to-muted/20 border-2 border-primary/20 rounded-2xl p-8 sm:p-10 shadow-xl relative overflow-hidden hover-lift">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Conditions Tarifaires</h3>
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
                    className="flex items-start gap-3 p-4 bg-background/50 rounded-xl hover:bg-background transition-all duration-300 hover-scale-sm"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0 animate-pulse-soft" />
                    <span className="text-muted-foreground leading-relaxed">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-10 sm:p-12 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-2xl hover-lift-lg">
            <h3 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à Réserver ?
            </h3>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Réservez dès maintenant au meilleur tarif pour votre séjour
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
                  Questions ? Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
