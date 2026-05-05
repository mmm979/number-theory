'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Status = 'unsolved' | 'unclear' | 'solved'

const statusLabel: Record<Status, { label: string; className: string }> = {
  unsolved: { label: '未解決', className: 'bg-red-100 text-red-800' },
  unclear: { label: '状況不明', className: 'bg-yellow-100 text-yellow-800' },
  solved: { label: '解決済み', className: 'bg-green-100 text-green-800' },
}

export default function StatusEditor({ problemId, current }: { problemId: string; current: Status }) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function change(next: Status) {
    if (next === current) { setOpen(false); return }
    setSaving(true)
    setError(null)
    const { error: err, count } = await supabase.from('problems').update({ status: next }, { count: 'exact' }).eq('id', problemId)
    setSaving(false)
    if (err) { setError(err.message); return }
    if (count === 0) { setError('更新できませんでした（権限が不足している可能性があります）'); return }
    setOpen(false)
    router.refresh()
  }

  const s = statusLabel[current]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={saving}
        className={`text-xs px-2 py-1 rounded-full shrink-0 cursor-pointer ${s.className}`}
      >
        {saving ? '更新中…' : s.label} ▾
      </button>
      {open && (
        <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {(Object.entries(statusLabel) as [Status, { label: string; className: string }][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => change(key)}
              className={`block w-full text-left px-4 py-2 text-xs hover:bg-gray-50 ${key === current ? 'font-bold' : ''}`}
            >
              <span className={`px-2 py-0.5 rounded-full ${val.className}`}>{val.label}</span>
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
