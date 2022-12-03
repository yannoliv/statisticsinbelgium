import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://undnlrhialcosloiluiz.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZG5scmhpYWxjb3Nsb2lsdWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0Njc2NzMsImV4cCI6MTk4NTA0MzY3M30.wUJWkxV7ukb2rIhBFoHgbmGJVKzrHURpvbGuF3vsMb0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)