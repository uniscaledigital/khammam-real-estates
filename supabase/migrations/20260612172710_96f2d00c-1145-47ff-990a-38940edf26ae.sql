
DROP POLICY IF EXISTS "Anyone can submit requirement" ON public.requirements;
DROP POLICY IF EXISTS "Anyone can contact" ON public.contact_messages;
REVOKE INSERT ON public.requirements FROM anon, authenticated;
REVOKE INSERT ON public.contact_messages FROM anon, authenticated;
