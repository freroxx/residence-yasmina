import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const Booking = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            {t('booking.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-serif mb-2">{t('booking.form.title')}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {t('booking.form.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Google Form Embed */}
            <div className="w-full overflow-hidden rounded-lg border border-border">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfnp64jbdhSWsZqQQciqin96KKwzJQE42nBFpWTEOrGCGDgcQ/viewform?embedded=true"
                width="100%"
                height="1200"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full"
                title="Booking Form"
              >
                {t('booking.loading')}
              </iframe>
            </div>

            {/* Alternative: Open in new tab link */}
            <div className="mt-6 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnp64jbdhSWsZqQQciqin96KKwzJQE42nBFpWTEOrGCGDgcQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                {t('booking.openNewTab')}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
