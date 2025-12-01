import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { z } from 'zod';

interface Profile {
  full_name: string | null;
  description: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>({ full_name: '', description: '', avatar_url: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      await fetchProfile(session.user.id);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('full_name, description, avatar_url')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data as Profile);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validate input
    const profileSchema = z.object({
      full_name: z.string().trim().max(100, 'Name must be less than 100 characters'),
      description: z.string().trim().max(1000, 'Description must be less than 1000 characters'),
    });

    const result = profileSchema.safeParse({
      full_name: profile.full_name || '',
      description: profile.description || '',
    });

    if (!result.success) {
      toast({
        title: 'Validation Error',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          full_name: result.data.full_name,
          description: result.data.description,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: t('profile.saveSuccess') });
    } catch (error: any) {
      toast({
        title: t('profile.saveError'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t('profile.loading')}</div>
      </div>
    );
  }

  const initials = profile.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || user?.email?.[0].toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">{t('profile.title')}</h1>
            <Button variant="outline" onClick={handleSignOut}>
              {t('profile.signOut')}
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">{t('profile.email')}</p>
              <p className="text-lg font-medium text-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('profile.fullName')}</Label>
              <Input
                id="fullName"
                type="text"
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                placeholder={t('profile.fullNamePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('profile.description')}</Label>
              <Textarea
                id="description"
                value={profile.description || ''}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                placeholder={t('profile.descriptionPlaceholder')}
                rows={5}
                className="resize-none"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? t('profile.saving') : t('profile.save')}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                {t('profile.cancel')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;