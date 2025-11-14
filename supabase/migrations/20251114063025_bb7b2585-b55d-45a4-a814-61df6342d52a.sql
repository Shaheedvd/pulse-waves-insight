-- Add 'customer' role to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'customer';

-- Create a table to store additional customer information
CREATE TABLE IF NOT EXISTS public.customer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name text,
  industry text,
  phone text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on customer_profiles
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- Admins and superusers can view all customer profiles
CREATE POLICY "Admins can view all customer profiles"
ON public.customer_profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superuser'::app_role));

-- Admins and superusers can insert customer profiles
CREATE POLICY "Admins can insert customer profiles"
ON public.customer_profiles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superuser'::app_role));

-- Admins and superusers can update customer profiles
CREATE POLICY "Admins can update customer profiles"
ON public.customer_profiles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superuser'::app_role));

-- Admins and superusers can delete customer profiles
CREATE POLICY "Admins can delete customer profiles"
ON public.customer_profiles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'superuser'::app_role));

-- Customers can view their own profile
CREATE POLICY "Customers can view own profile"
ON public.customer_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_customer_profiles_updated_at
BEFORE UPDATE ON public.customer_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();