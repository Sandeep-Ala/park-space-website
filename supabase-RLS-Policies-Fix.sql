-- =============================================
-- Fix RLS Policies for API Access
-- Run this in Supabase SQL Editor
-- =============================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can create leads" ON leads;

-- Create new policies that allow API access
-- Allow anonymous users to insert leads (for website forms)
CREATE POLICY "Allow anonymous lead creation" ON leads 
FOR INSERT 
WITH CHECK (true);

-- Allow anonymous users to read their own leads (optional)
CREATE POLICY "Allow reading leads" ON leads 
FOR SELECT 
USING (true);

-- For lead_activities table
DROP POLICY IF EXISTS "lead_activities_policy" ON lead_activities;
CREATE POLICY "Allow lead activity creation" ON lead_activities 
FOR INSERT 
WITH CHECK (true);

-- Verify the policies are working
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('leads', 'lead_activities');