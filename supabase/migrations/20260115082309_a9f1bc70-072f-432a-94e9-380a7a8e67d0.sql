-- Add image_url column to posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image_url TEXT;