// js/supabase-config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://omuhkqkjwoibsayyvuag.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tdWhrcWtqd29pYnNheXl2dWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NjE0NjMsImV4cCI6MjA4MDIzNzQ2M30.lZgweY5PS3UmF1zJ5ocUuHGmuoyTuVFF_9BS5xw2VXY'

export const supabase = createClient(supabaseUrl, supabaseKey)