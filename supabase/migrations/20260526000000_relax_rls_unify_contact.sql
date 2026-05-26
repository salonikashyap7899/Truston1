-- Migration to relax RLS policies and unify contact tables
-- Granting broad admin permissions to any authenticated user as requested

-- Update Site Content policies
DROP POLICY IF EXISTS "Admins write site_content" ON public.site_content;
CREATE POLICY "Authenticated users manage site_content" ON public.site_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Update Media policies
DROP POLICY IF EXISTS "Admins manage media" ON public.media;
CREATE POLICY "Authenticated users manage media" ON public.media
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Ensure contact_submissions has all necessary fields and relax policies
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS service text;

DROP POLICY IF EXISTS "Admins read submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins delete submissions" ON public.contact_submissions;
CREATE POLICY "Authenticated users manage submissions" ON public.contact_submissions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage policies for site-media
DROP POLICY IF EXISTS "Admins upload site-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins update site-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete site-media" ON storage.objects;

CREATE POLICY "Authenticated users upload site-media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media');
CREATE POLICY "Authenticated users update site-media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'site-media');
CREATE POLICY "Authenticated users delete site-media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'site-media');

-- Drop the redundant contact_messages table if it exists
DROP TABLE IF EXISTS public.contact_messages;
