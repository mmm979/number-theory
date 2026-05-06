'use server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteProblem(problemId: string, password: string) {
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'パスワードが違います' }
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabaseAdmin.from('problems').delete().eq('id', problemId)
  if (error) return { error: error.message }

  revalidatePath('/')
  redirect('/')
}
