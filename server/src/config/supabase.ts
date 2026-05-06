import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase Environment Variables:');
  console.error('   SUPABASE_URL:', supabaseUrl || '❌ NOT SET');
  console.error('   SUPABASE_SERVICE_KEY:', supabaseServiceKey ? '✅ SET' : '❌ NOT SET');
  console.error('\n📝 Action Required:');
  console.error('   1. Go to Railway Dashboard → Variables tab');
  console.error('   2. Add SUPABASE_URL and SUPABASE_SERVICE_KEY');
  console.error('   3. Get values from: https://supabase.com/dashboard → Settings → API');
  console.error('   4. Use the service_role key (not anon key)\n');
  throw new Error('Missing Supabase environment variables. Add them in Railway Dashboard.');
}

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test connection (non-blocking)
export const testConnection = async (): Promise<void> => {
  try {
    // Simple health check - just verify the client is configured
    if (supabase) {
      console.log('✅ Supabase client initialized');
      console.log('📍 Supabase URL:', supabaseUrl);
      
      // Try a simple query with timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      );
      
      const queryPromise = supabase.from('contacts').select('count', { count: 'exact', head: true });
      
      const { error } = await Promise.race([queryPromise, timeoutPromise]) as any;
      
      if (error) {
        console.warn('⚠️  Supabase query test failed:', error.message);
        console.log('💡 This is non-critical. Server will continue to start.');
      } else {
        console.log('✅ Supabase connection verified');
      }
    }
  } catch (error) {
    console.warn('⚠️  Supabase connection test failed:', error instanceof Error ? error.message : 'Unknown error');
    console.log('💡 This is non-critical. Server will continue to start.');
    console.log('💡 Make sure your Supabase tables exist and RLS policies are configured.');
  }
};
