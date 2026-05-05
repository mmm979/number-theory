import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const statusLabel = {
  unsolved: { label: '未解決', className: 'bg-red-100 text-red-800' },
  unclear: { label: '状況不明', className: 'bg-yellow-100 text-yellow-800' },
  solved: { label: '解決済み', className: 'bg-green-100 text-green-800' },
} as const

export default async function HomePage() {
  const { data: problems } = await supabase
    .from('problems')
    .select('id, title, status, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">問題一覧</h1>
      {!problems?.length ? (
        <p className="text-gray-500">まだ問題が投稿されていません。</p>
      ) : (
        <ul className="space-y-3">
          {problems.map((p) => {
            const s = statusLabel[p.status as keyof typeof statusLabel]
            return (
              <li key={p.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <Link href={`/problems/${p.id}`} className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-900">{p.title}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${s.className}`}>
                      {s.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(p.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
