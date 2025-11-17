import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users, Home, Calculator } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface PricingData {
  appartement: { persons: number; rates?: string[]; base?: string; summer?: string }[];
  suiteA: { persons: number; rates?: string[]; base?: string; summer?: string }[];
  suiteB: { persons: number; rates?: string[]; base?: string; summer?: string }[];
  suiteC: { persons: number; rates?: string[]; base?: string; summer?: string }[];
}

interface PriceCalculatorProps {
  summerPricing: PricingData;
  winterPricing: PricingData & { periods: string[] };
}

const PriceCalculator = ({ summerPricing, winterPricing }: PriceCalculatorProps) => {
  const { t, language } = useLanguage();
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [persons, setPersons] = useState<string>('2');
  const [roomType, setRoomType] = useState<string>('appartement');

  const getSeason = (date: Date): { season: 'summer' | 'winter'; periodIndex?: number } => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Summer: 01/07 - 31/08
    if ((month === 7) || (month === 8)) {
      return { season: 'summer' };
    }

    // Winter periods:
    // Period 0: 18/12 - 16/04 (High Season)
    // Period 1: 17/04 - 30/06 (Mid Season)
    // Period 2: 01/09 - 17/12 (Low Season)

    if (month === 9 || month === 10 || month === 11 || (month === 12 && day < 18)) {
      return { season: 'winter', periodIndex: 2 }; // 01/09 - 17/12
    }

    if ((month === 4 && day >= 17) || month === 5 || month === 6) {
      return { season: 'winter', periodIndex: 1 }; // 17/04 - 30/06
    }

    if ((month === 12 && day >= 18) || month === 1 || month === 2 || month === 3 || (month === 4 && day <= 16)) {
      return { season: 'winter', periodIndex: 0 }; // 18/12 - 16/04
    }

    return { season: 'winter', periodIndex: 2 };
  };

  const getMaxPersonsForRoom = (roomKey: string): number => {
    const pricing = summerPricing[roomKey as keyof typeof summerPricing];
    return Math.max(...pricing.map(p => p.persons));
  };

  const calculatePrice = (): { total: number; perNight: number; nights: number; season: string; warning?: string } | null => {
    if (!dateRange.from || !dateRange.to || !persons || !roomType) return null;

    const nights = differenceInDays(dateRange.to, dateRange.from);
    if (nights <= 0) return null;

    const personCount = parseInt(persons);
    const { season, periodIndex } = getSeason(dateRange.from);

    let pricePerWeek = 0;
    let seasonName = '';
    let warning = '';

    // Check if person count exceeds room capacity
    const maxPersons = getMaxPersonsForRoom(roomType);
    if (personCount > maxPersons) {
      warning = t('prices.calculator.exceedsCapacity');
    }

    if (season === 'summer') {
      const pricing = summerPricing[roomType as keyof typeof summerPricing];
      // Find exact match or use the highest capacity if exceeds
      let personPricing = pricing.find(p => p.persons === personCount);
      if (!personPricing && personCount > maxPersons) {
        personPricing = pricing[pricing.length - 1]; // Use max capacity pricing
      }
      
      if (personPricing && personPricing.summer) {
        const cleanedPrice = personPricing.summer.replace(/\s+/g, '').replace(',', '.');
        pricePerWeek = parseFloat(cleanedPrice);
        seasonName = t('prices.calculator.summerSeason');
      }
    } else if (periodIndex !== undefined) {
      const pricingData = winterPricing[roomType as keyof Omit<typeof winterPricing, 'periods'>];
      if (Array.isArray(pricingData)) {
        // Find exact match or use the highest capacity if exceeds
        let personPricing = pricingData.find(p => p.persons === personCount);
        if (!personPricing && personCount > maxPersons) {
          personPricing = pricingData[pricingData.length - 1]; // Use max capacity pricing
        }
        
        if (personPricing && personPricing.rates && personPricing.rates[periodIndex]) {
          const cleanedPrice = personPricing.rates[periodIndex].replace(/\s+/g, '').replace(',', '.');
          pricePerWeek = parseFloat(cleanedPrice);
          const seasonNames = [
            t('prices.calculator.highSeason'),
            t('prices.calculator.midSeason'),
            t('prices.calculator.lowSeason')
          ];
          seasonName = seasonNames[periodIndex];
        }
      }
    }

    if (pricePerWeek === 0 || isNaN(pricePerWeek)) return null;

    const pricePerNight = pricePerWeek / 7;
    const total = pricePerNight * nights;

    return { total, perNight: pricePerNight, nights, season: seasonName, warning };
  };

  const result = calculatePrice();

  return (
    <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator className="w-5 h-5 text-primary" />
          {t('prices.calculator.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-primary" />
            {t('prices.calculator.dates')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd MMM yyyy", { locale: language === 'fr' ? fr : undefined })} -{" "}
                      {format(dateRange.to, "dd MMM yyyy", { locale: language === 'fr' ? fr : undefined })}
                    </>
                  ) : (
                    format(dateRange.from, "dd MMM yyyy", { locale: language === 'fr' ? fr : undefined })
                  )
                ) : (
                  <span>{t('prices.calculator.selectDates')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                numberOfMonths={2}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Room Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            {t('prices.calculator.roomType')}
          </label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appartement">{t('rooms.apartment.title')}</SelectItem>
              <SelectItem value="suiteA">{t('rooms.suiteA.title')}</SelectItem>
              <SelectItem value="suiteB">{t('rooms.suiteB.title')}</SelectItem>
              <SelectItem value="suiteC">{t('rooms.suiteC.title')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Persons Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            {t('prices.calculator.persons')}
          </label>
          <Select value={persons} onValueChange={setPersons}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? t('rooms.pricing.person') : t('rooms.pricing.persons')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-xl border-2 border-primary/20 space-y-4 animate-fade-in">
            {result.warning && (
              <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-xs text-center text-muted-foreground">
                  ⚠️ {result.warning}
                </p>
              </div>
            )}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{result.season}</p>
              <p className="text-sm text-muted-foreground">
                {result.nights} {result.nights === 1 ? t('prices.calculator.night') : t('prices.calculator.nights')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-primary/20">
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {t('prices.calculator.pricePerNight')}
                </p>
                <p className="text-xl font-bold text-primary">
                  {result.perNight.toFixed(2)} DH
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {t('prices.calculator.pricePerWeek')}
                </p>
                <p className="text-xl font-bold text-primary">
                  {(result.perNight * 7).toFixed(2)} DH
                </p>
              </div>
            </div>
            <div className="text-center pt-2">
              <p className="text-sm font-semibold text-foreground mb-2">
                {t('prices.calculator.totalPrice')}
              </p>
              <p className="text-4xl font-bold text-primary mb-1">
                {result.total.toFixed(2)} DH
              </p>
              <p className="text-xs text-muted-foreground">
                {t('prices.calculator.includingTax')}
              </p>
            </div>
            <div className="pt-3">
              <Link to="/booking" className="w-full block">
                <Button className="w-full" size="lg">
                  {t('prices.calculator.bookNow')}
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        {!result && dateRange.from && dateRange.to && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              {t('prices.calculator.selectOptions')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(PriceCalculator);
