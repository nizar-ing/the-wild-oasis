
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://hbemdlujnloeaagcgkrs.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZW1kbHVqbmxvZWFhZ2Nna3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyOTQ1ODQsImV4cCI6MjAzMzg3MDU4NH0.8ZKRd9U-SBOeA98Iy0PipUdSqBpeJJHa9Fz-gpLw370";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
