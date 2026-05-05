import { createClient } from '@supabase/supabase-js'

export type Problem = {
  id: string
  title: string
  description: string
  status: 'unsolved' | 'unclear' | 'solved'
  created_at: string
}

export type Comment = {
  id: string
  problem_id: string
  content: string
  created_at: string
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
