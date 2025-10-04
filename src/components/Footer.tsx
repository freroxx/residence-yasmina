import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold font-serif mb-4">Résidence Yasmina</h3>
            <p className="text-sm opacity-90 mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.rooms')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Agadir, Maroc</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+212 XXX-XXXXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@residence-yasmina.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">{t('footer.follow')}</h5>
              <div className="flex space-x-4">
                <a href="#" className="hover:opacity-75 transition-opacity">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-75">
          <p>© {new Date().getFullYear()} Résidence Yasmina. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
