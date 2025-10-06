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
    'nav.login': 'Connexion',
    'nav.profile': 'Profil',
    
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
    'booking.form.title': 'Formulaire de Réservation',
    'booking.form.description': 'Remplissez le formulaire ci-dessous pour réserver votre séjour',
    'booking.loading': 'Chargement du formulaire...',
    'booking.openNewTab': 'Ouvrir dans un nouvel onglet',
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
    'prices.persons': 'Nombre de personnes',
    'prices.person': 'Personne',
    'prices.basePrice': 'Prix de base en Dirhams',
    'prices.summerPrice': 'Du 01/07 au 31/08',
    'prices.price': 'Prix',
    'prices.summerRates': 'Tarifs d\'été',
    'prices.winterRates': 'Tarifs d\'hiver',
    'prices.summerPeriod': 'Tarifs d\'été',
    'prices.period': 'Période',
    'prices.apartment': 'Appartement',
    'prices.suiteA': 'Suite "A"',
    'prices.suiteB': 'Suite "B"',
    'prices.suiteC': 'Suite "C"',
    'prices.note': 'Tarifs en TTC',
    'prices.terms.ttc': 'Tarifs en TTC.',
    'prices.terms.baby': 'Location lit bébé à la demande : 38 dhs TTC / jour.',
    'prices.terms.discounts': 'Les réductions sont accordées aux nationaux et étrangers à partir de la 2ème nuit.',
    'prices.terms.longStay': 'Les tarifs avantageux pour les habitués longs séjours et clients fidèles de la résidence sont également disponibles, il suffit de le signaler à la réservation.',
    
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
    'about.surroundings.title': 'Environs de l\'établissement',
    'about.surroundings.subtitle': 'Les clients ont également adoré se promener dans le quartier!',
    'about.surroundings.places': 'Lieux à proximité',
    'about.surroundings.restaurants': 'Restaurants et Cafés',
    'about.surroundings.beaches': 'Plages à proximité',
    'about.surroundings.airport': 'Aéroport',
    
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

    // Auth
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.loginSubtitle': 'Connectez-vous à votre compte',
    'auth.signupSubtitle': 'Créez votre compte',
    'auth.fullName': 'Nom complet',
    'auth.fullNamePlaceholder': 'Votre nom complet',
    'auth.email': 'Email',
    'auth.emailPlaceholder': 'votre@email.com',
    'auth.password': 'Mot de passe',
    'auth.passwordPlaceholder': 'Au moins 6 caractères',
    'auth.loading': 'Chargement...',
    'auth.or': 'ou',
    'auth.continueWithGoogle': 'Continuer avec Google',
    'auth.noAccount': 'Pas de compte ? Inscrivez-vous',
    'auth.hasAccount': 'Déjà un compte ? Connectez-vous',
    'auth.loginSuccess': 'Connexion réussie !',
    'auth.signupSuccess': 'Inscription réussie !',
    'auth.checkEmail': 'Vérifiez votre email pour confirmer votre compte',
    'auth.error': 'Erreur',

    // Profile
    'profile.title': 'Mon Profil',
    'profile.email': 'Adresse email',
    'profile.fullName': 'Nom complet',
    'profile.fullNamePlaceholder': 'Votre nom',
    'profile.description': 'Description',
    'profile.descriptionPlaceholder': 'Parlez-nous de vous...',
    'profile.save': 'Enregistrer',
    'profile.saving': 'Enregistrement...',
    'profile.cancel': 'Annuler',
    'profile.signOut': 'Déconnexion',
    'profile.saveSuccess': 'Profil mis à jour avec succès !',
    'profile.saveError': 'Erreur lors de la mise à jour',
    'profile.loading': 'Chargement...',
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
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    
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
    'booking.form.title': 'Booking Form',
    'booking.form.description': 'Fill out the form below to book your stay',
    'booking.loading': 'Loading form...',
    'booking.openNewTab': 'Open in new tab',
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
    'prices.persons': 'Number of persons',
    'prices.person': 'Person',
    'prices.basePrice': 'Base Price in Dirhams',
    'prices.summerPrice': 'From 01/07 to 31/08',
    'prices.price': 'Price',
    'prices.summerRates': 'Summer Rates',
    'prices.winterRates': 'Winter Rates',
    'prices.summerPeriod': 'Summer Rates',
    'prices.period': 'Period',
    'prices.apartment': 'Apartment',
    'prices.suiteA': 'Suite "A"',
    'prices.suiteB': 'Suite "B"',
    'prices.suiteC': 'Suite "C"',
    'prices.note': 'Prices including all taxes',
    'prices.terms.ttc': 'Prices including all taxes.',
    'prices.terms.baby': 'Baby cot rental on request: 38 dhs including tax / day.',
    'prices.terms.discounts': 'Discounts are granted to nationals and foreigners from the 2nd night.',
    'prices.terms.longStay': 'Advantageous rates for regular long-stay guests and loyal customers of the residence are also available, just mention it when booking.',
    
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
    'about.surroundings.title': 'Surroundings',
    'about.surroundings.subtitle': 'Guests also loved strolling around the neighborhood!',
    'about.surroundings.places': 'Nearby Places',
    'about.surroundings.restaurants': 'Restaurants & Cafés',
    'about.surroundings.beaches': 'Nearby Beaches',
    'about.surroundings.airport': 'Airport',
    
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

    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.loginSubtitle': 'Sign in to your account',
    'auth.signupSubtitle': 'Create your account',
    'auth.fullName': 'Full Name',
    'auth.fullNamePlaceholder': 'Your full name',
    'auth.email': 'Email',
    'auth.emailPlaceholder': 'your@email.com',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'At least 6 characters',
    'auth.loading': 'Loading...',
    'auth.or': 'or',
    'auth.continueWithGoogle': 'Continue with Google',
    'auth.noAccount': 'No account? Sign up',
    'auth.hasAccount': 'Already have an account? Login',
    'auth.loginSuccess': 'Successfully logged in!',
    'auth.signupSuccess': 'Successfully signed up!',
    'auth.checkEmail': 'Check your email to confirm your account',
    'auth.error': 'Error',

    // Profile
    'profile.title': 'My Profile',
    'profile.email': 'Email address',
    'profile.fullName': 'Full Name',
    'profile.fullNamePlaceholder': 'Your name',
    'profile.description': 'Description',
    'profile.descriptionPlaceholder': 'Tell us about yourself...',
    'profile.save': 'Save',
    'profile.saving': 'Saving...',
    'profile.cancel': 'Cancel',
    'profile.signOut': 'Sign Out',
    'profile.saveSuccess': 'Profile updated successfully!',
    'profile.saveError': 'Error updating profile',
    'profile.loading': 'Loading...',
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
