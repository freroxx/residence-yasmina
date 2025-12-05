import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/rooms', label: t('nav.rooms') },
    { to: '/booking', label: t('nav.booking') },
    { to: '/prices', label: t('nav.prices') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block group">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif mb-2 group-hover:text-accent transition-colors">
                Résidence Yasmina
              </h3>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mt-4 mb-6">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/ResidenceYasmina/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/10 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 group" 
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/residenceyasmina/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/10 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 group" 
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              {t('footer.links')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-background/70 hover:text-accent flex items-center gap-2 group transition-all duration-300"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-background/10 rounded-lg group-hover:bg-accent/20 transition-colors mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-sm text-background/70">
                  <p>Rue de la Jeunesse</p>
                  <p>80000 Agadir, Maroc</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-background/10 rounded-lg group-hover:bg-accent/20 transition-colors mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-sm space-y-1">
                  <a href="tel:+212528843131" className="block text-background/70 hover:text-accent transition-colors">
                    +212 528 84 31 31
                  </a>
                  <a href="tel:+212528842660" className="block text-background/70 hover:text-accent transition-colors">
                    +212 528 84 26 60
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-background/10 rounded-lg group-hover:bg-accent/20 transition-colors mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:ReservationYasmina@gmail.com" className="text-sm text-background/70 hover:text-accent transition-colors break-all">
                  ReservationYasmina@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Book Now CTA */}
          <div className="bg-background/5 rounded-2xl p-6 border border-background/10">
            <h4 className="text-lg font-semibold mb-3">Réservez maintenant</h4>
            <p className="text-sm text-background/70 mb-5">
              Planifiez votre séjour idéal à Agadir
            </p>
            <Link 
              to="/booking"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all hover:gap-3 w-full justify-center"
            >
              Réserver
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a 
              href="https://www.booking.com/hotel/ma/residence-yasmina-agadir.fr.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-5 py-3 bg-background/10 text-background rounded-xl font-medium text-sm hover:bg-background/20 transition-all w-full justify-center"
            >
              Booking.com
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>© {new Date().getFullYear()} Résidence Yasmina. {t('footer.rights')}.</p>
            <p className="text-xs">Appart'Hotel de charme à Agadir, Maroc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
