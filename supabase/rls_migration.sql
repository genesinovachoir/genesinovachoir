-- =============================================
-- Genesi Nova Choir — Supabase RLS Migration
-- Supabase Dashboard > SQL Editor'da çalıştır
-- =============================================


-- =============================================
-- 1. contact_messages: sadece anonim INSERT
-- =============================================
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politika zaten varsa sil
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_messages;

CREATE POLICY "anon_insert_contact" ON contact_messages
  FOR INSERT TO anon
  WITH CHECK (
    length(name) <= 200 AND
    length(email) <= 320 AND
    length(message) <= 5000 AND
    email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
  );

-- SELECT / UPDATE / DELETE: sadece service_role erişir
-- (politika tanımlanmamış = erişim yok)


-- =============================================
-- 2. subscribers: sadece anonim INSERT
-- =============================================
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_subscriber" ON subscribers;

CREATE POLICY "anon_insert_subscriber" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (
    email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' AND
    (name IS NULL OR length(name) <= 200)
  );


-- =============================================
-- 3. collab_inquiries: sadece anonim INSERT
-- =============================================
ALTER TABLE collab_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_collab" ON collab_inquiries;

CREATE POLICY "anon_insert_collab" ON collab_inquiries
  FOR INSERT TO anon
  WITH CHECK (
    length(name) <= 200 AND
    length(email) <= 320 AND
    length(message) <= 5000 AND
    email ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' AND
    inquiry_type IN ('invite', 'create', 'sponsor')
  );


-- =============================================
-- 4. choir_members: herkese SELECT (aktif üyeler)
-- =============================================
ALTER TABLE choir_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_members" ON choir_members;

CREATE POLICY "public_read_active_members" ON choir_members
  FOR SELECT TO anon
  USING (is_active = true);


-- =============================================
-- DOĞRULAMA: RLS durumunu kontrol et
-- =============================================
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
