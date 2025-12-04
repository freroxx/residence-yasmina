import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* About */}
          <div className="animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-4 sm:mb-5">Résidence Yasmina</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary-foreground/50 rounded-full mb-4" />
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in [animation-delay:100ms]">
            <h4 className="text-lg font-semibold mb-4">{t('footer.links')}</h4>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary-foreground/50 rounded-full mb-4" />
            <ul className="space-y-3">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/rooms', label: t('nav.rooms') },
                { to: '/booking', label: t('nav.booking') },
                { to: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm opacity-90 hover:opacity-100 hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="animate-fade-in [animation-delay:200ms]">
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary-foreground/50 rounded-full mb-4" />
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-start space-x-3 group">
                <div className="p-2 bg-primary-foreground/10 rounded-lg group-hover:bg-primary-foreground/20 transition-colors">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                </div>
                <span className="pt-1">Rue de la Jeunesse<br />80000 Agadir, Maroc</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="p-2 bg-primary-foreground/10 rounded-lg group-hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                </div>
                <div className="flex flex-col pt-1">
                  <a href="tel:+212528843131" className="hover:text-accent transition-colors">
                    +212 528 84 31 31
                  </a>
                  <a href="tel:+212528842660" className="hover:text-accent transition-colors">
                    +212 528 84 26 60
                  </a>
                  <a href="tel:+212528842565" className="hover:text-accent transition-colors">
                    +212 528 84 25 65
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="p-2 bg-primary-foreground/10 rounded-lg group-hover:bg-primary-foreground/20 transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                </div>
                <a href="mailto:ReservationYasmina@gmail.com" className="hover:text-accent transition-colors break-all pt-1">
                  ReservationYasmina@gmail.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">{t('footer.follow')}</h5>
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/ResidenceYasmina/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300" 
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/residenceyasmina/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300" 
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Résidence Yasmina. {t('footer.rights')}.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Appart'Hotel de charme à Agadir, Maroc
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
