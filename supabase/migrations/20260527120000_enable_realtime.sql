-- Enable realtime for all CMS tables
DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('hero_sections', 'gallery', 'testimonials', 'services', 'projects', 'plots', 'articles', 'seo_configs', 'navbar_links', 'footer_configs', 'site_content')
    LOOP
        EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    EXCEPTION
        WHEN others THEN
            -- In case it's already added or publication doesn't exist
            NULL;
    END LOOP;
END $$;
