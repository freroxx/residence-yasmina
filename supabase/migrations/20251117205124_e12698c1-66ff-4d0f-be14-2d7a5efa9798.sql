-- Refresh types by adding a comment to the profiles table
COMMENT ON TABLE public.profiles IS 'User profile information including full name, description, and avatar';

-- Ensure the profiles table has proper structure
COMMENT ON COLUMN public.profiles.user_id IS 'Reference to auth.users';
COMMENT ON COLUMN public.profiles.full_name IS 'User full name';
COMMENT ON COLUMN public.profiles.description IS 'User bio/description';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL to user avatar image';
