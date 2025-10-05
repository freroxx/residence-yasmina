import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.rooms': 'Logements',
    'nav.booking': 'Réservation',
    'nav.prices': 'Tarifs',
    'nav.gallery': 'Galerie',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Résidence Yasmina Agadir',
    'hero.subtitle': 'Appartements meublés avec piscine au centre de la ville d\'Agadir',
    'hero.cta': 'Réserver Maintenant',
    
    // Home
    'home.welcome': 'Bienvenue à la Résidence Yasmina',
    'home.description': 'La résidence est recommandée aux familles, soit pour des courts et longs séjours, en quête de vacances en liberté et tranquillité. La clientèle est en majorité des retraités longs séjours en hiver et plutôt jeunes en été.',
    'home.highlight': 'La Résidence Yasmina détient l\'un des taux de retour les plus élevés de la destination, et nous en sommes très fiers.',
    'home.features.title': 'Nos Équipements',
    'home.features.pool': 'Piscine',
    'home.features.wifi': 'WiFi Gratuit',
    'home.features.parking': 'Parking',
    'home.features.kitchen': 'Cuisine Équipée',
    
    // Rooms
    'rooms.title': 'Nos Logements',
    'rooms.subtitle': 'Choisissez l\'hébergement qui vous convient',
    'rooms.standard.title': 'Chambre Standard',
    'rooms.standard.desc': 'Chambre confortable avec lits jumeaux, idéale pour 2 personnes',
    'rooms.deluxe.title': 'Chambre Deluxe',
    'rooms.deluxe.desc': 'Chambre spacieuse avec lit double et équipements premium',
    'rooms.suite.title': 'Appartement Suite',
    'rooms.suite.desc': 'Appartement complet avec salon, cuisine et chambres séparées',
    'rooms.amenities': 'Équipements',
    'rooms.capacity': 'Capacité',
    'rooms.persons': 'personnes',
    'rooms.amenity.ac': 'Climatisation',
    'rooms.amenity.bathroom': 'Salle de bain',
    'rooms.amenity.balcony': 'Balcon',
    'rooms.amenity.kitchen': 'Cuisine équipée',
    'rooms.amenity.living': 'Salon',
    
    // Booking
    'booking.title': 'Réservation',
    'booking.checkin': 'Date d\'arrivée',
    'booking.checkout': 'Date de départ',
    'booking.guests': 'Nombre de personnes',
    'booking.name': 'Nom complet',
    'booking.email': 'Email',
    'booking.phone': 'Téléphone',
    'booking.message': 'Message (optionnel)',
    'booking.submit': 'Envoyer la demande',
    'booking.success': 'Demande envoyée avec succès!',
    
    // Prices
    'prices.title': 'Tarifs & Disponibilités',
    'prices.subtitle': 'Nos prix varient selon la saison',
    'prices.night': 'nuit',
    'prices.season.high': 'Haute Saison',
    'prices.season.mid': 'Moyenne Saison',
    'prices.season.low': 'Basse Saison',
    
    // Gallery
    'gallery.title': 'Galerie Photos',
    'gallery.subtitle': 'Découvrez notre résidence',
    'gallery.aerial': 'Vue aérienne de la résidence',
    'gallery.pool': 'Piscine avec parasols',
    'gallery.poolArea': 'Espace piscine et détente',
    'gallery.bedroom': 'Chambre avec lits jumeaux',
    'gallery.standardRoom': 'Chambre standard',
    'gallery.livingRoom': 'Salon confortable',
    'gallery.apartment': 'Appartement avec coin cuisine',
    'gallery.garden': 'Jardin tropical',
    'gallery.tennis': 'Court de tennis et jardins',
    'gallery.view': 'Vue depuis le balcon',
    
    // About
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Votre séjour à Agadir',
    'about.text1': 'La Résidence Yasmina est située au cœur d\'Agadir, offrant un accès facile à toutes les commodités de la ville tout en maintenant une atmosphère paisible et accueillante.',
    'about.text2': 'Nos appartements meublés sont parfaits pour les familles et les voyageurs à la recherche de confort et d\'indépendance pendant leur séjour.',
    'about.location': 'Emplacement',
    'about.location.desc': 'Centre-ville d\'Agadir, à proximité des plages, restaurants et attractions',
    
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Nous sommes là pour vous aider',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.subject': 'Sujet',
    'contact.form.send': 'Envoyer',
    
    // Footer
    'footer.description': 'Appartements meublés avec piscine au centre d\'Agadir',
    'footer.links': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.follow': 'Suivez-nous',
    'footer.rights': 'Tous droits réservés',
    'footer.legal': 'Mentions Légales',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.rooms': 'Accommodations',
    'nav.booking': 'Booking',
    'nav.prices': 'Prices',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Résidence Yasmina Agadir',
    'hero.subtitle': 'Furnished apartments with pool in the heart of Agadir',
    'hero.cta': 'Book Now',
    
    // Home
    'home.welcome': 'Welcome to Résidence Yasmina',
    'home.description': 'The residence is recommended for families, for short and long stays, seeking vacations in freedom and tranquility. Our clientele is mainly retirees for long winter stays and younger guests in summer.',
    'home.highlight': 'Résidence Yasmina has one of the highest return rates in the destination, and we are very proud of it.',
    'home.features.title': 'Our Amenities',
    'home.features.pool': 'Swimming Pool',
    'home.features.wifi': 'Free WiFi',
    'home.features.parking': 'Parking',
    'home.features.kitchen': 'Equipped Kitchen',
    
    // Rooms
    'rooms.title': 'Our Accommodations',
    'rooms.subtitle': 'Choose the accommodation that suits you',
    'rooms.standard.title': 'Standard Room',
    'rooms.standard.desc': 'Comfortable room with twin beds, ideal for 2 people',
    'rooms.deluxe.title': 'Deluxe Room',
    'rooms.deluxe.desc': 'Spacious room with double bed and premium amenities',
    'rooms.suite.title': 'Suite Apartment',
    'rooms.suite.desc': 'Complete apartment with living room, kitchen and separate bedrooms',
    'rooms.amenities': 'Amenities',
    'rooms.capacity': 'Capacity',
    'rooms.persons': 'persons',
    'rooms.amenity.ac': 'Air Conditioning',
    'rooms.amenity.bathroom': 'Bathroom',
    'rooms.amenity.balcony': 'Balcony',
    'rooms.amenity.kitchen': 'Equipped Kitchen',
    'rooms.amenity.living': 'Living Room',
    
    // Booking
    'booking.title': 'Booking',
    'booking.checkin': 'Check-in Date',
    'booking.checkout': 'Check-out Date',
    'booking.guests': 'Number of Guests',
    'booking.name': 'Full Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.message': 'Message (optional)',
    'booking.submit': 'Send Request',
    'booking.success': 'Request sent successfully!',
    
    // Prices
    'prices.title': 'Prices & Availability',
    'prices.subtitle': 'Our prices vary by season',
    'prices.night': 'night',
    'prices.season.high': 'High Season',
    'prices.season.mid': 'Mid Season',
    'prices.season.low': 'Low Season',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Discover our residence',
    'gallery.aerial': 'Aerial view of the residence',
    'gallery.pool': 'Pool with umbrellas',
    'gallery.poolArea': 'Pool and relaxation area',
    'gallery.bedroom': 'Twin bedroom',
    'gallery.standardRoom': 'Standard room',
    'gallery.livingRoom': 'Comfortable living room',
    'gallery.apartment': 'Apartment with kitchenette',
    'gallery.garden': 'Tropical garden',
    'gallery.tennis': 'Tennis court and gardens',
    'gallery.view': 'View from balcony',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Your stay in Agadir',
    'about.text1': 'Résidence Yasmina is located in the heart of Agadir, offering easy access to all city amenities while maintaining a peaceful and welcoming atmosphere.',
    'about.text2': 'Our furnished apartments are perfect for families and travelers seeking comfort and independence during their stay.',
    'about.location': 'Location',
    'about.location.desc': 'Agadir city center, close to beaches, restaurants and attractions',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to help',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.form.title': 'Send us a message',
    'contact.form.subject': 'Subject',
    'contact.form.send': 'Send',
    
    // Footer
    'footer.description': 'Furnished apartments with pool in the center of Agadir',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved',
    'footer.legal': 'Legal Notice',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
