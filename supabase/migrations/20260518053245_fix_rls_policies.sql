-- Fix RLS to allow users to insert their own roles during signup
-- Also ensure the trigger can insert roles with SECURITY DEFINER

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users see own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;

-- Create more permissive initial policy for roles
-- Users can read their own roles
CREATE POLICY "Users can see own roles" ON public.user_roles 
  FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

-- Users can insert their own roles during signup (for first user)
CREATE POLICY "Users can insert own roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can do everything with roles
CREATE POLICY "Admins manage all roles" ON public.user_roles 
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Grant permissions to authenticated role for the insert
GRANT INSERT ON public.user_roles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
