-- Fix: Ensure proper admin role assignment for first user
-- If there are no admins but there are users, assign admin to the oldest user
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'::public.app_role FROM auth.users
    ORDER BY created_at ASC
    LIMIT 1
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
