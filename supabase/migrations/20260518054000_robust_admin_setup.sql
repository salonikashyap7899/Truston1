-- Improve the first admin handler to be more robust
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- If no admin exists, make this user an admin
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END $$;

-- Re-create the trigger just in case
DROP TRIGGER IF EXISTS trg_first_admin ON auth.users;
CREATE TRIGGER trg_first_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_first_admin();

-- Function to check if setup is completed (at least one admin exists)
-- This can be called by anyone to determine if they should see the "Create Admin" button
CREATE OR REPLACE FUNCTION public.is_setup_completed()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin');
$$;

-- Grant access to the setup check function
GRANT EXECUTE ON FUNCTION public.is_setup_completed() TO anon, authenticated;

-- Ensure the first user is an admin if they aren't already
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'
    FROM auth.users
    ORDER BY created_at ASC
    LIMIT 1
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
