import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';

interface PricingData {
  persons: number;
  highSeason: string;
  midSeason: string;
  lowSeason: string;
}

interface PricingTableProps {
  pricing: PricingData[];
  title: string;
}

const PricingTable = ({ pricing, title }: PricingTableProps) => {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold mb-3 text-foreground">{title}</h4>
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground">
                {t('rooms.pricing.persons')}
              </TableHead>
              <TableHead className="font-semibold text-orange-600 text-center">
                {t('rooms.pricing.highSeason')}
              </TableHead>
              <TableHead className="font-semibold text-orange-600 text-center">
                {t('rooms.pricing.midSeason')}
              </TableHead>
              <TableHead className="font-semibold text-orange-600 text-center">
                {t('rooms.pricing.lowSeason')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricing.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  {row.persons} {row.persons === 1 ? t('rooms.pricing.person') : t('rooms.pricing.persons')}
                </TableCell>
                <TableCell className="text-center font-semibold text-primary">
                  {row.highSeason}
                </TableCell>
                <TableCell className="text-center font-semibold text-primary">
                  {row.midSeason}
                </TableCell>
                <TableCell className="text-center font-semibold text-primary">
                  {row.lowSeason}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PricingTable;
