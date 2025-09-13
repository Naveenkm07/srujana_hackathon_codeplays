import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Replace with your actual Supabase project credentials
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

// For demo purposes, we'll use placeholder values
const DEMO_CONFIG = {
  url: 'https://demo-project.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8tcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ1NDc2NjAwLCJleHAiOjE5NjEwNTI2MDB9.demo-key'
}

// Initialize Supabase client
export const supabase = createClient(
  supabaseUrl || DEMO_CONFIG.url,
  supabaseKey || DEMO_CONFIG.key
)

// Configuration instructions:
// 1. Go to https://supabase.com/dashboard
// 2. Create a new project or select existing one
// 3. Go to Settings → API
// 4. Copy the Project URL and anon/public key
// 5. Replace the placeholder values above

export const isDemo = !supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL'
