import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe, User, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/rooms', label: t('nav.rooms') },
    { path: '/booking', label: t('nav.booking') },
    { path: '/prices', label: t('nav.prices') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-primary/98 backdrop-blur-xl shadow-2xl' 
          : 'bg-primary shadow-lg'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="text-xl lg:text-2xl font-bold font-serif text-primary-foreground tracking-wide group-hover:tracking-wider transition-all duration-300">
                Résidence Yasmina
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-primary-foreground/5 rounded-full px-2 py-1 border border-primary-foreground/10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary-foreground shadow-md'
                      : 'text-primary-foreground hover:text-accent hover:bg-primary-foreground/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 h-9 px-3"
            >
              <Globe className="h-4 w-4 mr-1.5" />
              <span className="font-semibold text-sm">{language.toUpperCase()}</span>
            </Button>

            {/* Auth - Desktop */}
            {user ? (
              <Link to="/profile" className="hidden lg:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10 h-9"
                >
                  <User className="h-4 w-4 mr-1.5" />
                  {t('nav.profile')}
                </Button>
              </Link>
            ) : (
              <Link to="/auth" className="hidden lg:block">
                <Button
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 h-9 font-semibold shadow-lg"
                >
                  {t('nav.login')}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-3 rotate-45' : 'top-1'}`} />
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-primary-foreground/20">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3.5 text-base font-medium transition-all duration-300 rounded-xl mx-2 ${
                    location.pathname === link.path
                      ? 'bg-primary-foreground text-primary shadow-lg'
                      : 'text-primary-foreground hover:bg-primary-foreground/10'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <ChevronDown className="ml-auto h-4 w-4 rotate-[-90deg]" />
                  )}
                </Link>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-primary-foreground/20 px-2">
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3.5 text-base font-medium text-primary-foreground hover:bg-primary-foreground/10 rounded-xl transition-all"
                >
                  <User className="h-5 w-5 mr-3" />
                  {t('nav.profile')}
                </Link>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base font-semibold">
                    {t('nav.login')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
