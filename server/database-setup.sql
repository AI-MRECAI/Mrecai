-- Product Waitlist Table
-- Run this SQL in your Supabase SQL Editor to create the product_waitlist table

CREATE TABLE IF NOT EXISTS product_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  product VARCHAR(255) NOT NULL DEFAULT 'A.T.L.A.S. ENGINE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email, product)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_product_waitlist_email ON product_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_product_waitlist_created_at ON product_waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE product_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the public form)
CREATE POLICY "Allow public inserts" ON product_waitlist
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reads only for authenticated users (admin)
CREATE POLICY "Allow authenticated reads" ON product_waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
