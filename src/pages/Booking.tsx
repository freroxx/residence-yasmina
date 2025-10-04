import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Booking = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('booking.success'));
    setFormData({
      checkin: '',
      checkout: '',
      guests: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-serif text-foreground mb-4">
            {t('booking.title')}
          </h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">{t('booking.title')}</CardTitle>
            <CardDescription>{t('hero.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkin" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('booking.checkin')}
                  </Label>
                  <Input
                    id="checkin"
                    name="checkin"
                    type="date"
                    value={formData.checkin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('booking.checkout')}
                  </Label>
                  <Input
                    id="checkout"
                    name="checkout"
                    type="date"
                    value={formData.checkout}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">{t('booking.guests')}</Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Personal Info */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="phone">{t('booking.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">{t('booking.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t('booking.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
