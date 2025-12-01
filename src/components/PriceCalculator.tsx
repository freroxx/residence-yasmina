import { useState, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CalendarIcon, Users, Home, Calculator, ChevronDown, Sparkles } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface SummerPricingItem {
  persons: number;
  base: string;
  summer: string;
}

interface WinterPricingItem {
  persons: number;
  rates: string[];
}

interface SummerPricing {
  period: string;
  appartement: SummerPricingItem[];
  suiteA: SummerPricingItem[];
  suiteB: SummerPricingItem[];
  suiteC: SummerPricingItem[];
}

interface WinterPricing {
  periods: string[];
  appartement: WinterPricingItem[];
  suiteA: WinterPricingItem[];
  suiteB: WinterPricingItem[];
  suiteC: WinterPricingItem[];
}

type RoomKey = 'appartement' | 'suiteA' | 'suiteB' | 'suiteC';

interface PriceCalculatorProps {
  summerPricing: SummerPricing;
  winterPricing: WinterPricing;
}

const PriceCalculator = ({ summerPricing, winterPricing }: PriceCalculatorProps) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [persons, setPersons] = useState<string>('2');
  const [roomType, setRoomType] = useState<string>('appartement');

  const getSeason = (date: Date): { season: 'summer' | 'winter'; periodIndex?: number } => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 7) || (month === 8)) {
      return { season: 'summer' };
    }

    if (month === 9 || month === 10 || month === 11 || (month === 12 && day < 18)) {
      return { season: 'winter', periodIndex: 2 };
    }

    if ((month === 4 && day >= 17) || month === 5 || month === 6) {
      return { season: 'winter', periodIndex: 1 };
    }

    if ((month === 12 && day >= 18) || month === 1 || month === 2 || month === 3 || (month === 4 && day <= 16)) {
      return { season: 'winter', periodIndex: 0 };
    }

    return { season: 'winter', periodIndex: 2 };
  };

  const getMaxPersonsForRoom = (roomKey: RoomKey): number => {
    const pricing = summerPricing[roomKey];
    if (!pricing || !Array.isArray(pricing)) return 1;
    return Math.max(...pricing.map(p => p.persons));
  };

  // Dynamic persons list based on selected room
  const maxPersonsForSelectedRoom = useMemo(() => {
    return getMaxPersonsForRoom(roomType as RoomKey);
  }, [roomType, summerPricing]);

  const personsOptions = useMemo(() => {
    return Array.from({ length: maxPersonsForSelectedRoom }, (_, i) => i + 1);
  }, [maxPersonsForSelectedRoom]);

  // Reset persons if exceeds max for new room type
  const handleRoomTypeChange = (newRoomType: string) => {
    setRoomType(newRoomType);
    const newMax = getMaxPersonsForRoom(newRoomType as RoomKey);
    if (parseInt(persons) > newMax) {
      setPersons(newMax.toString());
    }
  };

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/\s+/g, '').replace(',', '.');
    return parseFloat(cleaned);
  };

  const calculatePrice = (): { total: number; perNight: number; pricePerWeek: number; nights: number; season: string; periodDates: string; warning?: string } | null => {
    if (!dateRange.from || !dateRange.to || !persons || !roomType) return null;

    const nights = differenceInDays(dateRange.to, dateRange.from);
    if (nights <= 0) return null;

    const personCount = parseInt(persons);
    const room = roomType as RoomKey;
    const { season, periodIndex } = getSeason(dateRange.from);

    let pricePerNight = 0;
    let seasonName = '';
    let periodDates = '';
    let warning = '';

    const maxPersons = getMaxPersonsForRoom(room);
    if (personCount > maxPersons) {
      warning = t('prices.calculator.exceedsCapacity');
    }

    if (season === 'summer') {
      const pricing = summerPricing[room];
      if (!pricing) return null;
      
      let personPricing = pricing.find(p => p.persons === personCount);
      if (!personPricing && personCount > maxPersons) {
        personPricing = pricing[pricing.length - 1];
      }
      
      if (personPricing?.summer) {
        pricePerNight = parsePrice(personPricing.summer);
        seasonName = t('prices.calculator.summerSeason');
        periodDates = summerPricing.period;
      }
    } else if (periodIndex !== undefined) {
      const pricing = winterPricing[room];
      if (!pricing) return null;
      
      let personPricing = pricing.find(p => p.persons === personCount);
      if (!personPricing && personCount > maxPersons) {
        personPricing = pricing[pricing.length - 1];
      }
      
      if (personPricing?.rates?.[periodIndex]) {
        pricePerNight = parsePrice(personPricing.rates[periodIndex]);
        const seasonNames = [
          t('prices.calculator.highSeason'),
          t('prices.calculator.midSeason'),
          t('prices.calculator.lowSeason')
        ];
        seasonName = seasonNames[periodIndex];
        periodDates = winterPricing.periods[periodIndex];
      }
    }

    if (pricePerNight === 0 || isNaN(pricePerNight)) return null;

    const pricePerWeek = pricePerNight * 7;
    const total = pricePerNight * nights;

    return { total, perNight: pricePerNight, pricePerWeek, nights, season: seasonName, periodDates, warning };
  };

  const result = calculatePrice();

  return (
    <Card className="overflow-hidden border-2 border-primary/30 shadow-2xl bg-gradient-to-br from-card via-card to-muted/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-5 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 hover:from-primary/20 hover:to-primary/20 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-foreground">{t('prices.calculator.title')}</h3>
                  <p className="text-xs text-muted-foreground">{t('prices.calculator.subtitle') || 'Estimez le coût de votre séjour'}</p>
                </div>
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform duration-300",
                isOpen && "rotate-180"
              )} />
            </div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <CardContent className="p-6 space-y-5">
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
                      "w-full justify-start text-left font-normal h-12 border-2 hover:border-primary/50 transition-colors",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
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
              <Select value={roomType} onValueChange={handleRoomTypeChange}>
                <SelectTrigger className="w-full h-12 border-2 hover:border-primary/50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appartement">
                    <div className="flex items-center gap-2">
                      <span>{t('rooms.apartment.title')}</span>
                      <span className="text-xs text-muted-foreground">(max 5 pers.)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="suiteA">
                    <div className="flex items-center gap-2">
                      <span>{t('rooms.suiteA.title')}</span>
                      <span className="text-xs text-muted-foreground">(max 7 pers.)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="suiteB">
                    <div className="flex items-center gap-2">
                      <span>{t('rooms.suiteB.title')}</span>
                      <span className="text-xs text-muted-foreground">(max 6 pers.)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="suiteC">
                    <div className="flex items-center gap-2">
                      <span>{t('rooms.suiteC.title')}</span>
                      <span className="text-xs text-muted-foreground">(max 4 pers.)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Persons Selection - Dynamic based on room */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                {t('prices.calculator.persons')}
              </label>
              <Select value={persons} onValueChange={setPersons}>
                <SelectTrigger className="w-full h-12 border-2 hover:border-primary/50 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {personsOptions.map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? t('rooms.pricing.person') : t('rooms.pricing.persons')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Result Display */}
            {result && (
              <div className="mt-4 p-5 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl border-2 border-primary/30 space-y-4 animate-fade-in shadow-lg">
                {result.warning && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <p className="text-xs text-center text-destructive font-medium">
                      ⚠️ {result.warning}
                    </p>
                  </div>
                )}
                
                <div className="text-center space-y-1 pb-3 border-b border-primary/20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <p className="text-sm font-bold text-primary">{result.season}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{result.periodDates}</p>
                  <p className="text-sm font-medium text-foreground mt-2">
                    {result.nights} {result.nights === 1 ? t('prices.calculator.night') : t('prices.calculator.nights')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-background/50 rounded-xl">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {t('prices.calculator.pricePerNight')}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {result.perNight.toFixed(2)} <span className="text-sm">DH</span>
                    </p>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-xl">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {t('prices.calculator.pricePerWeek')}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {result.pricePerWeek.toFixed(2)} <span className="text-sm">DH</span>
                    </p>
                  </div>
                </div>
                
                <div className="text-center pt-3 pb-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {t('prices.calculator.totalPrice')}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {result.total.toFixed(2)} <span className="text-lg">DH</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('prices.calculator.includingTax')}
                  </p>
                </div>
                
                <Link to="/booking" className="w-full block">
                  <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all" size="lg">
                    {t('prices.calculator.bookNow')}
                  </Button>
                </Link>
              </div>
            )}
            
            {!result && dateRange.from && dateRange.to && (
              <div className="mt-4 p-4 bg-muted/30 rounded-xl text-center border border-border">
                <p className="text-sm text-muted-foreground">
                  {t('prices.calculator.selectOptions')}
                </p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default memo(PriceCalculator);
