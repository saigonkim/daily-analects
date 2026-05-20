import { createClient } from '@supabase/supabase-js';

// Vercel 빌드 타임 에러 방지를 위해 fallback(임시) 문자열 추가
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
