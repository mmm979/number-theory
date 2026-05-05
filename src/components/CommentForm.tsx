'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CommentForm({ problemId }: { problemId: string }) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    await supabase.from('comments').insert({ problem_id: problemId, content })
    setContent('')
    setSubmitting(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="コメントを入力（数式は $...$ または $$...$$ で記述できます）"
        className="w-full border border-gray-300 rounded-md p-3 text-sm resize-y min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <button
        type="submit"
        disabled={submitting || !content.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? '送信中...' : 'コメントを送信'}
      </button>
    </form>
  )
}
