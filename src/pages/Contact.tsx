import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', session.user.id)
          .maybeSingle();

        setFormData(prev => ({
          ...prev,
          name: profile?.full_name || '',
          email: session.user.email || '',
        }));
      }
    };

    loadUserData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const contactSchema = z.object({
      name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
      email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
      subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
      message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be less than 2000 characters'),
    });

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      toast({
        title: 'Validation Error',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }
    
    const mailtoLink = `mailto:ReservationYasmina@gmail.com?subject=${encodeURIComponent(result.data.subject)}&body=${encodeURIComponent(
      `Name: ${result.data.name}\nEmail: ${result.data.email}\n\nMessage:\n${result.data.message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 animate-fade-in-up">
          <div className="inline-block px-6 py-3 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-bold text-primary tracking-wide uppercase">Contactez-nous</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-foreground mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <Card className="hover-lift border-2 hover:border-primary/40 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">{t('footer.contact')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:scale-110 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.address')}</h3>
                    <p className="text-muted-foreground">
                      Résidence Yasmina<br />
                      Rue de la Jeunesse<br />
                      80000 Agadir, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:scale-110 transition-all duration-300">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.phone')}</h3>
                    <div className="text-muted-foreground space-y-1">
                      <a href="tel:+212528843131" className="hover:text-primary transition-colors block">
                        +212 528 84 31 31
                      </a>
                      <a href="tel:+212528842660" className="hover:text-primary transition-colors block">
                        +212 528 84 26 60
                      </a>
                      <a href="tel:+212528842565" className="hover:text-primary transition-colors block">
                        +212 528 84 25 65
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl group-hover:scale-110 transition-all duration-300">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('contact.email')}</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:ReservationYasmina@gmail.com" className="hover:text-primary transition-colors">
                        ReservationYasmina@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card className="h-[350px] overflow-hidden hover-lift-lg transition-all duration-500 border-2 hover:border-primary/40 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.2861917677574!2d-9.601156984886!3d30.418405081766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e6c86b8d47%3A0x1a4a5a2c6e9b5e8f!2sR%C3%A9sidence%20Yasmina!5e0!3m2!1sfr!2sma!4v1635000000000!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Résidence Yasmina Location"
              />
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="hover-lift border-2 hover:border-primary/40 transition-all duration-500 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-serif flex items-center gap-3">
                <Mail className="h-7 w-7 text-primary" />
                {t('contact.form.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('booking.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('booking.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('booking.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 group shadow-xl" size="xl">
                  {t('contact.form.send')}
                  <Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-sm text-muted-foreground text-center mt-4">
                  * Ce formulaire ouvrira votre client de messagerie par défaut
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
