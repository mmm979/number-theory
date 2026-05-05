'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import MathText from '@/components/MathText'

type Status = 'unsolved' | 'unclear' | 'solved'

export default function SubmitPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Status>('unclear')
  const [submitting, setSubmitting] = useState(false)
  const [preview, setPreview] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return
    setSubmitting(true)
    const { data } = await supabase
      .from('problems')
      .insert({ title, description, status })
      .select('id')
      .single()
    setSubmitting(false)
    if (data) router.push(`/problems/${data.id}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">問題を投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="問題のタイトル"
            required
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">問題文</label>
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="text-xs text-blue-600 hover:underline"
            >
              {preview ? '編集に戻る' : 'プレビュー'}
            </button>
          </div>
          {preview ? (
            <div className="border border-gray-300 rounded-md p-3 min-h-32">
              <MathText>{description}</MathText>
            </div>
          ) : (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="数式は $...$ （インライン）または $$...$$ （ブロック）で記述できます"
              rows={8}
              required
            />
          )}
          <p className="text-xs text-gray-400 mt-1">
            Markdown と LaTeX 数式が使えます（例：$n^2 + 1$ が素数となる $n$ は無限に存在するか？）
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">状態</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="unclear">状況不明</option>
            <option value="unsolved">未解決</option>
            <option value="solved">解決済み</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting || !title.trim() || !description.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? '投稿中...' : '投稿する'}
        </button>
      </form>
    </div>
  )
}
