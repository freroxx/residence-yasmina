import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif mb-3 sm:mb-4">Résidence Yasmina</h3>
            <p className="text-xs sm:text-sm opacity-90 mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-xs sm:text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-xs sm:text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.rooms')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-xs sm:text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs sm:text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-xs sm:text-sm opacity-90">
              <li className="flex items-start space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-1" />
                <span>Rue de la Jeunesse<br />80000 Agadir, Maroc</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <a href="tel:+212528843131" className="hover:text-primary-foreground/80 transition-colors">
                    +212 528 84 31 31
                  </a>
                  <a href="tel:+212528842660" className="hover:text-primary-foreground/80 transition-colors">
                    +212 528 84 26 60
                  </a>
                  <a href="tel:+212528842565" className="hover:text-primary-foreground/80 transition-colors">
                    +212 528 84 25 65
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <a href="mailto:ReservationYasmina@gmail.com" className="hover:text-primary-foreground/80 transition-colors break-all">
                  ReservationYasmina@gmail.com
                </a>
              </li>
            </ul>
            
            <div className="mt-4 sm:mt-6">
              <h5 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">{t('footer.follow')}</h5>
              <div className="flex space-x-3 sm:space-x-4">
                <a 
                  href="https://www.facebook.com/ResidenceYasmina/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity" 
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/residenceyasmina/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity" 
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary-foreground/20 text-center text-xs sm:text-sm opacity-75">
          <p>© {new Date().getFullYear()} Résidence Yasmina. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
