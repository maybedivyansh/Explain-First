-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a table for public user profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;

CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create 'documents' table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    document_type TEXT,
    language TEXT NOT NULL,
    summary TEXT,
    key_points JSONB, -- Array of {text, type, explanation}
    warnings JSONB,   -- Array of strings
    audio_url TEXT,   -- URL to the TTS audio file
    created_at TIMESTAMPTZ DEFAULT NOW(),
    file_size BIGINT NOT NULL,
    status TEXT DEFAULT 'uploading' CHECK (status IN ('uploading', 'processing', 'complete', 'error'))
);

-- Enable Row Level Security (RLS) on documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Filter out existing policies to avoid errors on re-run
DROP POLICY IF EXISTS "Users can view own documents" ON documents;
DROP POLICY IF EXISTS "Users can insert own documents" ON documents;
DROP POLICY IF EXISTS "Users can update own documents" ON documents;
DROP POLICY IF EXISTS "Users can delete own documents" ON documents;

-- RLS Policies for 'documents'
-- 1. View own documents
CREATE POLICY "Users can view own documents" 
ON documents FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- 2. Insert own documents
CREATE POLICY "Users can insert own documents" 
ON documents FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Update own documents
CREATE POLICY "Users can update own documents" 
ON documents FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- 4. Delete own documents
CREATE POLICY "Users can delete own documents" 
ON documents FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);


-- STORAGE CONFIGURATION
-- Note: Storage buckets are usually created via the Supabase Dashboard, but you can use this SQL if you have the right permissions.
-- If this fails, go to Storage -> Create new bucket -> Name: 'user-documents', Public: false.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-documents', 'user-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
-- Allow users to manage their own folder: user-documents/{user_id}/*

-- Drop existing policies on storage.objects
DROP POLICY IF EXISTS "Give users access to own folder select" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder insert" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder update" ON storage.objects;
DROP POLICY IF EXISTS "Give users access to own folder delete" ON storage.objects;

-- Allow SELECT (Read/Download)
CREATE POLICY "Give users access to own folder select" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'user-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow INSERT (Upload)
CREATE POLICY "Give users access to own folder insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'user-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow UPDATE
CREATE POLICY "Give users access to own folder update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'user-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow DELETE
CREATE POLICY "Give users access to own folder delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'user-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
