-- Ensure media table exists (for cinematic assets library)
CREATE TABLE IF NOT EXISTS public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  storage_path text NOT NULL,
  size_bytes bigint,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Ensure contact_submissions table exists (unifying contact_messages/submissions)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  service text,
  message text NOT NULL,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for media
DROP POLICY IF EXISTS "Allow public read" ON public.media;
CREATE POLICY "Allow public read" ON public.media FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin all" ON public.media;
CREATE POLICY "Allow admin all" ON public.media FOR ALL TO authenticated
USING (public.has_role('admin', auth.uid())) WITH CHECK (public.has_role('admin', auth.uid()));

-- Policies for contact_submissions
DROP POLICY IF EXISTS "Anyone can submit" ON public.contact_submissions;
CREATE POLICY "Anyone can submit" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins read submissions" ON public.contact_submissions;
CREATE POLICY "Admins read submissions" ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.has_role('admin', auth.uid()));
DROP POLICY IF EXISTS "Admins delete submissions" ON public.contact_submissions;
CREATE POLICY "Admins delete submissions" ON public.contact_submissions FOR DELETE TO authenticated
  USING (public.has_role('admin', auth.uid()));

-- Seed initial records for Global Configs to prevent empty state in Admin
INSERT INTO public.seo_configs (page_path, title, description)
VALUES
('/', 'TrustOn | Own the Ground. Build the Legacy.', 'Lucknow''s premier real estate development firm.'),
('/about', 'About Us | TrustOn', 'Learn about our vision and legacy.'),
('/contact', 'Contact | TrustOn', 'Get in touch with our team.')
ON CONFLICT (page_path) DO NOTHING;

INSERT INTO public.footer_configs (section_key, data)
VALUES
('contact', '{"phone": "+91 96160-61166", "email": "info@truston.com", "address": "Lucknow, India"}'),
('social', '{"facebook": "#", "instagram": "#", "linkedin": "#"}')
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO public.navbar_links (label, "to", order_index)
VALUES
('About Us', '/about', 1),
('Projects', '/projects', 2),
('Services', '/services', 3),
('Contact', '/contact', 4)
ON CONFLICT DO NOTHING;

-- Seed initial site content if not present
INSERT INTO public.site_content (key, label, data)
VALUES
('home.hero', 'Home — Hero', '{"eyebrow":"WHO WE ARE","title":"Shaping Legacies","title_accent":"in Stone & Light","subtitle":"Luxury redefined.","button_text":"Enquire Now","button_link":"/contact"}'),
('home.stats', 'Home — Stats', '{"projects":"12+","investors":"500+","experience":"15Y"}')
ON CONFLICT (key) DO NOTHING;
