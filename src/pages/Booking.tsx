import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Calendar, Users, Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Booking = () => {
  const { t } = useLanguage();

  const bookingSteps = [
    { icon: Calendar, label: 'Choisissez vos dates', desc: 'Sélectionnez vos dates d\'arrivée et de départ' },
    { icon: Users, label: 'Nombre de personnes', desc: 'Indiquez le nombre de voyageurs' },
    { icon: Mail, label: 'Coordonnées', desc: 'Partagez vos informations de contact' },
    { icon: CheckCircle2, label: 'Confirmation', desc: 'Recevez votre confirmation par email' },
  ];

  const contactMethods = [
    { 
      icon: Phone, 
      title: 'Téléphone', 
      value: '+212 528 84 31 31', 
      desc: 'Plusieurs lignes disponibles',
      action: 'tel:+212528843131',
      additionalNumbers: ['+212 528 84 26 60', '+212 528 84 25 65']
    },
    { 
      icon: Mail, 
      title: 'Email', 
      value: 'ReservationYasmina@gmail.com', 
      desc: 'Réponse rapide',
      action: 'mailto:ReservationYasmina@gmail.com'
    },
    { 
      icon: MapPin, 
      title: 'Adresse', 
      value: 'Rue de la Jeunesse', 
      desc: '80000 Agadir, Maroc',
      action: 'https://maps.google.com/?q=Residence+Yasmina+Agadir'
    },
    { 
      icon: Calendar, 
      title: 'Booking.com', 
      value: 'Réserver en ligne', 
      desc: 'Plateforme sécurisée',
      action: 'https://www.booking.com/hotel/ma/residence-yasmina-agadir.fr.html',
      external: true
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold tracking-wider uppercase">Réservation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 leading-tight">
            {t('booking.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Booking Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16 max-w-6xl mx-auto">
          {bookingSteps.map((step, index) => (
            <Card key={index} className="hover-lift border-2 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="pt-8 pb-8 text-center relative z-10">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-3 px-3 py-1 bg-primary/10 rounded-full inline-block">
                  <span className="text-sm font-bold text-primary">Étape {index + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{step.label}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Booking Form */}
        <Card className="max-w-5xl mx-auto shadow-2xl hover-lift-lg border-2 hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          
          <CardHeader className="text-center bg-gradient-to-br from-primary/5 to-accent/5 relative z-10 border-b">
            <CardTitle className="text-2xl sm:text-3xl font-serif mb-3">
              {t('booking.form.title')}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              {t('booking.form.description')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 p-6 sm:p-8">
            {/* Google Form Embed */}
            <div className="w-full overflow-hidden rounded-xl border-2 border-border hover:border-primary/30 transition-colors duration-300 shadow-lg">
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

            {/* Alternative: Open in new tab */}
            <div className="mt-8 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnp64jbdhSWsZqQQciqin96KKwzJQE42nBFpWTEOrGCGDgcQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  variant="outline" 
                  className="w-full hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <ExternalLink className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  {t('booking.openNewTab')}
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16">
          <div className="text-center mb-10">
            <div className="inline-block px-5 py-2.5 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-bold text-primary tracking-wide uppercase">Besoin d'aide?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">
              Contactez-nous directement
            </h2>
            <p className="text-lg text-muted-foreground">
              Notre équipe est à votre disposition pour toute question
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
                <Card 
                  key={index} 
                  className="hover-lift-lg border-2 hover:border-primary/40 transition-all duration-500 group overflow-hidden relative animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    if (method.action.startsWith('http')) {
                      window.open(method.action, '_blank');
                    } else if (method.action.startsWith('tel:') || method.action.startsWith('mailto:')) {
                      window.location.href = method.action;
                    }
                  }}
                >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="pt-8 pb-8 text-center relative z-10">
                  <div className="inline-flex p-5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-5 group-hover:scale-110 transition-all duration-500">
                    <method.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    {method.value}
                  </p>
                  {method.additionalNumbers && (
                    <div className="text-sm text-muted-foreground space-y-0.5 mb-2">
                      {method.additionalNumbers.map((num: string, idx: number) => (
                        <div key={idx}>{num}</div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    {method.external ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    <span>{method.desc}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <Card className="max-w-4xl mx-auto mt-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-8 pb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Confirmation instantanée</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Votre demande de réservation sera traitée dans les plus brefs délais. 
                  Vous recevrez un email de confirmation avec tous les détails de votre séjour, 
                  les modalités de paiement et les instructions d'arrivée.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
