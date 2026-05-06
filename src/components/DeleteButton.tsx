'use client'
import { useState } from 'react'
import { deleteProblem } from '@/app/actions/deleteProblem'

export default function DeleteButton({ problemId }: { problemId: string }) {
  const [confirming, setConfirming] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    const result = await deleteProblem(problemId, password)
    setDeleting(false)
    if (result?.error) setError(result.error)
  }

  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} className="text-xs text-red-500 hover:underline">
        削除
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="管理者パスワード"
        className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
      />
      <button
        onClick={handleDelete}
        disabled={deleting || !password}
        className="text-xs text-red-600 hover:underline disabled:opacity-50"
      >
        {deleting ? '削除中…' : '確認して削除'}
      </button>
      <button
        onClick={() => { setConfirming(false); setPassword(''); setError(null) }}
        className="text-xs text-gray-500 hover:underline"
      >
        キャンセル
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
